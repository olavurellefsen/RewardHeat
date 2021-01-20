import React, { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import { MainArea, Flex } from './Charts.style'
import Welcome from '../alert/Welcome'
import CostChart from './CostChart'
import { csv } from "d3"
import mapRegionToDataRegions from "../data/mapRegionToDataRegions"

const Charts = ({selectedCountries, costData, closeWelcome, scenarioSelection}) => {
  const [regionData, setRegionData] = useState([])
  let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })

  useEffect(() => {
    csv("costData20210118.csv").then(data=>
      {
        let newRegionData = []
        data.forEach(row => {
          if (row.Region === selectedDataRegions[0])
            newRegionData.push(row)
        })
        if (JSON.stringify(newRegionData) !== JSON.stringify(regionData))
          setRegionData(newRegionData)
      }
    )
  }, [selectedCountries, selectedDataRegions, regionData])
  console.log("region data: ", regionData)
  return (
    <MainArea>
      
        <Welcome 
          isOpen={scenarioSelection.showWelcome}
          closeWelcome={closeWelcome} 
          tab="tab3"/>
      
      <Flex>
        {<CostChart 
          title={"Average annual cost changes 2020-2050 " + mapRegionToDataRegions.find((region)=>region.path_id === selectedCountries[0]).country}
          subTitle="WEO-SD"
          costChartData={regionData?.slice(0,8)}
          bar1Subtitle={["Transition DH compared to", "Conventional DH"]}
          bar2Subtitle={["4th Generation DH compared to", "Conventional DH"]}
        ></CostChart>}
        {<CostChart 
          title={"Average annual cost changes 2020-2050 "  + mapRegionToDataRegions.find((region)=>region.path_id === selectedCountries[0]).country}
          subTitle="WEO-NP"
          costChartData={regionData?.slice(8,16)}
          bar1Subtitle={["Transition DH compared to", "Conventional DH"]}
          bar2Subtitle={["4th Generation DH compared to", "Conventional DH"]}
        />}
      </Flex>
    </MainArea>
  )
}

/* Charts.propTypes = {
} */

export default Charts