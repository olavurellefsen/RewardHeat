import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parseHtml from 'html-react-parser'
import years from "../data/years"
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
import "@fontsource/ropa-sans"
import "@fontsource/open-sans"
import mapRegions from "../data/mapRegionToDataRegions"

const ChartTitle = styled.div`
  margin-left: 70px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Ropa Sans;
`

const StackedBarChart = props => {
  //const { t } = useTranslation()
  const stackedBar = props.stackedBar
  const scenario = props.selectedScenario
  const scenario2 = props.selectedScenario2
  const selectedCountries = props.selectedCountries
  const chartName = props.chartName
  //const chartTitle = t('chartTitle.' + props.chartTitle)
  const chartTitle = props.chartTitle
  const combinedChart = props.combinedChart
  const periods = years
  let gutter, rowGutter
  let minY = props.minY
  let maxY = props.maxY

  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    gutter = 0
    rowGutter = 0
  } else {
    gutter = -0
    rowGutter = -0
  }

  let maxY2 = 1
  let minY2 = 0
  if (combinedChart === true) {
    maxY2 = props.maxY2
    minY2 = props.minY2
  }

  let yDomain = [0, 1]
  if (minY < 0 || minY2 < 0) {
    let stackedRatio = minY / maxY
    let lineRatio = minY2 / maxY2
    yDomain = stackedRatio < lineRatio ? [stackedRatio, 1] : [lineRatio, 1]
  }

  const dataScenario1 = createAccumulatedData(stackedBar.data, scenario, false, chartName, selectedCountries)
  const dataScenario2 = createAccumulatedData(stackedBar.data, scenario2, false, chartName, selectedCountries)
  const accumulatedDataScenario1 = dataScenario1[0]
  const accumulatedDataScenario2 = scenario2 ? dataScenario2[0] : undefined
  let diffData = JSON.parse(JSON.stringify(accumulatedDataScenario1))
  Object.keys(accumulatedDataScenario2).forEach(indicatorName => {
    accumulatedDataScenario2[indicatorName].forEach((yearValue, index) => {
      diffData[indicatorName][index].total =  diffData[indicatorName][index].total - yearValue.total
    })
  }) 
  let maxValue = -Infinity
  let minValue = Infinity

  let totalYearValuesPos = {}
  let totalYearValuesNeg = {}
  
  years.forEach(year => {
    totalYearValuesPos[year] = 0
    totalYearValuesNeg[year] = 0
  })
  Object.keys(diffData).forEach(indicatorName => {
    diffData[indicatorName].forEach(yearValue => {
      let value = yearValue.total
      if (value < 0) {
        totalYearValuesNeg[yearValue.year] += yearValue.total

      } else {
        totalYearValuesPos[yearValue.year] += yearValue.total

      }
    })
  })
  Object.keys(totalYearValuesPos).forEach(year => {
    maxValue = Math.round(Math.max(maxValue, totalYearValuesPos[year]))
    minValue = Math.round(Math.min(minValue, totalYearValuesNeg[year]))
  })
  if (-minValue > maxValue) {
    maxValue = -minValue
  }

  const colors = [
    '#5cbae6',
    '#b6d957',
    '#fac364',
    '#8cd3ff',
    '#d998cb',
    '#f2d249',
    '#93b9c6',
    '#ccc5a8',
    '#ffcc00',
    '#ff9900',
    '#ff6600',
    '#ff0000',
    '#990000',
    '#ff0099',
    '#cc3399',
    '#990066',
    '#660066',
    '#660099',
    '#3366cc',
    '#33ccff',
    '#99cc33',
    '#66cc00',
    '#aad199',
    '#45535c',
    '#471442',
    '#612e30',
    '#7a713c',
    '#09e682',
    '#160154',
    '#fc53ec',
    '#454023',
    '#4b7060',
    '#4221a6',
    '#f2aceb',
    '#ede095',
    '#0395f7',
    '#7346fa',
    '#82627f',
  ]
  const MyCustomHTMLLabel = props => {
    const text = props.text.replaceAll('§', '')
  
    return (
      <foreignObject x={props.x+3} y={props.y-9} width={600} height={700}>
        <div style={{ fontSize: '12px'}}>{parseHtml(text)}</div>
      </foreignObject>
    );
  };
  return (
    <div>
    <ChartTitle>{chartTitle} ---  {mapRegions.find((countryCode)=>countryCode.path_id === props.selectedCountries[0]).country}</ChartTitle>
      <VictoryChart
        domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}
        domain={{ y: yDomain }}
      >
        
        <VictoryAxis key={0} tickValues={periods} tickFormat={periods} />
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dx={120} />}
          key={2}
          offsetX={80}
          tickFormat={tick => {
            if (isNaN(maxValue)) {
              return 0
            }
            if (props.YPercentage) {
              return (
                Math.round((tick * maxValue * 100) / props.divideValues, 0) +
                '%'
              )
            }
            console.log("charttitle: ", chartTitle)
            console.log("tick: ", (tick * maxValue) / props.divideValues)
            console.log("round: ", Math.round((tick * maxValue) / props.divideValues, 1))
            return (tick * maxValue) / props.divideValues
          }}
          tickValues={[-1,-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75,1]}
          label={props.label}
        />
        <VictoryLegend
          x={90}
          y={0}
          orientation="horizontal"
          gutter={gutter}
          rowGutter={rowGutter}
          symbolSpacer={4}
          itemsPerRow={4}
          style={{
            title: { fontSize: 14, leftPadding: -10 },
          }}
          colorScale={colors}
          data={Object.keys(diffData).map((indicatorName, i) => ({
            name: indicatorName
              .concat('§§§§§§§§§§§§')
              .substr(0, 16),
            fill: colors[i],
          }))}
          labelComponent={<MyCustomHTMLLabel  />}
        />
        <VictoryGroup offset={15} style={{ data: { width: 15 } }}>
          <VictoryStack>
            {Object.keys(diffData).map((indicatorName, i) => {
              console.log("indicatorName: ", indicatorName)
              console.log("bars: ", diffData[indicatorName])
              return(
                <VictoryBar
                  key={indicatorName}
                  data={diffData[indicatorName].map(chartGroupValue => {
                    console.log("return: ", {
                    ...chartGroupValue,
                    label:
                      'Difference: ' +
                      indicatorName +
                      ': ' +
                      (props.YPercentage
                        ? (
                            (chartGroupValue.total * 100) /
                            props.divideValues
                          ).toFixed(0) + '%'
                        : (chartGroupValue.total / props.divideValues).toFixed(
                            1
                          )),
                  })
                    return({
                    ...chartGroupValue,
                    label:
                      'Difference: ' +
                      indicatorName +
                      ': ' +
                      (props.YPercentage
                        ? (
                            (chartGroupValue.total * 100) /
                            props.divideValues
                          ).toFixed(0) + '%'
                        : (chartGroupValue.total / props.divideValues).toFixed(
                            1
                          )),
                  })})}
                  x="year"
                  y={datum => maxValue === 0 ? 0 : datum['total'] / maxValue}
                  labelComponent={<VictoryTooltip />}
                  style={{
                    data: { fill: colors[i] },
                  }}
                />
            )})}
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </div>
  )
}

StackedBarChart.defaultProps = {
  divideValues: 1,
  YPercentage: false,
}

StackedBarChart.propTypes = {
  stackedBar: PropTypes.object,
  line: PropTypes.object,
  selectedScenario: PropTypes.string.isRequired,
  selectedScenario2: PropTypes.string.isRequired,
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
