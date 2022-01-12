import PropTypes from 'prop-types';
import React from 'react';

/* 
Example Usage:
    <NavTabs classNames="optional-class" headings={
        <>
            <NavTabHeading active={true} heading="Tab Heading 1" controls="tab1" />
            <NavTabHeading heading="Tab Heading 2" controls="tab2" />
            <NavTabHeading heading="Tab Heading 3" controls="tab3" />
        </>
        }>
            <NavTabContent active={true} id="tab1" content={<div>Test 1</div>} classNames="optional-class" />
            <NavTabContent id="tab2" content={<div>Test 2</div>} classNames="optional-class" />
            <NavTabContent id="tab3" content={<div>Test 3</div>} classNames="optional-class" />
    </NavTabs>
*/

function NavTabHeading (props) {
    let id = `${props.controls}-tab`;
    let href = `#${props.controls}`;
    let classes = (props.active === true) ? `active nav-item nav-link`:`nav-item nav-link`;
    if(props.classNames !== ``){
        classes += ` ${props.classNames}`;
    }

    return(
            <a className={classes} 
                id={id} 
                href={href} 
                role="tab" 
                data-bs-toggle="pill" 
                aria-controls={props.controls} 
                aria-selected={props.active}>
                    {props.heading.toUpperCase()}
            </a>
    )
}

NavTabHeading.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
    controls: PropTypes.string,
}
  
NavTabHeading.defaultProps = {
    children: ``,
    classNames: ``,
    controls: ``,
  }

export default NavTabHeading