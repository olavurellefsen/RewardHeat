import React from 'react'
//import PropTypes from 'prop-types'
import { MainArea, Flex } from './Charts.style'
import CostChart from './CostChart'

const Charts = () => {
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
