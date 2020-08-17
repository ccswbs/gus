import PropTypes from 'prop-types'
import React from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

/* 
Example Usage:
    <CallToAction href="#" classNames="optional-style">Apply Now</CallToAction>
*/

const CallToAction = ({ children, href, goalEventCategory, goalEventAction, classNames }) => {
    const classes = (classNames !== `` ? `call-to-action ${classNames}`: `call-to-action`);
    
    if(goalEventCategory !== ``){
        return(
            <a className={classes} href={href} onClick={e => {
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
        <a className={classes} href={href} >
            {children}
        </a>
    )
}

CallToAction.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    goalEventCategory: PropTypes.string,
    goalEventAction: PropTypes.string,
    classNames: PropTypes.string,
  }
  
CallToAction.defaultProps = {
    children: ``,
    href: '#',
    goalEventCategory: ``,
    goalEventAction: ``,
    classNames: ``,
  }

export default CallToAction
