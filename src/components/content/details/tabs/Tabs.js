import React, { useState } from "react";
import PropTypes from "prop-types";

import SingleTab from "./SingleTab";
import "./Tabs.scss";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props?.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="tabs">
      <ol className="tabs-list">
        {children.map((tabElement) => {
          const { label } = tabElement.props;
          return (
            <SingleTab
              activeTab={activeTab}
              label={label}
              key={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((tabElement) => {
          if (tabElement.props?.label !== activeTab) {
            return undefined;
          } else {
            return tabElement.props.children;
          }
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.array.isRequired
};

export default Tabs;
