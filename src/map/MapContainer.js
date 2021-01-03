import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as Regions } from './regions.svg'

const activeCountries = ['dk', 'de', 'fr', 'hr', 'it', 'nl', 'se',]

const countryColorsCSS = props =>{
  console.log("countryColors props: ", props)
  return(
  props.countries.map(
    country => `
    #${country} {
      fill:  ${props.selectedCountries.includes(country) ? 'red' : '#cccccc'};
      :hover {fill: #80b3c3;}
    }
    `
))
  }

 const StyledRegions = styled.div`
  ${props => countryColorsCSS(props)}
  fill: #616161;
  stroke: red;
  stroke-width: 0.46875;
  stroke-miterlimit: 22.9256;
  position: relative;
`
const MapContainer = (props) => (
  <StyledRegions selectedCountries={props.selectedCountries} countries={activeCountries}> 
    <Regions
      onClick={event => {
        const id = event.target.id
        console.log("map id: ", id)
        if (id && activeCountries.includes(id)) {
          event.preventDefault()
          props.selectCountry(id)
        }
      }}
    />
  </StyledRegions>
)

MapContainer.propTypes = {
    selectedCountries: PropTypes.array.isRequired,
    selectCountry: PropTypes.func.isRequired
};
  
export default MapContainer;