import React from 'react'
import PropTypes from 'prop-types'
import Welcome from '../alert/Welcome'
import { MainArea } from './Charts.style'

const Charts = props => {
  //const selectedCountries = props.selectedCountries
  return (
    <MainArea>
      {props.scenarioSelection.showWelcome === true && (
        <Welcome closeWelcome={props.closeWelcome} />
      )}
      
      
    </MainArea>
  )
}

Charts.propTypes = {
  closeWelcome: PropTypes.func.isRequired,
  selectedCountries: PropTypes.array.isRequired,
}

export default Charts


