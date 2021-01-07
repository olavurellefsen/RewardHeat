import React, { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import { MainArea, Flex } from './Charts.style'
import CostChart from './CostChart'
import { csv } from "d3"

const Charts = ({region, costData}) => {
  const [regionData, setRegionData] = useState([])

  useEffect(() => {
    csv("costData.csv").then(data=>
      {
        console.log("data: ", data)
        let newRegionData = []
        
      }
    )
  }, [])
  return (
    <MainArea>
      <Flex>
        <CostChart></CostChart>
        <CostChart></CostChart>
      </Flex>
    </MainArea>
  )
}

/* Charts.propTypes = {
} */

export default Charts
