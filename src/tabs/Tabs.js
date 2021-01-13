import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TabLayout = styled.div`
  display: none;
  ${breakpoint("desktop")`
    display: flex;  
    height: 50px;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: flex-start;
    width: 100%;
    padding-left: 20px;
    color: white;
    background: rgb(176, 176, 176);
    visibility: visible;
  `}
`;

const TabItem = styled(Link)`
  font-weight: ${props => (props.selected ? "bold" : "normal")};
  font-size: 1em;
  margin: 3px 0px 0px 0px;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  align-items: center;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  color: ${props => (props.selected ? "#ff5555" : "#285c6a")};
  background: ${props => (props.selected ? "white" : "inherit")};
`;

function Tabs(props) {
  const { t } = useTranslation();
  return (
    <TabLayout>
      <TabItem to="/" selected={props.selectedChartgroup === "/"}>
        {t("tabs.tab1")}
      </TabItem>
      <TabItem to="/tab2" selected={props.selectedChartgroup === "/tab2"}>
        {t("tabs.tab2")}
      </TabItem>
      <TabItem to="/tab3" selected={props.selectedChartgroup === "/tab3"}>
        {t("tabs.tab3")}
      </TabItem>
    </TabLayout>
  );
}

Tabs.propTypes = {
  selectedChartgroup: PropTypes.string.isRequired
};

export default Tabs;
