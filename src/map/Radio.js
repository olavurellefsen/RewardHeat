import React from "react"
import styled from "styled-components"

const Radio = ({checked}) => {

  return(
    <Container>
      <Box 
        checked={checked}
        disabled={true}
      ></Box>
      <Indicator></Indicator>
    </Container>
  )
}

const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 18px;
  cursor: pointer;
  font-size: 42px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: 0.2s;
  width: 0px;

  &:hover {
    background-color: #ccc;
    transform: scale(1.1);
  }
  &:checked {
    background-color: #80655F;
  }
`
const Box = styled.input.attrs({type: 'radio'})`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 1px;
  width: 1px;
  margin-left: 30px;

  &:checked {
    display: block;
  }
`
const Indicator = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #9F9F9F;

  ${Box}:checked + & {
    background-color: white;
  }

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    opacity: 0;
    transition: all 400ms;
  }
  ${Box}:checked + &:after {
    background-color: #80655F;
    opacity: 1;
  }
`


export default Radio