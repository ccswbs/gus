import React from 'react';
import PropTypes from 'prop-types';
import LinksParent from './linksParent';
import { contentExists, setHeadingLevel } from '../utils/ug-utils.js';
import '../styles/list.css';


function LinksOuter (props) {


    const setExtraClasses = (props.displayType==='grid')? "row row-with-vspace site-content content-area": '';
    const setBackGroundClass = (props.displayType==='grid')? "full-width-container bg-light grid":"row row-with-vspace site-content full-width-container list";

    let Heading = setHeadingLevel(props.headingLevel);
	if (contentExists(props.children)) {
		return (<div className={setBackGroundClass}>
                    <div className="container page-container">
                        <Heading>{props.heading}</Heading>
                        <p>{props.description}</p>
                        <LinksParent extraClasses={setExtraClasses}>
                            {props.heading && <div className="col-md-12 content-area">
                            </div>}
                            {props.children}
                        </LinksParent>
                    </div>
                </div>
            )

	} else {
		return null;
	}
}

LinksOuter.propTypes = {
    children: PropTypes.node.isRequired,
    columnClass: PropTypes.string,
    heading: PropTypes.string,
    headingLevel: PropTypes.string,
    description: PropTypes.string,
    displayType: PropTypes.string,
}
LinksOuter.defaultProps = {
    children: ``,
    columnClass: 'col-md-3 col-sm-6',
    heading: ``,
    headingLevel: ``,
    description: ``,
    displayType: `grid`,
}

export default LinksOuter