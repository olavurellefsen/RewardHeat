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
            {!narrowVersion && <div 
              key={"LeftMenuContry"+i}>{mapRegions.find((region)=>region.path_id === country).country}
            </div>}
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
`
const Flag = styled.img`
  padding: 3px;
`


export default CountryList