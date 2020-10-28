import React from 'react';
import PropTypes from 'prop-types';
import GridParent from '../components/gridParent';
import { contentIsNullOrEmpty, setHeadingLevel } from '../utils/ug-utils.js';
import '../styles/grid.css';

function Grid (props) {
    let Heading = setHeadingLevel(props.headingLevel);

	if (!contentIsNullOrEmpty(props.children)) {
		return (<div className="full-width-container bg-light grid">
                    <div className="container page-container">

                        {props.heading && <div className="col-md-12 content-area">
                            <Heading>{props.heading}</Heading>
                        </div>}

                        <GridParent extraClasses="row row-with-vspace site-content content-area">
                            {props.children}
                        </GridParent>
                    </div>
                </div>
            )

	} else {
		return null
	}
}

Grid.propTypes = {
    columnClass: PropTypes.string,
    gridData: PropTypes.array,
    heading: PropTypes.string,
    headingLevel: PropTypes.string,
}

Grid.defaultProps = {
    columnClass: 'col-md-3 col-sm-6',
    gridData: null,
    heading: ``,
    headingLevel: 'h2',
}

export default Grid