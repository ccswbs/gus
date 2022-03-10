import React from 'react';
import PropTypes from 'prop-types';
import GridParent from 'components/shared/gridParent';
import { contentExists, setHeadingLevel } from 'utils/ug-utils.js';
import 'styles/grid.css';

/* 
Example Usage:
    <Grid extraClasses="my-grid">

        <GridCell key={my-content.drupal_id} 
            url={value} 
            image={imageFile}
            heading={my-content.title}
            headingLevel="h3" 
            text="my summary text" 
            extraClasses="my-classes" />

        <GridCell key={my-content.drupal_id}>
            <h3>This is my unique content that potentially has no image associated with it</h3>
            <p>In this case, I can put anything I want in the grid cell</p>
            <p>The children are just passed straight through as is</p>
        </GridCell>

    </Grid>
*/

function Grid (props) {
    let Heading = setHeadingLevel(props.headingLevel);
   
	if (contentExists(props.children)) {
		return (<div className="full-width-container bg-light grid">
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

Grid.propTypes = {
    children: PropTypes.node.isRequired,
    columnClass: PropTypes.string,
    heading: PropTypes.string,
    headingLevel: PropTypes.string,
}

Grid.defaultProps = {
    children: ``,
    columnClass: 'col-md-3 col-sm-6',
    heading: ``,
    headingLevel: 'h3',
}

export default Grid