import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { Link, useLocation } from "react-router-dom";
import ScenarioSelectionList from "../scenarioSelection/ScenarioSelectionList";
import ToggleSwitch from "./ToggleSwitch";
import { useTranslation } from "react-i18next";
import CountryList from "../map/CountryList";
import "@fontsource/ropa-sans"

const MenuLayout = styled.div`
  display: none;
  height: calc(100vh);
  ${breakpoint("mobile", "desktop")`
    display: flex;  
    min-height: 100vh;
    flex-direction: column;
    flex-shrink: 0;
    width: 80px;
    color: white;
    background: rgb(50, 50, 50);
    visibility: visible;
  `}
`;

const AppLogo = styled.img`
  max-width: 75px;
  margin: 5px;
  border: 0;
  align-self: center;
  transition: 0.2s;
  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const MenuHeader = styled.div`
  padding: 5px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: top;
`;

const MenuSeparatorLine = styled.hr`
  margin: 0.25em 12px 0.25em 5px;
  border-color: #555;
  border-width: 1px;
  width: 100hh;
`;

const MenuRoutes = styled.div`
  padding: 5px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled(Link)`
  font-weight: ${props => (props.selected ? "bold" : "normal")};
  font-size: 0.7em;
  margin: 0;
  padding: 5px 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  opacity: ${props => (props.selected ? "1" : "0.8")};
`;

const ScenarioSelection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const ToggleDifference = styled.div`
  padding: 5px;
  display: flex;
  justify-content: start;
  align-content: center;
  flex-direction: column;
`;

const ToggleSwitchText = styled.div`
  font-size: 0.7em;
  color: ${props =>
    props.singleMode ? "gray" : props.selected ? "#2196F3" : "white"};
  margin-top: 5px;
`;

const ScenarioDifferenceText = styled.div`
  font-size: 0.7em;
  color: ${props =>
    props.singleMode ? "gray" : props.selected ? "#2196F3" : "white"};
  margin: 5px;
`;

const MenuFooter = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
`;

const CopyrightNotice = styled.div`
  font-size: 8px;
  padding: 2px;
  margin: 0;
  
`;

const ExternalLink = styled.a`
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;
const Header = styled.div`
  font-size: ${props => (props.narrowVersion ? "10px" : "20px")};
  padding: ${props => (props.narrowVersion ? "5px" : "0 12px 0 15px")};
  margin: 0px 0px 5px 0px;
  align-self: flex-start;
  font-family: Ropa Sans;
`;
const LinkLogo = styled.img`
  padding: 0px;
  max-width: 40px;
  border: 0;
  align-self: center;
`;
const CopyrightItem = styled.div`
  font-size: ${props => (props.narrowVersion ? "10px" : "12px")};
  padding: ${props => (props.narrowVersion ? "5px" : "0")};
  margin: 0px 0px 5px 0px;
  text-align: center;
`;
function ScenarioSelectionMenu(props) {
  const { t } = useTranslation();
  const location = useLocation()

  return (
    <MenuLayout>
      <MenuHeader>
        <ExternalLink href="http://www.nordicenergy.org/flagship/project-shift/">
          <AppLogo 
            src="./images/rewardheatlogo.jpg"
            alt="REWARDHeat" />
        </ExternalLink>
        <MenuRoutes>
          <MenuItem
            to="/about"
            selected={props.selectedChartgroup === "/about"}
          >
            {t("menu.mobile.about")}
          </MenuItem>
          <MenuItem
            to="/scenarios"
            selected={props.selectedChartgroup === "/scenarios"}
          >
            {t("menu.mobile.scenarios")}
          </MenuItem>
          <MenuItem
            to="/subscribe"
            selected={props.selectedChartgroup === "/subscribe"}
          >
            {t("menu.mobile.subscribe")}
          </MenuItem>
          <MenuItem
            to="/findings"
            selected={props.selectedChartgroup === "/findings"}
          >
            {t("menu.mobile.findings")}
          </MenuItem>
          <MenuItem
            to="/contact"
            selected={props.selectedChartgroup === "/contact"}
          >
            {t("menu.mobile.contact")}
          </MenuItem>
        </MenuRoutes>
      </MenuHeader>
      <MenuSeparatorLine />
      <Header narrowVersion={true}> {t("general.countries")}</Header>
      <CountryList 
        countries={props.countries}
        selectedCountries={location.pathname !== "/tab3" ? props.selectedCountries : props.selectedCountriesCost}
        selectCountry={location.pathname !== "/tab3" ? props.selectCountry : props.selectCountryCost}
        narrowVersion={true}
        />
      <MenuSeparatorLine />
      {location.pathname !== "/tab3" && <><ScenarioSelection>
        <ScenarioSelectionList
          updateScenarioSelection={props.updateScenarioSelection}
          name="scenarioSelection"
          selectedValue={props.scenarioSelection.scenarioSelectionNoOptions}
          selectedValue2={props.scenarioSelection.scenarioSelectionNoOptions2}
          scenarioCombinations={props.scenarioCombinations}
          dimensionTitle={t("general.scenarios")}
          narrowVersion={true}
          options={props.options}
          toggleOption={props.toggleOption}
        />
      </ScenarioSelection>
      <MenuSeparatorLine />
      <ToggleDifference onClick={e => props.toggleDifference(e)}>
        <ToggleSwitch
          dimmed={props.scenarioSelection.scenarioSelection2 === ""}
          checked={props.scenarioSelection.showDifference}
        />
        <ToggleSwitchText
          singleMode={props.scenarioSelection.scenarioSelection2 === ""}
          selected={props.scenarioSelection.showDifference}
        >
          {t("general.scenario-difference")}
        </ToggleSwitchText>
      </ToggleDifference>
      <ScenarioDifferenceText
        singleMode={props.scenarioSelection.scenarioSelection2 === ""}
        selected={props.scenarioSelection.showDifference}
      >
      {props.scenarioSelection.scenarioSelection2 && <div>
        <p>{props.scenarioSelection.scenarioSelection}</p>
        <p>minus</p>
        <p>{props.scenarioSelection.scenarioSelection2}</p>
      </div>}
      </ScenarioDifferenceText>
      <MenuSeparatorLine /></>}
      <MenuFooter>
        <CopyrightNotice>
          <Header narrowVersion={true}> {t("general.developed-by")}</Header>
          <CopyrightItem>
            <ExternalLink href="http://www.tokni.com">
              <AppLogo src="./images/tokni.png" alt="Tøkni" data-tip="Tøkni - Nordic Software Consultancy"/>
            </ExternalLink>
          </CopyrightItem>
          <CopyrightItem>
            <ExternalLink href="https://energymodellinglab.com/">
              <LinkLogo src="./images/eml.png" alt="Energy Modelling Lab" maxWidth="75px" data-tip="Energy Modelling Lab"/>
            </ExternalLink>
          </CopyrightItem>
        </CopyrightNotice>
      </MenuFooter>
    </MenuLayout>
  );
}

ScenarioSelectionMenu.propTypes = {
  selectedChartgroup: PropTypes.string.isRequired,
  updateScenarioSelection: PropTypes.func.isRequired,
  scenarioSelection: PropTypes.object.isRequired,
  scenarioCombinations: PropTypes.object.isRequired,
  toggleDifference: PropTypes.func.isRequired,
  options: PropTypes.any.isRequired,
  toggleOption: PropTypes.func.isRequired,
  selectedCountries: PropTypes.array.isRequired,
  selectCountry: PropTypes.func.isRequired
};

export default ScenarioSelectionMenu;
