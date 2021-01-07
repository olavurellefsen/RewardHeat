import React, { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import { MainArea, Flex } from './Charts.style'
import CostChart from './CostChart'
//import { csv } from "d3"
import mapRegionToDataRegions from "../data/mapRegionToDataRegions"

const Charts = ({selectedCountries, costData}) => {
  const [regionData] = useState([])
  let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })

  useEffect(() => {
    console.log("getting data ")

    /* csv("costData.csv").then(data=>
      {
        console.log("data csv: ", data)
        let newRegionData = []
        data.forEach(row => {
          if (row.Region === selectedDataRegions[0])
            newRegionData.push(row)
        })
        setRegionData(newRegionData)
      }
    ) */
  }, [selectedCountries, selectedDataRegions])
  console.log("region data: ", regionData)
  return (
    <MainArea>
      <Flex>
        {<CostChart 
          title="Climate High_ Average annual cost changes 2020-2050"
          costChartData={regionData?.slice(0,8)}
        ></CostChart>}
        {<CostChart 
          title="Climate Low_ Average annual cost changes 2020-2050"
          costChartData={regionData?.slice(8,16)}
        />}
      </Flex>
    </MainArea>
  )
}

/* Charts.propTypes = {
} */

export default Charts
