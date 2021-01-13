import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as Regions } from './regions.svg'

const activeCountries = ['dk', 'de', 'fr', 'hr', 'it', 'nl', 'se',]

const countryColorsCSS = props =>{
  return(
  props.countries.map(
    country => `
    #${country} {
      fill:  ${props.selectedCountries.includes(country) ? 'rgb(179,107,92)' : '#cccccc'};
      :hover {fill: rgb(84, 94, 102);}
    }
    `
))
  }

 const StyledRegions = styled.div`
  ${props => countryColorsCSS(props)}
  fill: rgb(129, 102, 96);
  stroke: rgb(129, 102, 96);
  stroke-width: 0.46875;
  stroke-miterlimit: 22.9256;
  position: relative;
`
const MapContainer = (props) => (
  <StyledRegions selectedCountries={props.selectedCountries} countries={activeCountries}> 
    <Regions
      onClick={event => {
        const id = event.target.id
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