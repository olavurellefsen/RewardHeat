import React from "react"
import styled from "styled-components"
import mapRegions from "../data/mapRegionToDataRegions"

const CountryList = ({
  countries, 
  selectedCountries, 
  selectCountry,
  narrowVersion = false
}) => {
  console.log("countries: ", countries)
  console.log("mapRegions: ", mapRegions)
  console.log("selectedCountries: ", selectedCountries)
  return (
    <Container>
      {countries.map((country, i)=>{
        console.log("country name: ", mapRegions.find((region)=>region.path_id === country).country)
        console.log("country === selectedCountries[0]: ", country === selectedCountries[0])
        return(
          <CountryContainer
            onClick={()=>{selectCountry(country)}}
          >
            <Radio 
              type="radio" 
              checked={country === selectedCountries[0]}
              
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
`
const Flag = styled.img`
  padding: 3px;
`
const Radio = styled.input`
color: green;
&:checked {
  background-color: red;
  color: pink;
  border: 1px solid pink;
}
&:hover {
  ${'' /* color: black;
  background-color: red; */}
}
`

export default CountryList