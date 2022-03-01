import React from 'react';
import PropTypes from 'prop-types';
import { contentExists, setHeadingLevel } from 'utils/ug-utils.js';
import 'styles/list.css';

function LinksOuter (props) {

    const setBackGroundClass = (props.displayType === "grid") ? "grid" : "row list";

    let Heading = setHeadingLevel(props.headingLevel);
	if (contentExists(props.children)) {
		return (<div className={setBackGroundClass}>
                    <div className="col-md-12">
                    {contentExists(props.heading) && <Heading>{props.heading}</Heading>}
                    {contentExists(props.description) && <p>{props.description}</p>}
                        {props.displayType === "grid" ? 
                        <div className="row g-5">
                            {props.children}
                        </div> 
                        : 
                        <ul>{props.children}</ul>}
                    </div>
                </div>)
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
    columnClass: '',
    heading: ``,
    headingLevel: ``,
    description: ``,
    displayType: `grid`,
}

export default LinksOuter