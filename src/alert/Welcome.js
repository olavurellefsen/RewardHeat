import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Octicon from "react-octicon";
import { Flex } from "../charts/Charts.style";

const AlertContainer = styled.div`
  position: ${props => props.isOpen ? 'relative' : 'absolute'};
  right: ${props => props.isOpen ? null : '30px'};
  padding: 20px;
  padding-top: 35px;
  margin-bottom: 30px;
  border-width: 1px;
  border-color: rgb(178, 106, 91);
  border-style: solid;
  color: white;
  background-color: rgb(178, 106, 91);
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: ${props => props.isOpen ? null : '20px'};
`;
AlertContainer.displayName = "AlertContainer";
const AlertBody = styled.div`
  font-size: 1em;
  margin: 0px;
  align-self: center;
  ${'' /* flex: 1; */}
`;
AlertBody.displayName = "AlertBody";
const AlertBodyParagraph = styled.p``;
const AlertTitle = styled.div`
  font-size: 1.3em;
  font-family: Ropa Sans;
`;
AlertBodyParagraph.displayName = "AlertBodyParagraph";
const CloseWindowIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  margin: 0px;
  border: 0;
  flex-shrink: 0;
  align-self: flex-start;
  :hover {
    cursor: pointer;
  }
`;
CloseWindowIcon.displayName = "CloseWindowIcon";

const welcomeText = {
  "tab1": {
    "welcome1": <p>REWARDHeat project scenario interface.</p>,
    "welcome2": <p>This webpage is developed within the REWARDHeat project, that focuses on demonstrating a new generation of low-temperature district heating and cooling networks. These networks will be able to recover renewable and waste heat which is available at low temperature. In the project, an energy system model of seven countries (Croatia, Denmark, France, Germany, Italy, Netherlands, Sweden) heating sector has been developed and used to explore the scenarios to explore scenarios for transition to low-temperature district heating and carbon neutrality in these countries.</p>,
    "welcome3": <p>On this 'main results' page, you can compare scenarios and change assumptions (options) to explore how the energy system is changing within different scenarios. The scheme and the graph below inform you about the scenarios and options. For further information about these please go to the 'Description of the scenarios' tab on the left.</p>,
    "welcome4": <p>If you are ready, you can close this window and start exploring.</p>
  },
  "tab2": {
    "welcome1": <p>Air pollution.</p>,
    "welcome2": <p>Following air pollutants emissions were estimated for each scenario that is studied in the model for all the countries studied in the RewardHeat project:</p>,
    "welcome3": <p>i) Nitrogen Oxides (NOx), ii) Sulfur Oxides (SOx), iii) Particles smaller than 2.5 μm (PM2.5)</p>,
    "welcome4": <p>If you are ready, you can close this window and start exploring.</p>
  },
  "tab3": {
    "welcome1": <p>REWARDHeat project scenario interface.</p>,
    "welcome2": <p>Cost</p>,
    "welcome3": <p>The model calculates total system cost discounted to 2015 as well as undiscounted variable costs (including energy flow cost, activity cost and taxes and subsidies), fixed operation and maintenance, and capital costs for each demo-city and each model year. From the model results, average annual system cost savings for each demo-city is calculated based on equations (3) and (4) where: “i” is either WEO-SD or WEO-NP “j”:  variable cost, fixed operation and maintenance cost or capital costs</p>,
    "welcome4": <p>If you are ready, you can close this window and start exploring.</p>
  },
}

function Welcome(props) {
  return (
    <AlertContainer isOpen={props.isOpen}>
      {props.isOpen && <AlertTitle>{welcomeText[props.tab].welcome1}</AlertTitle>}
      {props.isOpen && <AlertBody>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome2}</AlertBodyParagraph>
        {props.tab === "tab3" && 
          <AlertBodyParagraph>
            <img src="images/Cost_formula_brown_background.png" alt="Cost_formula"/>
          </AlertBodyParagraph>}
        <AlertBodyParagraph>{welcomeText[props.tab].welcome3}</AlertBodyParagraph>
        {props.tab === "tab1" && <WelcomeImageContainer>
          <AlertBodyParagraph>
          <img width="500" height="250" src="images/Scenario Options main page_I.PNG" alt="Scenarios_Options_scheme"/>
          </AlertBodyParagraph>
          <AlertBodyParagraph>
          <img width="500" height="250" src="images/Climate_policy_options_graph.png" alt="Climate_policy_options_graph"/>
          </AlertBodyParagraph>
        </WelcomeImageContainer>}
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
      </AlertBody>}
      <CloseWindowIcon
        onClick={() => props.closeWelcome(!props.isOpen)}
      >
        {props.isOpen ? <Octicon name="x" /> : <Octicon name="chevron-left" />}
      </CloseWindowIcon>
    </AlertContainer>
  );
}

Welcome.propTypes = {
  closeWelcome: PropTypes.func.isRequired
};

const WelcomeImageContainer = styled(Flex)`
  justify-content: space-around;
  align-items: center;
`

export default Welcome;
