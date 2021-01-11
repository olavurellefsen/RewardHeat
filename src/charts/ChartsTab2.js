import React, { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import { MainArea, Flex } from './Charts.style'
import CostChart from './CostChart'
import { csv } from "d3"
import mapRegionToDataRegions from "../data/mapRegionToDataRegions"

const Charts = ({selectedCountries, costData}) => {
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
    csv("costData.csv").then(data=>
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
      <Flex>
        {<CostChart 
          title="Average annual cost changes 2020-2050"
          subTitle="Climate High"
          costChartData={regionData?.slice(0,8)}
          bar1Subtitle="CH_UEH compare to CH_NoLTHS"
          bar2Subtitle="CH_LTDH_UEH compared to CH_NoLTHS"
        ></CostChart>}
        {<CostChart 
          title="Average annual cost changes 2020-2050"
          subTitle="Climate Low"
          costChartData={regionData?.slice(8,16)}
          bar1Subtitle="CL_UEH compare to CL_NoLTHS"
          bar2Subtitle="CL_LTDH_UEH compared to CL_NoLTHS"
        />}
      </Flex>
    </MainArea>
  )
}

/* Charts.propTypes = {
} */

export default Charts
