import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { setHeadingLevel, contentExists } from '../utils/ug-utils.js';

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

const GridCell = (props) => {
    const classes = `grid-cell ${props.extraClasses}`
    const Tag = props.tag;

    // General Scenario: heading, image and text below (link and text optional)
    if(contentExists(props.heading) && contentExists(props.image)){
        const Heading = setHeadingLevel(props.headingLevel);
        const HeadingElement = (contentExists(props.text)) 
            ? <Heading className="grid-heading">{props.heading}</Heading> 
            : <span className={`grid-heading ${Heading}`}>{props.heading}</span>;

        const gridContent = () => {
            return(<React.Fragment>
                        {props.image && <div className="img-container">{props.image}</div>}
                        {HeadingElement}
                        {contentExists(props.text) && <span className="grid-text">{props.text}</span>}
                    </React.Fragment>
            )
        }

        // If link exists, add optional link
        if(contentExists(props.url)){
            return(
                <Tag className={classes}>
                    <Link to={props.url}>{gridContent()}</Link>
                </Tag>
            )
        }

        // Else return gridContent as is
        return (
            <Tag className={classes}>
                {gridContent()}
            </Tag>
        )
    }

    // Fallback Scenario: For gridCells that contain something other than an image and heading,
    // Just return the children
    if(contentExists(props.children)){
        return(
            <Tag className={classes}>
                {props.children}
            </Tag>
        )
    }

    return null;
}

GridCell.propTypes = {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    heading: PropTypes.string,
    headingLevel: PropTypes.string,
    image: PropTypes.object,
    tag: PropTypes.string,
    text: PropTypes.string,
  }
  
  GridCell.defaultProps = {
    children: ``,
    extraClasses: 'col-md-3 col-sm-6',
    heading: ``,
    headingLevel: 'h3',
    image: null,
    tag: 'li',
    text: ``,
  }

export default GridCell
