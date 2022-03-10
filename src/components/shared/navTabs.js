import PropTypes from 'prop-types';
import React from 'react';
import 'styles/navTabs.css';

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

function NavTabs (props) {
    const classes = `nav nav-pills nav-justified ${props.classNames}`

    return(
        <>
            <nav>
                <div className={classes} role="tablist">
                    {props.headings}
                </div>
            </nav>
            <div className="tab-content" id="pills-tabContent">
                {props.children}
            </div>
        </>
    )
}

NavTabs.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
    headings: PropTypes.array,
}
  
NavTabs.defaultProps = {
    children: ``,
    classNames: ``,
    headings: null,
    propTypes: null,
  }

export default NavTabs
