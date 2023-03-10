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

function NavTabContent (props) {
    let arialabel = `${props.id}-tab`;
    let classes = (props.active === true) ? `active show tab-pane fade`:`tab-pane fade`;
    if(props.classNames !== ``){
        classes += ` ${props.classNames}`;
    }

    return(
        <div className={classes} id={props.id} role="tabpanel" aria-labelledby={arialabel}>
            {props.content}
        </div>
    )
}

NavTabContent.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
    id: PropTypes.string,
}
  
NavTabContent.defaultProps = {
    children: ``,
    classNames: ``,
    id: ``,
  }

export default NavTabContent
