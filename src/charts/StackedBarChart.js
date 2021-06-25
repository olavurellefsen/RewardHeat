import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parseHtml from 'html-react-parser'
import {
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryGroup,
  VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
} from 'victory'
import {createAccumulatedData} from './Tools'
import {colors, colors2} from './chartColors'
import periods from './../data/years'
import "@fontsource/ropa-sans"
import "@fontsource/open-sans"
import mapRegions from "../data/mapRegionToDataRegions"
import { CSVLink } from 'react-csv'

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 70px;
  margin-right: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
`

const ChartTitle = styled.div`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
const MyCustomHTMLLabel = props => {
  const text = props.text.replaceAll('§', '')

  return (
    <foreignObject x={props.x+3} y={props.y-9} width={100} height={50}>
      <div style={{ fontSize: '12px', fontFamily: "Open Sans" }}>{parseHtml(text)}</div>
    </foreignObject>
  );
};
const getCSVData = (accumulatedData1, scenarioName1, accumulatedData2, scenarioName2) => {
  let ret = []
  Object.entries(accumulatedData1).forEach((indicatorGroup) => {
    indicatorGroup[1].forEach((item)=>{
      ret.push({scenario: scenarioName1, indicatorGroup: indicatorGroup[0], year: item.year, value: item.total})
    })
  })
  Object.entries(accumulatedData2).forEach((indicatorGroup) => {
    indicatorGroup[1].forEach((item)=>{
      ret.push({scenario: scenarioName2, indicatorGroup: indicatorGroup[0], year: item.year, value: item.total})
    })
  })
  return ret
}
const StackedBarChart = props => {
  const stackedBar = props.stackedBar
  const scenario = props.selectedScenario.substring(3, 8) === "_copy" ? props.selectedScenario.replace("_copy", "") : props.selectedScenario
  const scenario2 = props.selectedScenario2
  const selectedCountries = props.selectedCountries
  const chartName = props.chartName
  const chartTitle = props.chartTitle
  const combinedChart = props.combinedChart
  const descriptor = props.descriptor

  let maxY2 = 1
   
  const dataScenario1 = createAccumulatedData(stackedBar.data, scenario, false, chartName, selectedCountries)
  const dataScenario2 = createAccumulatedData(stackedBar.data, scenario2, false, chartName, selectedCountries)
  const accumulatedDataScenario1 = dataScenario1[0]
  const accumulatedDataScenario2 = scenario2 ? dataScenario2[0] : undefined
  const totalYearValuesPositiveScenario1 = dataScenario1[1]
  const totalYearValuesNegativeScenario1 = dataScenario1[2]
  const totalYearValuesPositiveScenario2 = scenario2 ? dataScenario2[1] : undefined
  const totalYearValuesNegativeScenario2 = scenario2 ? dataScenario2[2] : undefined
  
  let current_country = mapRegions.find((countryCode)=>countryCode.path_id === props.selectedCountries[0]).country
  let maxY
  let minY
  if (descriptor) {
    console.log("descriptor: ", descriptor)
    if (descriptor[current_country].max) {
      maxY = descriptor[current_country].max
      minY = descriptor[current_country].min
    } else {
      maxY = descriptor[current_country]
    }
  }

  let base = 0
  let range = [2,4,6,8,10]
  if (!minY) {
    Object.keys(totalYearValuesPositiveScenario1).forEach(year => {
      minY = Math.min(minY, totalYearValuesNegativeScenario1[year],
        scenario2 ? totalYearValuesNegativeScenario2[year] : Infinity)
    })
    let u=1
    let j=0
    while(minY !== 0 && u > minY && j < 20) {
      u = -range[j%5]*Math.pow(range[4], Math.floor(j/5))
      j++
    }
    minY = u
  }
  
  if (!maxY){
    maxY = -Infinity
    
  
    Object.keys(totalYearValuesPositiveScenario1).forEach(year => {
      maxY = Math.max(maxY, totalYearValuesPositiveScenario1[year],
        scenario2 ? totalYearValuesPositiveScenario2[year] : -Infinity)
    })

    let t = 1
    let i = 0
    
    while(maxY !== 0 && t < maxY) {
      t = range[i%5]*Math.pow(range[4], Math.floor(i/5))
      i++
    }
    maxY = t
  }
  
    //base is used in tickFormat
    if (maxY < -minY) 
      base = -minY
    else 
      base = maxY
  
  let legends = new Set()
  
  stackedBar.data.scenarios
  .find(o => o.scenario.toLowerCase() === scenario.toLowerCase())
  .indicators.find(o => o.indicator === chartName).regions.forEach((reg)=>{
    reg.indicatorGroups.forEach((group)=>{
      legends.add(group.indicatorGroup)
    })
  })
  const defTick = [0, 0.25, 0.5, 0.75]
  const getTickValues = () => {
    let ret = []
    if (-minY > maxY) {
      ret=[-0.75,-0.5, -0.25, 0]
      defTick.forEach((tick, i)=> {
        if (tick !== 0.75)
        if (-tick*minY < maxY)
        ret.push(defTick[i+1])
      })
    }
    else {
      ret=[0, 0.25, 0.5, 0.75]
      defTick.forEach((tick, i)=> {
        if (tick !== 0.75)
          if (tick*maxY + maxY*0.05 < -minY)
            ret.unshift(-defTick[i+1])
      })
    }
    return ret
  }

  return (
    <div>
      <ChartHeader>
        <ChartTitle>{chartTitle} ---  {mapRegions.find((countryCode)=>countryCode.path_id === props.selectedCountries[0]).country}</ChartTitle>
        <CSVLink 
          data={getCSVData(accumulatedDataScenario1, scenario, dataScenario2 ? accumulatedDataScenario2 : [], scenario2)}
          filename={chartTitle + " " + selectedCountries + ".csv"}
          >
            Download as CSV
        </CSVLink>
      </ChartHeader>
      <div>
      <VictoryChart
        domainPadding={20}
        width={550}
        height={450}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}
      >
        <VictoryLabel></VictoryLabel>
        
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dx={120} dy={-30} />}
          key={2}
          offsetX={80}
          tickFormat={tick =>
            `${
              props.YPercentage === false
                ? ((tick * base) / props.divideValues).toLocaleString()
                : (tick * 100) / props.divideValues + '%'
            }`
          }
          tickValues={getTickValues()}
          label={props.label}
        />
        {combinedChart === true && (
          <VictoryAxis
            dependentAxis
            key={3}
            offsetX={330}
            label={props.label2}
            style={{
              axis: { stroke: 'gray' },
              axisLabel: { fill: 'gray', padding: -50 },
              ticks: { padding: -25 },
              tickLabels: { fill: 'gray', textAnchor: 'start' },
              zIndex: 10
            }}
            tickFormat={tick =>
              `${
                props.Y2Percentage === false
                  ? tick * maxY2
                  : tick * maxY2 * 100 + '%'
              }`
            }
            tickValues={[0, 0.25, 0.5, 0.75, 1.0]}
          />
        )}
        <VictoryLegend
          x={90}
          y={5}
          orientation="horizontal"
          gutter={0}
          rowGutter={0}
          symbolSpacer={4}
          itemsPerRow={4}
          style={{
            title: { fontSize: 14, leftPadding: -10 },
          }}
          colorScale={colors}
          data={Array.from(legends).map((legend, i) => ({
              name: legend
                .concat('§§§§§§§§§§§§')
                .substr(0, 16),
              fill: colors[i],
            }))}
          labelComponent={<MyCustomHTMLLabel  />}
        />
        
        <VictoryGroup offset={15} style={{ data: { width: 15 } }}>
          <VictoryStack>
            {Object.keys(accumulatedDataScenario1).map((chartGroupName, i) => (
                <VictoryBar
                  key={chartGroupName}
                  data={accumulatedDataScenario1[chartGroupName].map(
                    chartGroupValue => {
                      return({
                      ...chartGroupValue,
                      label:
                        chartGroupName +
                        ': ' +
                        (props.YPercentage
                          ? (
                              (chartGroupValue.total * 100) /
                              props.divideValues
                            ).toFixed(0) + '%'
                          : (
                              chartGroupValue.total / props.divideValues
                            )).toFixed(base < 100 ? 1 : 0),
                    })}
                  )}
                  x="year"
                  y={datum => datum['total'] / (base === 0 ? 100 : base)}
                  labelComponent={<VictoryTooltip />}
                  style={{
                    data: { fill: colors[i] },
                  }}
                />
              ))}
          </VictoryStack>
          {scenario2 !== '' && (
            <VictoryStack>
              {Object.keys(accumulatedDataScenario2).map((chartGroupName, i) => (
                  <VictoryBar
                    key={chartGroupName}
                    barRatio={1} barWidth={15}
                    data={accumulatedDataScenario2[chartGroupName].map(
                      chartGroupValue => ({
                        ...chartGroupValue,
                        label:
                          chartGroupName +
                          ': ' +
                          (props.YPercentage
                            ? (
                                (chartGroupValue.total * 100) /
                                props.divideValues
                              ).toFixed(0) + '%'
                            : (
                                chartGroupValue.total / props.divideValues
                              ).toFixed(base < 100 ? 1 : 0)),
                      })
                    )}
                    x="year"
                    y={datum => datum['total'] / (base === 0 ? 100 : base)}
                    labelComponent={<VictoryTooltip />}
                    style={{
                      data: { fill: colors2[i] },
                    }}
                  />
                ))}
            </VictoryStack>
          )}
        </VictoryGroup>
        <VictoryAxis 
          key={0} 
          tickValues={periods} 
          tickFormat={periods} 
          style={{
          grid: { strokeWidth: 0 },
        }}

        />
      </VictoryChart></div>
      <p style={{width: "550px"}}>{props.description}</p>
    </div>
  )
}

StackedBarChart.defaultProps = {
  divideValues: 1,
  selectedScenario2: '',
  YPercentage: false,
}

StackedBarChart.propTypes = {
  stackedBar: PropTypes.object,
  selectedScenario: PropTypes.string.isRequired,
  selectedScenario2: PropTypes.string,
  chartName: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired,
  combinedChart: PropTypes.bool.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  minY2: PropTypes.number,
  maxY2: PropTypes.number,
  label: PropTypes.string.isRequired,
  divideValues: PropTypes.number,
  label2: PropTypes.string,
  YPercentage: PropTypes.bool,
  Y2Percentage: PropTypes.bool,
  selectedCountries: PropTypes.array.isRequired,
}

export default StackedBarChart
