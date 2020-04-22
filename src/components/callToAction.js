import PropTypes from 'prop-types'
import React from 'react';

/* 
Example Usage:
    <CallToAction href="#" classNames="my-cta">Apply Now</CallToAction>
*/

const CallToAction = ({ children, href, classNames }) => {
    const classes = `call-to-action ${classNames}`

    return(
        <a className={classes} href={href}>
            {children}
        </a>
    )
}

CallToAction.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    classNames: PropTypes.string,
  }
  
CallToAction.defaultProps = {
    children: ``,
    href: '#',
    classNames: ``,
  }

export default CallToAction
