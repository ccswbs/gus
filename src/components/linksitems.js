import PropTypes from 'prop-types';
import React from 'react';
import Grid from './grid';
import GridCell from './gridCell';

import { contentExists } from '../utils/ug-utils';

function LinksItems (props) {

	const aliasData = require('../../config/aliases/aliasfile.yml');

	if(props.displayType==='grid') {
		
		if(contentExists(props.pageData) && props.pageData.length !== 0){
			return (
				<Grid key={props.pageData.drupal_id} heading={props.heading} headingLevel={props.headingLevel}>
					{props.pageData.map (paragraph  => {
						if(contentExists(paragraph.relationships)){
						// if images exists - set the images to use in the grid display
						const image = (contentExists(paragraph.relationships.field_link_image)) ? paragraph.relationships.field_link_image.relationships.field_media_image : null;
						const imageFile = (contentExists(image) && contentExists(image.localFile.childImageSharp)) ? <img src={image.localFile.childImageSharp.resize.src} alt="" /> : null;
						// set the link to the url provided, if internal Drupal link (entity or internal) - clean up the URI to work with Link command,
						// to handel a <noLink>, if external link pass through, otherwise set to null
						const urlLink = (paragraph.field_link_url.uri.includes("entity:node/")) ? aliasData[paragraph.field_link_url.uri.replace("entity:node/","")]:
							(paragraph.field_link_url.uri.includes("internal:/")) ? ("/") : (paragraph.field_link_url.uri.includes("<nolink>")) ? null :
							 paragraph.field_link_url.uri;
						// set heading level to one lower based on the heading level of the header, if header does not exists set to h2
						const nextHeadingLevel = (contentExists(props.heading))? (props.headingLevel === "h2")? "h3": (props.headingLevel==="h3") ? "h4" : "h5": "h2"
					
						return <GridCell key={paragraph.drupal_id} 
									url={urlLink} 
									image={imageFile} 
									headingLink={paragraph.field_link_url.title}
									headingLinkLevel= {nextHeadingLevel}
									numColumns={props.numColumns} />
						}
						return null;
					})}
				</Grid>
			)
		}
	} else if(props.displayType==='list') {
		//  console.log("list")
		 if(contentExists(props.pageData) && props.pageData.length !== 0){
			//  console.log(props.pageData)
			//  return(
			// 	 <Grid key={props.pageData.drupal_id}>
			// 	 	{props.pageData.map(paragraph =>{ 
			// 			//  console.log(paragraph)

			// 	})}
			// 	 </Grid>
			//  )
			}
		
    } else if(props.displayType==='smallGrid') {
        console.log("smallGrid")
    } else {
        return null;
	}
	
	return null;
}

LinksItems.propTypes = {
    pageData: PropTypes.array,
	displayType: PropTypes.string,
	heading: PropTypes.string,
    headingLevel: PropTypes.string,
    numColumns: PropTypes.number,

}
  
LinksItems.defaultProps = {
    pageData: ``,
	displayType: `list`,
	heading: ``,
    headingLevel: ``,
    numColumns: 4,
  }

export default LinksItems
