import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { setHeadingLevel, contentExists } from 'utils/ug-utils.js';
/*
LinksElement.propTypes = {
    children: PropTypes.node.isRequired, - to pass through any childredn
    extraClasses: PropTypes.string, - extra classes that are needed
    headingLink: PropTypes.string, - Title of the link 
    headingLinkLevel: PropTypes.string, - heading level to use for the links
    image: PropTypes.object, - optional image (if image exists Grid is default, otherwise List)
    numColumns: PropTypes.number, - number of columns to use for grid - list will not be in a column 
    tag: PropTypes.string, - outer tag to use 
    text: PropTypes.node,?
    displayType: PropTypes.string, - display type for Grid or List
  }

*/
function setColumnClasses(numColumns) {
    switch(numColumns) {
        case 1:
            return 'col-sm-12';
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
function setElementClass(displayType) {
    switch(displayType) {
        case 'list':
            return 'list-element';
        case 'small-grid':
            return 'col';
        default:
            return 'col';
      }
}

function setHeadingClass(displayType) {
    switch(displayType) {
        case 'list':
            return 'list-heading';
        case 'small-grid':
            return 'small-grid-heading';
        default:
            return 'grid-heading';
      }
}

const LinksElement = (props) => {
    const columnClasses = setColumnClasses(props.numColumns);
    const elementClass = setElementClass(props.displayType);
    const headingClass = setHeadingClass(props.displayType);
    const classes = `${elementClass} ${columnClasses} ${props.extraClasses}`
    const Tag = props.tag;

    // General Scenario: heading and text below (image, link and text optional)
    if(contentExists(props.headingLink)){
        const levelHeading = setHeadingLevel(props.headingLinkLevel);
        const HeadingElement = (contentExists(props.text)) 
            ? <levelHeading className="linkswidget-heading">{props.headingLink}</levelHeading> 
            : <span className={`${headingClass} ${levelHeading}`}>{props.headingLink}</span>;
        const imageLinkClass = (contentExists(props.image))? "news-link": "";
        const linksContent = () => {
            if (contentExists(props.image)){
                return(<React.Fragment>
                    {props.image && <div className="img-container">{props.image}</div>}
                    {HeadingElement}
                    {contentExists(props.text) && <span className="grid-text">{props.text}</span>}
                </React.Fragment>
                )
            } else {
                return(<React.Fragment>
                    {HeadingElement}
                    {contentExists(props.text) && <span className="list-text">{props.text}</span>}
                </React.Fragment>
                )
            }        
        }
        // If link exists, add optional link
        if(contentExists(props.url)){
            // check to see if url is external - i.e. it contains http to use <a href..> ... </a> 
            // otherwise use the gatsby Link comand for internal links
            if (props.url.includes("http")){
                return(
                    <Tag className={classes}>
                    <a href={props.url} className={imageLinkClass}>{linksContent()}</a>
                </Tag>
                )
            }else { 
     
                return(
                    <Tag className={classes}>
                        <Link to={props.url} className={imageLinkClass}>{linksContent()}</Link>
                    </Tag>
                )}
        } else {
            // Else return linksContent as is
            return (
                <Tag className={classes}>
                    {linksContent()}
                </Tag>
            )
        }
        }

        // Fallback Scenario: For LinksElements that contain something other than an image and heading,
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

LinksElement.propTypes = {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    headingLink: PropTypes.string,
    headingLinkLevel: PropTypes.string,
    image: PropTypes.object,
    numColumns: PropTypes.number,
    tag: PropTypes.string,
    text: PropTypes.node,
    displayType: PropTypes.string,
  }
  
  LinksElement.defaultProps = {
    children: ``,
    extraClasses: ``,
    headingLink: ``,
    headingLinkLevel: 'h2',
    image: null,
    numColumns: 4,
    tag: 'ul',
    text: ``,
    displayType: `grid`
  }

export default LinksElement
