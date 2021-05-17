import React from 'react';
import PropTypes from 'prop-types';
import LinksParent from './linksParent';
import { contentExists, setHeadingLevel } from '../utils/ug-utils.js';
import '../styles/list.css';


function LinksOuter (props) {

    const setExtraClasses = (props.displayType==='grid')? "row grid-row ": ``;
    const setBackGroundClass = (props.displayType==='grid')? "grid":"row list";

    let Heading = setHeadingLevel(props.headingLevel);
	if (contentExists(props.children)) {
		return (<div className={setBackGroundClass}>
                    <div>
                    <Heading>{props.heading}</Heading>
                    <p>{props.description}</p>
                        <LinksParent extraClasses={setExtraClasses}>
                         
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