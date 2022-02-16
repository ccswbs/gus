import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { setHeadingLevel, contentExists } from 'utils/ug-utils.js';

/* 
Example Usage:
    <Grid extraClasses="my-grid">

        <GridCell key={my-content.drupal_id} 
            url={value} 
            image={imageFile}
            heading={my-content.title}
            headingLevel="h3" 
            text="my summary text" 
            numColumns={3}
            extraClasses="my-classes" />

        <GridCell key={my-content.drupal_id}>
            <h3>This is my unique content that potentially has no image associated with it</h3>
            <p>In this case, I can put anything I want in the grid cell</p>
            <p>The children are just passed straight through as is</p>
        </GridCell>

    </Grid>
*/

function setColumnClasses(numColumns) {
    switch(numColumns) {
        case 2:
            return 'col-sm-6';
        case 3:
            return 'col-md-4 col-sm-6';
        case 4:
            return 'col-md-3 col-sm-6';
        default:
            return 'col-md-3 col-sm-6';
      }
}

const GridCell = (props) => {
    const columnClasses = setColumnClasses(props.numColumns);
    const classes = `grid-cell ${columnClasses} ${props.extraClasses}`
    const Tag = props.tag;

    // General Scenario: heading, image and text below (link and text optional)
    if(contentExists(props.headingLink) && contentExists(props.image)){
        const levelHeading = setHeadingLevel(props.headingLinkLevel);
        const HeadingElement = (contentExists(props.text)) 
            ? <levelHeading className="grid-heading">{props.headingLink}</levelHeading> 
            : <span className={`grid-heading ${levelHeading}`}>{props.headingLink}</span>;

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
            // check to see if url is external - i.e. it contains http to use <a href..> ... </a> 
            // otherwise use the gatsby Link comand for internal links
            if (props.url.includes("http")){
                return(
                    <Tag className={classes}>
                    <a href={props.url} className="news-link">{gridContent()}</a>
                </Tag>
                )
            }else { 
     
                return(
                    <Tag className={classes}>
                        <Link to={props.url} className="news-link">{gridContent()}</Link>
                    </Tag>
                )}
        } else {
            // Else return gridContent as is NOTE: will need to add alt to this image
            return (
                <Tag className={classes}>
                    {gridContent()}
                </Tag>
            )
        }
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
    headingLink: PropTypes.string,
    headingLinkLevel: PropTypes.string,
    image: PropTypes.object,
    numColumns: PropTypes.number,
    tag: PropTypes.string,
    text: PropTypes.node,
  }
  
  GridCell.defaultProps = {
    children: ``,
    extraClasses: ``,
    headingLink: ``,
    headingLinkLevel: 'h2',
    image: null,
    numColumns: 4,
    tag: 'li',
    text: ``,
  }

export default GridCell
