import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parseHtml from 'html-react-parser'
//import { useTranslation } from 'react-i18next'
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
import id_desc from "../data/indicatorsTab1MaxValue"

const ChartHeader = styled(VictoryLabel)`
  text-anchor: start;
  fill: #000000;
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
`
ChartHeader.displayName = 'ChartHeader'

const ChartTitle = styled.div`
  margin-left: 70px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`
const MyCustomHTMLLabel = props => {
  //console.log("Befroe: ", props.text)
  const text = props.text.replaceAll('§', '')
  //console.log("After: ", text)

  return (
    <foreignObject x={props.x+3} y={props.y-9} width={600} height={700}>
      <div style={{ fontSize: '12px', fontFamily: "Open Sans" }}>{parseHtml(text)}</div>
    </foreignObject>
  );
};

const StackedBarChart = props => {
  //const { t } = useTranslation()
  const stackedBar = props.stackedBar
  const scenario = props.selectedScenario.substring(3, 8) === "_copy" ? props.selectedScenario.replace("_copy", "") : props.selectedScenario
  const scenario2 = props.selectedScenario2
  const selectedCountries = props.selectedCountries
  const chartName = props.chartName
  //const chartTitle = t('chartTitle.' + props.chartTitle)
  const chartTitle = props.chartTitle
  const combinedChart = props.combinedChart

  /* let gutter, rowGutter
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    gutter = 0
    rowGutter = 0
  } else {
    gutter = -40
    rowGutter = -5
  }
 */
   let maxY2 = 1
   
  // let minY2 = 0
  // if (combinedChart === true) {
  //   maxY2 = props.maxY2
  //   minY2 = props.minY2
  // }

  // let yDomain = [0, 1]
  // if (props.minY < 0 || minY2 < 0) {
  //   let stackedRatio = props.minY / props.maxY
  //   let lineRatio = minY2 / maxY2
  //   yDomain = stackedRatio < lineRatio ? [stackedRatio, 1] : [lineRatio, 1]
  // }

  

 const dataScenario1 = createAccumulatedData(stackedBar.data, scenario, false, chartName, selectedCountries)
  const dataScenario2 = createAccumulatedData(stackedBar.data, scenario2, false, chartName, selectedCountries)
  const accumulatedDataScenario1 = dataScenario1[0]
  const accumulatedDataScenario2 = scenario2 ? dataScenario2[0] : undefined
  const totalYearValuesPositiveScenario1 = dataScenario1[1]
  const totalYearValuesNegativeScenario1 = dataScenario1[2]
  const totalYearValuesPositiveScenario2 = scenario2 ? dataScenario2[1] : undefined
  const totalYearValuesNegativeScenario2 = scenario2 ? dataScenario2[2] : undefined
  let maxY = -Infinity
  let minY = Infinity
  let base = 0
  
  Object.keys(totalYearValuesPositiveScenario1).forEach(year => {
    maxY = Math.max(maxY, totalYearValuesPositiveScenario1[year],
      scenario2 ? totalYearValuesPositiveScenario2[year] : -Infinity)
    minY = Math.min(minY, totalYearValuesNegativeScenario1[year],
      scenario2 ? totalYearValuesNegativeScenario2[year] : Infinity)
  })
//console.log("minY before: ", minY)

  let t = 1
  let i = 0
  let range = [2,4,6,8,10]
  while(maxY !== 0 && t < maxY) {
    t = range[i%5]*Math.pow(range[4], Math.floor(i/5))
    i++
  }
  maxY = t
  let u=1
  let j=0
  while(minY !== 0 && u > minY && j < 20) {
    u = -range[j%5]*Math.pow(range[4], Math.floor(j/5))
    j++
  }
  minY = u
  console.log("j: ", j)
  //base is used in tickFormat
  if (maxY < -minY) 
    base = -minY
  else 
    base = maxY
  //console.log("maxY after: ", maxY)
  //console.log("-------------------")
  
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
    //console.log("total pos sc1: ", totalYearValuesPositiveScenario1)
    //console.log("total neg sc1: ", totalYearValuesNegativeScenario1)
    //console.log("minY: ", minY)
    //console.log("maxY: ", maxY)
    //console.log("ticks: ", ret)
    return ret
  }
  //console.log("indiacator: ", chartTitle)
  //console.log("base: ", base)


  return (
    <div>
      <ChartTitle>{chartTitle} ---  {mapRegions.find((countryCode)=>countryCode.path_id === props.selectedCountries[0]).country}</ChartTitle>
      <div>
      <VictoryChart
        domainPadding={20}
        width={550}
        height={450}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}
        // domain={{ y: yDomain }} //removed to fix issue with axis labels not being updated
      >
        <VictoryLabel></VictoryLabel>
        <VictoryAxis key={0} tickValues={periods} tickFormat={periods} />
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
      </VictoryChart></div>
      {console.log("chartName: ", chartName)}
      {console.log("id_desc: ", id_desc.find((descriptor)=>{
        return(descriptor.name === chartTitle)
        }))}
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
