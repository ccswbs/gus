import PropTypes from 'prop-types';
import React from 'react';
import Grid from './grid';
import GridCell from './gridCell';
import ListLinkItems from './listlinkitems';
import { contentExists } from '../utils/ug-utils';

function LinksItems (props) {
console.log(props)
	const aliasData = require('../../config/aliases/aliasfile.yml');

	if(props.displayType==='grid') {
		
		if(contentExists(props.pageData) && props.pageData.length !== 0){
			console.log(props.pageData, "pageData")
			return (
				<Grid key={props.pageData.drupal_id}>
					{props.pageData.map (paragraph  => {
						console.log(props.pageData.drupal_id, "in linksitems.js grid call")
						if(contentExists(paragraph.relationships)){
						const image = (contentExists(paragraph.relationships.field_link_image)) ? paragraph.relationships.field_link_image.relationships.field_media_image : null;
						const imageFile = (contentExists(image) && contentExists(image.localFile.childImageSharp)) ? <img src={image.localFile.childImageSharp.resize.src} alt="" /> : null;
						const urlLink = (paragraph.field_link_url.uri.includes("entity:node/")) ? aliasData[paragraph.field_link_url.uri.replace("entity:node/","")]:
							(paragraph.field_link_url.uri.includes("internal:/")) ? ("/") : (paragraph.field_link_url.uri.includes("<nolink>")) ? null :
                             paragraph.field_link_url.uri
                       
						return <GridCell key={paragraph.drupal_id} 
									url={urlLink} 
									image={imageFile} 
									heading={paragraph.field_link_url.title}
									headingLevel= {props.headingLevel}
									numColumns={props.numColumns} />
						}
						return null;
					})}
				</Grid>
			)
			
		}
	} else if(props.displayType==='list') {
         console.log("list")
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
    headingLevel: PropTypes.string,
    numColumns: PropTypes.number,

}
  
LinksItems.defaultProps = {
    pageData: ``,
    displayType: `list`,
    headingLevel: `h3`,
    numColumns: 4,
  }

export default LinksItems
