import React from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import Welcome from '../alert/Welcome'
import StackedBarChart from './StackedBarChart'
import StackedBarDiffChart from './StackedBarDiffChart'
import { MainArea, Flex } from './Charts.style'
import stackedBar from '../data/stackedBarTab1'
//import line from '../data/line'
import indicators from '../data/indicatorsTab1'
import scenarioCombinations from "../data/scenarioCombinations"

const Scenario1Description = styled.div`
  background-color: #ff5555;
  max-width: 45%;
  padding: 15px 25px;
  margin: 5px;
  color: white;
`
const Scenario2Description = styled.div`
  background-color: #285c6a;
  max-width: 45%;
  padding: 15px 25px;
  margin: 5px;
  color: white;
`

const Charts = props => {
  const selectedScenario = props.scenarioSelection.scenarioSelection
  const selectedScenario2 = props.scenarioSelection.scenarioSelection2
  const selectedCountries = props.selectedCountries
  
  return (
    <MainArea>
        <Welcome 
          isOpen={props.scenarioSelection.showWelcome}
          closeWelcome={props.closeWelcome} 
          tab="tab1" />
        <Flex direction="ncolumn">
          <Scenario1Description>
            {scenarioCombinations.scenarioCombinations.scenarioOptions.find(
              (option)=>option.name === selectedScenario).desc
            }
          </Scenario1Description>
          {selectedScenario2 && <Scenario2Description>{
            scenarioCombinations.scenarioCombinations.scenarioOptions.find(
              (option)=>option.name === selectedScenario2
            )?.desc
          }</Scenario2Description>}
        </Flex>  
      {(props.scenarioSelection.showDifference === false ||
        (props.scenarioSelection.showDifference === true &&
          selectedScenario2 === '')) && (
        <Flex>
          {
            indicators.map((i, index) => 
              <StackedBarChart
                key={i+' '+index}
                chartName={i}
                chartTitle={i}
                selectedScenario={selectedScenario}
                selectedScenario2={selectedScenario2}
                selectedCountries={selectedCountries}
                combinedChart={false}
                minY={0}
                maxY={1500}
                stackedBar={stackedBar}
                //line={line}
                countries={props.countries}
              />
            )
          }
        </Flex>
      )}
      {props.scenarioSelection.showDifference === true &&
        selectedScenario2 !== '' && (
        <Flex>
          {
            indicators.map(i => 
              <StackedBarDiffChart
                chartName={i}
                chartTitle={i}
                selectedScenario={selectedScenario}
                selectedScenario2={selectedScenario2}
                selectedCountries={selectedCountries}
                combinedChart={false}
                minY={-1}
                maxY={1}
                stackedBar={stackedBar}
                //line={line}
                countries={props.countries}
              />
            )
          }
          </Flex>
        )}
    </MainArea>
  )
}

Charts.propTypes = {
  scenarioSelection: PropTypes.object.isRequired,
  closeWelcome: PropTypes.func.isRequired,
  selectedCountries: PropTypes.array.isRequired,
}

export default Charts
