import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

const CallToAction = ({ children, btnClass, classes, href, goalEventCategory, goalEventAction }) => {
  let className = classNames(btnClass,'btn fs-1 me-4 p-4 w-100');
  if (goalEventCategory) {    
    return (
      <a
        className = {className}
        href={href}
        onClick={(e) => {
          // Track the custom click
          window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
          window.dataLayer.push({
            event: "custom_event",
            category: goalEventCategory,
            action: goalEventAction,
          });
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};

CallToAction.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.string,
  goalEventAction: PropTypes.string,
  goalEventCategory: PropTypes.string,
  href: PropTypes.string,
};

/* will remove the default classes if className works as expected */ 
CallToAction.defaultProps = {
  children: ``,
  classes: "btn btn-primary fs-1 me-4 p-4 w-100",
  href: "#",
  goalEventAction: ``,
  goalEventCategory: ``,
};

export default CallToAction;
