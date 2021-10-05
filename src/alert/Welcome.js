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
    "welcome2": <p>This webpage is developed within the REWARDHeat project, which focuses on demonstrating a new generation of low-temperature district heating and cooling networks. These networks will be able to recover renewable and waste heat, which is available at low temperature. In the project, an energy system model of heating sectors of seven countries (Croatia, Denmark, France, Germany, Italy, Netherlands, Sweden) has been developed and used to explore scenarios for transition to low-temperature district heating and carbon neutrality in these countries.</p>,
    "welcome3": <p>On this 'main results' page, you can compare scenarios and change assumptions (options) to explore how the energy systems are changing within different scenarios for each country. The scheme and the graph below inform you about the scenarios and options. For further information about these please go to the 'Description of the scenarios' tab on the left.</p>,
    "welcome4": <p>If you are ready, you can close this window and start exploring.</p>
  },
  "tab2": {
    "welcome1": <p>Air Pollutants</p>,
    "welcome2": <p>Following air pollutants were estimated for each scenario, which is studied in the model, for all the countries investigated in the REWARDHeat project:</p>,
    "welcome3": <p> - Nitrogen Oxides (NO<sub>x</sub>),<br /> - Sulfur Oxides (SO<sub>x</sub>),<br /> - Particles less than 2.5 μm (PM<sub>2.5</sub>). </p>,
    "welcome4": <p>The principle for the calculation of the emissions is the multiplication of the heat output (PJ) from the technologies satisfying the heat demand with a unique emission factor for the respective technology and fuel used (kt/PJ).</p>,
    "welcome5": <p>For the emission calculations, the TIMES_Heat model is soft-linked to the GAINS model, which is a model that is developed by IIASA*.</p>,
    "welcome6": <p>*IIASA GAINS model: <a href="https://iiasa.ac.at/web/home/research/researchPrograms/air/GAINS.html" style={{color: "white"}}>https://iiasa.ac.at/web/home/research/researchPrograms/air/GAINS.html</a></p>
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
          <img width="500" height="331" src="images/Scenario Options main page_III.PNG" alt="Scenarios_Options_scheme"/>
          </AlertBodyParagraph>
          <AlertBodyParagraph>
          <img width="634" height="331" src="images/Main_results_page_climate_policy_options.png" alt="Climate_policy_options_graph"/>
          </AlertBodyParagraph>
        </WelcomeImageContainer>}
        <AlertBodyParagraph>{welcomeText[props.tab].welcome4}</AlertBodyParagraph>
        <AlertBodyParagraph>{welcomeText[props.tab].welcome5}</AlertBodyParagraph>
        {
          props.tab === "tab2" && 
          <AlertBodyParagraph style={{marginLeft: "50px"}}>
            <img width="700" height="150" src="images/Air_pollutant_tab_window_II.png" alt="Cost_formula"/>
          </AlertBodyParagraph>
        }
        <AlertBodyParagraph>{welcomeText[props.tab].welcome6}</AlertBodyParagraph>
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
