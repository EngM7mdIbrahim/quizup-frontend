import React from "react";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import "./styles.css";

const getEmptyInavlidFragment = (isEmpty) => {
  return (
    <div className="empty-fragment-cont">
      <AppLabel type={TYPES.SUB_SUB_TITLE} style={{ textAlign: "center" }}>
        {isEmpty}
      </AppLabel>
    </div>
  );
};

export default function FragmentHandler({
  style = {},
  fragments = undefined,
  selected = undefined,
  className = "",
}) {
  if (!fragments) {
    return getEmptyInavlidFragment("No fragments passed!");
  }

  if (fragments.findIndex((fragment) => fragment.name === selected) === -1) {
    return getEmptyInavlidFragment("Invalid selected Fragment!");
  }
  let component = fragments.find(
    (fragment) => fragment.name === selected
  ).component;
  if (!component) {
    return getEmptyInavlidFragment(
      `The fragment named "${selected}" seems that it doesn't have a component to load!`
    );
  }

  const styledComponent = React.isValidElement(component) ? React.cloneElement(component, { style: {alignSelf: 'stretch', flex: 1} }): component;
  return (
    <div style={{ ...style }} className={`fragment-handler-cont ${className}`}>
      {styledComponent}
    </div>
  );
}