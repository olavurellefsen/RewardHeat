import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, withRouter, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'
import LeftMenu from './leftMenu/LeftMenu'
import LeftMenuMobile from './leftMenu/LeftMenu.mobile'
import Tabs from './tabs/Tabs'
import TabsMobile from './tabs/Tabs.mobile'
import ChartsTab1 from './charts/ChartsTab1'
import ChartsTab2 from './charts/ChartsTab2'
import ChartsTab3 from './charts/ChartsTab3'
import PageRenderer from './pages/PageRenderer'
import scenarioCombinations from './data/scenarioCombinations'

ReactGA.initialize('UA-145591344-2')
ReactGA.pageview(window.location.pathname + window.location.search)

const Page = styled.div`
  height: 100%;
  margin: 0px;
  display: flex;
  box-sizing: border-box;
`
const LeftColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(50,50,50);
`
const RightColumn = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
`
const Content = styled.div`
  display:flex;
  flex-direction: column;
  flex-grow: 1; /*ensures that the container will take up the full height of the parent container*/
  overflow-y: auto; /*adds scroll to this container*/
  overflow-x: hidden;
`
const MainSwitch = styled(Switch)`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
`
const FundingText = styled.div`
  display: flex;
  justify-content: center;
`
const Bold = styled.span`
  font-weight: bold;
  padding-left: 5px;
  margin-bottom: 5px;
`

export const changeScenario = (name, value) => {
  return({
  [name]: value,
})}
const default_scenario = scenarioCombinations.scenarioCombinations.scenarioOptions[0];
const countries = ['hr', 'dk', 'fr', 'de', 'it', 'nl', 'se' ];

const default_countries = ['hr'];
const options = []

scenarioCombinations.scenarioCombinations.scenarioOptions
  .filter(s => !s.opt0 && !s.op1 && !s.opt2 && !s.opt3)
  .forEach(s => {
    options[s.nameNoOptions] = {}
    options[s.nameNoOptions]['opt0'] = true
    options[s.nameNoOptions]['opt1'] = false
    options[s.nameNoOptions]['opt2'] = false
    options[s.nameNoOptions]['opt3'] = false
  })

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scenarioSelection: default_scenario.name,
      scenarioSelection2: '',
      showWelcome: true,
      showDifference: false,
      options: options,
      scenarioSelectionNoOptions: default_scenario.nameNoOptions,
      scenarioSelectionNoOptions2: '',
      selectedCountries: default_countries,
      selectedCountriesCost: default_countries,
  }
    this.scenarioCombinations = scenarioCombinations.scenarioCombinations
  }

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }
  UpdateScenarioNames = () => {
    
    this.setState(state => {
      return {
        scenarioSelection:
          state.scenarioSelectionNoOptions +
          (state.options[state.scenarioSelectionNoOptions].opt0 ? '_Ambitious' : '') +
          (state.options[state.scenarioSelectionNoOptions].opt1 ? '_WEO-SD' : '') +
          (state.options[state.scenarioSelectionNoOptions].opt2 ? '_WEO-NP' : '') +
          (state.options[state.scenarioSelectionNoOptions].opt3 ? '_SAC' : ''),
      }
    })
    this.setState(state => {
      return {
        scenarioSelection2:
          state.scenarioSelectionNoOptions2 !== ''
            ? state.scenarioSelectionNoOptions2 +
              (state.options[state.scenarioSelectionNoOptions2].opt0
                ? '_Ambitious'
                : '') +
              (state.options[state.scenarioSelectionNoOptions2].opt1 ? '_WEO-SD' : '') +
              (state.options[state.scenarioSelectionNoOptions2].opt2 ? '_WEO-NP' : '') +
              (state.options[state.scenarioSelectionNoOptions2].opt3 ? '_SAC' : '')
            : '',
      }
    })
  }
  unselectToggles = (scenario) => {
    let newOptions = this.state.options
    Object.keys(this.state.options[scenario]).forEach(option => {
      newOptions[scenario][option] = false
    })
    this.setState({
      options: newOptions,
    })
  }
  UpdateScenarioSelection = (e, name, value) => {
    e.preventDefault()
    if (this.state.scenarioSelectionNoOptions2 !== '') {
      if (value === this.state.scenarioSelectionNoOptions) {
        this.setState(
          changeScenario(
            'scenarioSelectionNoOptions',
            this.state.scenarioSelectionNoOptions2
          )
        )
        this.setState(changeScenario('scenarioSelectionNoOptions2', ''))
        //this.unselectToggles(this.state.scenarioSelectionNoOptions2)
        this.setState({ showDifference: false })
      } else {
        if (value === this.state.scenarioSelectionNoOptions2) {
          this.setState(changeScenario('scenarioSelectionNoOptions2', ''))
          //this.unselectToggles(this.state.scenarioSelectionNoOptions2)
          this.setState({ showDifference: false })
        } else {
          this.setState(changeScenario('scenarioSelectionNoOptions2', value))
        }
      }
    } else {
      if (value !== this.state.scenarioSelectionNoOptions) {
        this.setState(changeScenario('scenarioSelectionNoOptions2', value), ()=>{
        })
      }
    }
    this.UpdateScenarioNames()
  }


  CloseWelcomeWidget = (value = false) => {
    this.setState({ showWelcome: value })
  }
  
  ToggleDifference = e => {
    e.preventDefault()
    this.setState({ showDifference: !this.state.showDifference })
  }

  ToggleOption = (scenario, option) => {
    let newOptions = this.state.options
    newOptions[scenario].opt0 = false;
    newOptions[scenario].opt1 = false;
    newOptions[scenario].opt2 = false;
    newOptions[scenario][option] = !this.state.options[scenario][option]

    this.setState({
      options: newOptions,
    })
    this.UpdateScenarioNames()
  }

  selectCountry = country => {
    this.setState({
      selectedCountries: [country],
    })
  }
  selectCountryCost = country => {
    let newSelectedCountriesCost = [...this.state.selectedCountriesCost]
    if (newSelectedCountriesCost.includes(country)) {
      newSelectedCountriesCost = newSelectedCountriesCost.filter(c => c !== country)
    } else {
      newSelectedCountriesCost = [...newSelectedCountriesCost, country] 
    } 
   this.setState({
      selectedCountriesCost: newSelectedCountriesCost,
    })
  }
  
  render() {
    return (
      <Page>
        <LeftColumn>
          <Content>
            <LeftMenu
              selectedChartgroup={this.state.scenarioSelection}
              selectedPage={this.props.location.pathname}
              scenarioSelection={this.state}
              scenarioCombinations={this.scenarioCombinations}
              updateScenarioSelection={this.UpdateScenarioSelection}
              toggleDifference={this.ToggleDifference}
              options={this.state.options}
              toggleOption={this.ToggleOption}
              countries={countries}
              selectedCountries={this.state.selectedCountries}
              selectedCountriesCost={this.state.selectedCountriesCost}
              selectCountry={this.selectCountry}
              selectCountryCost={this.selectCountryCost}
            />
            <LeftMenuMobile
              selectedChartgroup={this.state.scenarioSelection}
              selectedPage={this.props.location.pathname}
              scenarioSelection={this.state}
              scenarioCombinations={this.scenarioCombinations}
              updateScenarioSelection={this.UpdateScenarioSelection}
              toggleDifference={this.ToggleDifference}
              options={this.state.options}
              toggleOption={this.ToggleOption}
              countries={countries}
              selectedCountries={this.state.selectedCountries}
              selectedCountriesCost={this.state.selectedCountriesCost}
              selectCountry={this.selectCountry}
              selectCountryCost={this.selectCountryCost}
            />
          </Content>
        </LeftColumn>
        <RightColumn>
          <Content>
            <Tabs selectedChartgroup={this.props.location.pathname} />
            <TabsMobile selectedChartgroup={this.props.location.pathname} />
            <MainSwitch>
              <Route
                exact
                path="/"
                render={() => (
                  <ChartsTab1
                    countries={countries}
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                    selectedCountries={this.state.selectedCountries}
                  />
                )}
              />
              <Route
                path="/tab2"
                render={() => (
                  <ChartsTab2
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                    selectedCountries={this.state.selectedCountries}
                  />
                )}
              />
              <Route
                path="/tab3"
                render={() => (
                  <ChartsTab3
                    countries={countries}
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                    selectedCountries={this.state.selectedCountriesCost}
                  />
                )}
              />
              
              <Route
                path="/about"
                render={() => {
                  return (
                    <PageRenderer markdownFiles={['descriptions/about.md']} />
                  )
                }}
              />
			  <Route
                path="/subscribe"
                render={() => {
                  return (
                    <PageRenderer markdownFiles={['descriptions/more.md']} />
                  )
                }}
              />
              <Route
                path="/scenarios"
                render={() => {
                  return (
                    <PageRenderer markdownFiles={['descriptions/scenarios.md']} />
                  )
                }}
              />
			  <Route
                path="/findings"
                render={() => {
                  return (
                    <PageRenderer markdownFiles={['descriptions/findings.md']} />
                  )
                }}
              />
              <Route
                path="/contact"
                render={() => {
                  return (
                    <PageRenderer markdownFiles={['descriptions/contact.md']} />
                  )
                }}
              />
            </MainSwitch>
            <FundingText>This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement <Bold> N. 857811.</Bold></FundingText>
            <FundingText>The content of this website reflects only the author’s view only and the European Commission is not responsible for any use that may be made of the information it contains.</FundingText>
          </Content>
        </RightColumn>
      </Page>
    )
  }
}

export default withRouter(App)

