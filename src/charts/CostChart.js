import React from 'react'
//import PropTypes from 'prop-types'
//import styled from 'styled-components'

/* import csv from "csv-parser"
import fs from "fs" */

import {
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  //VictoryGroup,
  VictoryStack,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryBar,
  //VictoryTooltip,
} from 'victory'
/* const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream("costData.csv")
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
 */
const tempData1 = [
  { x: "p", y: 0 },
  { x: "a", y: -0.04031654 },
  { x: "f", y: 0 },
  { x: "g", y: 0 },
  { x: "b", y: -0.483883132 },
  
]
const tempData2 = [
  { x: "a", y: -0.110320442 },
  { x: "b", y: -0.101214871 },
  
]
const tempData3 = [
  { x: "a", y: 0.077793704 },
  { x: "b", y: -0.325753697 },
  
]
const costData = [
  {x:"a", y: -0.072843277 },
  {x:"b", y: -0.9108517 }
]

const CostChart = ({title, costChartData}) => {
  console.log("title: ", title)
  console.log("costChartData: ", costChartData)
  console.log("costChartData[3]?.PV: ", costChartData[3]?.PV)
  console.log("costChartData[7]?.PV: ", costChartData[7]?.PV)
  return(
    <div> 
    <VictoryChart
        domainPadding={20}
        width={550}
        height={550}
        padding={{ left: 80, right: 50, top: 50, bottom: 50 }}
        theme={VictoryTheme.material}
        // domain={{ y: yDomain }} //removed to fix issue with axis labels not being updated
      >
      <VictoryLabel x={90} y={24} text="DE_Climate High_ Average annual cost changes 2020-2050" />
      <VictoryAxis key={0} 
        tickValues={["p", "a","f","g", "b", "q"]} 
        tickFormat={["", "CH_UEH compare to CH_NoLTHS","","", "CH_LTDH_UEH compared to CH_NoLTHS", ""]} 
        tickLabelComponent={<VictoryLabel dy={190}/>}
        axisLabelComponent={<VictoryLabel dy={220} dx={0}/>}
        label="Climate High"/>
      {/* <VictoryAxis 
        axisLabelComponent={<VictoryLabel dy={20} label="asd"/>}/> */}
      <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dx={0} dy={-35}/>}
          key={2}
          offsetX={80}
          tickFormat={[-1,-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75,1]}
          tickValues={[-1,-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75,1]}
          label="MEUR/PJ"
        />
      <VictoryStack>
      <VictoryBar 
          data={tempData1} 
          barRatio={1.2} barWidth={100} /><VictoryBar 
          data={tempData2} 
          barRatio={1.2} barWidth={100} />
        <VictoryBar 
          data={tempData3} 
          barRatio={1.2} barWidth={100} />
        {/* <VictoryBar 
          data={[{ x: "p", y: 0 },
            { x: "a", y: costChartData[0]?.PV },
            { x: "f", y: 0 },
            { x: "g", y: 0 },
            { x: "b", y: costChartData[4]?.PV }]} 
          barRatio={1.2} barWidth={100} />
        <VictoryBar 
          data={[{ x: "a", y: costChartData[1]?.PV },
            { x: "b", y: costChartData[5]?.PV }]}
          barRatio={1.2} 
          barWidth={100} />
        <VictoryBar 
          data={[{x:"a", y: costChartData[2]?.PV },
            {x:"b", y: costChartData[6]?.PV }]} 
          barRatio={1.2} 
          barWidth={100} /> */}
      </VictoryStack>
      {/* <VictoryScatter 
        data={[
          {x:"a", y: costChartData[3]?.PV },
          {x:"b", y: costChartData[7]?.PV }
        ]
        }
      /> */}
      <VictoryScatter 
        data={costData}
      />
    <VictoryLegend
          x={90}
          y={0}
          orientation="horizontal"
          gutter={0}
          rowGutter={0}
          symbolSpacer={4}
          itemsPerRow={4}
          style={{
            title: { fontSize: 14, leftPadding: -10 },
          }}
          data={[
            {name: "Variable costs"}, 
            {name: "Fixed O&M costs"}, 
            {name: "Capital costs"}, 
            {name: "Net"}
          ]}
          labelComponent={<VictoryLabel style={{ fontSize: '12px' }} />}
        />
    </VictoryChart>
    </div>
    )
}

export default CostChart