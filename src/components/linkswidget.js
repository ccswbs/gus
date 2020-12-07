import React from 'react';
import PropTypes from 'prop-types';
import GridParent from './gridParent';
import { contentExists, setHeadingLevel } from '../utils/ug-utils.js';
import '../styles/list.css';


function LinksWidget (props) {
    let Heading = setHeadingLevel(props.headingLevel);
    console.log(props,"list")
	if (contentExists(props.children)) {
		return (<div className="full-width-container bg-light links">
                    <div className="container page-container">
                        <GridParent extraClasses="row row-with-vspace site-content content-area">
                            {props.heading && <div className="col-md-12 content-area">
                                <Heading>{props.heading}</Heading>
                            </div>}
                            {props.children}
                        </GridParent>
                    </div>
                </div>
            )

	} else {
		return null
	}
}

LinksWidget.propTypes = {
    children: PropTypes.node.isRequired,
    columnClass: PropTypes.string,
    heading: PropTypes.string,
    headingLevel: PropTypes.string,
}

LinksWidget.defaultProps = {
    children: ``,
    columnClass: 'col-md-3 col-sm-6',
    heading: ``,
    headingLevel: 'h3',
}

export default LinksWidget