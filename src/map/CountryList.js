import React from "react"
import styled from "styled-components"
import mapRegions from "../data/mapRegionToDataRegions"
import Radio from "./Radio"

const CountryList = ({
  countries, 
  selectedCountries, 
  selectCountry,
  narrowVersion = false
}) => {
  return (
    <Container>
      {countries.map((country, i)=>{
        return(
          <CountryContainer key={"couti" + i}
            onClick={()=>{
              selectCountry(country)}}
          >
            <Radio 
              type="radio" 
              checked={selectedCountries.includes(country)}
              
            />
            <Flag src={"./images/flags/" + country + ".png"} />
            {!narrowVersion && <CountryName 
              key={"LeftMenuContry"+i}>{mapRegions.find((region)=>region.path_id === country).country}
            </CountryName>}
          </CountryContainer>
        )
      })}

    </Container>
  )
}

const Container = styled.div`
`
const CountryContainer = styled.div`
  display: flex;
  padding: 2px;
  align-items: center;
  margin-left: 15px;
  z-index: 10;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    ${'' /* background-color: #ccc; */}
    ${'' /* transform: scale(1.1); */}
    opacity: 1;
  }
  
`
const Flag = styled.img`
  padding: 3px;
  
`
const CountryName = styled.div`
`


export default CountryList