import PropTypes from 'prop-types';
import React from 'react';

/* 
Example Usage:
    <GridParent extraClasses="my-grid-classes">

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

    </GridParent>
*/

const GridParent = (props) => {

    const classes = `${props.extraClasses}`;
    const Tag = props.tag;
    return(<Tag className={classes}>
                {props.children}
            </Tag>
    )
}

GridParent.propTypes = {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    tag: PropTypes.string,
}
  
GridParent.defaultProps = {
    children: ``,
    extraClasses: ``,
    tag: 'ul',
  }

export default GridParent
