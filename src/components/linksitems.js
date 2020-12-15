import PropTypes from 'prop-types';
import React from 'react';
import LinksOuter from './linksOuter'
import LinksElement from './linksElement'
import { Link } from 'gatsby';

import { contentExists } from '../utils/ug-utils';

function LinksItems (props) {
	
	const aliasData = require('../../config/aliases/aliasfile.yml');

		if(contentExists(props.pageData) && props.pageData.length !== 0){
			return (
				<React.Fragment>
				<LinksOuter key={props.pageData.drupal_id} heading={props.heading} headingLevel={props.headingLevel} description={props.description} 
								displayType={props.displayType}>
					{props.pageData.map (paragraph  => {
						if(contentExists(paragraph.relationships)){
						// if images exists - set the images to use in the grid display
						const image = (contentExists(paragraph.relationships.field_link_image)) ? paragraph.relationships.field_link_image.relationships.field_media_image : null;
						const imageFile = (contentExists(image) && contentExists(image.localFile.childImageSharp)) ? 
												<img src={image.localFile.childImageSharp.resize.src} alt="" /> : null;
						// set the link to the url provided, if internal Drupal link (entity or internal) - clean up the URI to work with Link command,
						// to handel a <noLink>, if external link pass through, otherwise set to null

						const urlLink = (contentExists(paragraph.field_link_url.uri)) ? (paragraph.field_link_url.uri.includes("entity:node/")) ? 
							aliasData[paragraph.field_link_url.uri.replace("entity:node/","")]: (paragraph.field_link_url.uri.includes("internal:/")) ? ("/") : (
							paragraph.field_link_url.uri.includes("<nolink>")) ? null : paragraph.field_link_url.uri :null;
						// set heading level to one lower based on the heading level of the header, if header does not exists set to h2
						const nextHeadingLevel = (props.displayType ==='grid')? (contentExists(props.heading))? (props.headingLevel === "h2")? "h3": 
										(props.headingLevel==="h3") ? "h4" : "h5": "h2": '';
						const setTag = (props.displayType === 'list') ? 'li': 'li';
						return <LinksElement key={paragraph.drupal_id} 
									url={urlLink} 
									image={imageFile} 
									headingLink={paragraph.field_link_url.title}
									headingLinkLevel= {nextHeadingLevel}
									numColumns={props.numColumns} 
									displayType={props.displayType}
									tag={setTag}/>
						}
						return null;
					})}
				</LinksOuter>
				</React.Fragment>
			)
		}
        return null;
}

LinksItems.propTypes = {
    pageData: PropTypes.array,
	displayType: PropTypes.string,
	heading: PropTypes.string,
	headingLevel: PropTypes.string,
	description: PropTypes.string,
	numColumns: PropTypes.number,

}
  
LinksItems.defaultProps = {
    pageData: ``,
	displayType: `list`,
	heading: ``,
	headingLevel: ``,
	description: ``,
	numColumns: 4,

  }

export default LinksItems
