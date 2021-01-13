import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Octicon from "react-octicon";
import { useTranslation } from "react-i18next";

const AlertContainer = styled.div`
  position: relative;
  padding: 20px;
  padding-top: 35px;
  margin-bottom: 30px;
  border-width: 1px;
  border-color: rgb(234, 100, 67);
  border-style: solid;
  color: white;
  background-color: rgb(234, 100, 67);
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  flex-direction: column;
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
    <AlertContainer>
      <AlertTitle>{t("welcome-text-" + props.tab + ".welcome-1")}</AlertTitle>
      <AlertBody>
        <AlertBodyParagraph>{t("welcome-text-" + props.tab + ".welcome-2")}</AlertBodyParagraph>
        <AlertBodyParagraph>{t("welcome-text-" + props.tab + ".welcome-3")}</AlertBodyParagraph>
        <AlertBodyParagraph>{t("welcome-text-" + props.tab + ".welcome-4")}</AlertBodyParagraph>
      </AlertBody>
      <CloseWindowIcon
        onClick={event => props.closeWelcome(event, "showWelcome", false)}
      >
        <Octicon name="x" />
      </CloseWindowIcon>
    </AlertContainer>
  );
}

Welcome.propTypes = {
  closeWelcome: PropTypes.func.isRequired
};

export default Welcome;
