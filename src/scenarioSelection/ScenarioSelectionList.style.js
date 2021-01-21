import styled from "styled-components";
import "@fontsource/ropa-sans"

export const ScenarioList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ScenarioDivider = styled.div`
  height: 5px;
`;

export const ScenarioHeader = styled.div`
  font-size: ${props => (props.narrowVersion ? "10px" : "20px")};
  padding: ${props => (props.narrowVersion ? "8px" : "0 12px 0 15px")};
  margin: 0px 0px 5px 0px;
  text-align: center;
  font-family: Ropa Sans;
`;

export const ScenarioOption = styled.div`
  justify-content: space-between;
  width: 100%;
  font-size: ${props => (props.narrowVersion ? "0.7em" : "0.9em")};
  display: flex;
  flex-direction: ${props => (props.narrowVersion ? "column" : "row")};
  align-items: flex-start;
  ${'' /* height: 36px; */}
  ${'' /* padding: ${props => (props.narrowVersion ? "5px" : "0 12px 0 0px")}; */}
  position: relative;
  width: 100%;
  border-radius: 0;
  background-color: ${props =>
    props.selected ? "#ff5555" : props.selected2 ? "#285c6a" : "inherit"};
  color: ${props =>
    props.selected ? "white" : props.selected2 ? "white" : "rgb(184,176,183)"};
  &:hover {
    background-color: ${props =>
      props.selected ? "#ff5555" : props.selected2 ? "#285c6a" : "#555"};
    > * {
      font-weight: ${props =>
        props.selected ? "bold" : props.selected2 ? "bold" : "normal"};
    }
  }
  pointer: none;
`;
export const ScenarioNameContainer = styled.div`
  display: flex;
  ${'' /* flex:1; */}
  align-self: stretch;
  align-items: center;
  padding: ${props => (props.narrowVersion ? "0px" : "5px 12px 5px 15px")};
  justify-content: ${props => (props.narrowVersion ? "flex-start" : "flex-start")};
  &:hover {
    cursor: pointer
  }
`;

export const IconContainer = styled.div`
  display: flex;
  padding: ${props => (props.narrowVersion ? "0px" : "5px 12px 5px 0px")};
  `;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  ${'' /* padding-right: 5px; */}
  &:hover {
    cursor: ${props =>
    props.available ? "pointer" :  "default"};
    color: ${props =>
    props.available ? "black" :  "default"};;
  }
  color: ${props =>
    props.selected ? "#80655F" :  "rgb(184,176,183)"};
  border: ${props =>
    props.selected ? "1px solid #80655F" :  "1px solid rgb(184,176,183)"};;
  margin-left: 3px;
  margin-right: 3px;
`;

export const MenuSeparatorLine = styled.hr`
  margin: 0.25em 12px 0.25em 15px;
  border-color: #555;
  border-width: 1px;
  width: 100%;
`;