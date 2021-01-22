import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Octicon from "react-octicon";
import { useTranslation } from "react-i18next";

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

function Welcome(props) {
  const { t } = useTranslation();
  return (
    <AlertContainer isOpen={props.isOpen}>
      {props.isOpen && <AlertTitle>{t("welcome-text-" + props.tab + ".welcome-1")}</AlertTitle>}
      {props.isOpen && <AlertBody>
        <AlertBodyParagraph>{t("welcome-text-" + props.tab + ".welcome-2")}</AlertBodyParagraph>
        {props.tab === "tab3" && <AlertBodyParagraph><img src="images/Cost_formula_orange_background.png" alt="Cost_formula"/></AlertBodyParagraph>}
        <AlertBodyParagraph>{t("welcome-text-" + props.tab + ".welcome-3")}</AlertBodyParagraph>
        <AlertBodyParagraph>{t("welcome-text-" + props.tab + ".welcome-4")}</AlertBodyParagraph>
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

export default Welcome;
