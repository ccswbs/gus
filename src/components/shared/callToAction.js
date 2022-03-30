import PropTypes from 'prop-types'
import React from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const CallToAction = ({ children, href, goalEventCategory, goalEventAction }) => {
    if (goalEventCategory) {        
        return(
            <a className="btn btn-primary fs-1 my-4 p-4 w-100" href={href} onClick={e => {
                // Track the custom click
                trackCustomEvent({
                  category: goalEventCategory,
                  action: goalEventAction,
                })
              }}>
                {children}
            </a>
        )
    }
    return(
        <a className="btn btn-primary fs-1 fw-bold my-4 p-4 w-100" href={href}>
            {children}
        </a>
    )
}

CallToAction.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    goalEventCategory: PropTypes.string,
    goalEventAction: PropTypes.string,
}
  
CallToAction.defaultProps = {
    children: ``,
    href: '#',
    goalEventCategory: ``,
    goalEventAction: ``,
}

export default CallToAction