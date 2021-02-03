import PropTypes from 'prop-types';
import React from 'react';
import Grid from './grid';
import GridCell from './gridCell';
import { contentExists } from '../utils/ug-utils';

function GridItems (props) {
	console.log(props, "griditems");
    if(contentExists(props.pageData) && props.pageData.length !== 0){

		return (
			<Grid key={props.pageData.drupal_id}heading={props.heading} headingLevel={props.headingLevel}>
				{props.pageData.map (paragraph  => {
					if(contentExists(paragraph.relationships)){
						let gridItem = paragraph.relationships;
						const image = (contentExists(gridItem.field_grid_image)) ? gridItem.field_grid_image.relationships.field_media_image : null;
						const imageFile = (contentExists(image) && contentExists(image.localFile)) ? <img src={image.localFile.childImageSharp.resize.src} alt="" /> : null;
						console.log(gridItem.field_grid_page.fields.alias.value, "url")
						console.log(image, "image")
						console.log(imageFile, "imageFile")
						console.log(gridItem.field_grid_page.title,"title")
						return <GridCell key={paragraph.drupal_id} 
									url={gridItem.field_grid_page.fields.alias.value} 
									image={imageFile} 
									heading={gridItem.field_grid_page.title}
									headingLevel={props.headingLevel} 
									numColumns={props.numColumns} />
						
						
					}
					return null;
				})}
			</Grid>
		)
        
    }

    return null;

}

GridItems.propTypes = {
    pageData: PropTypes.array,
	displayType: PropTypes.string,
	heading: PropTypes.string,
    headingLevel: PropTypes.string,
    numColumns: PropTypes.number,
}
  
GridItems.defaultProps = {
    pageData: ``,
	displayType: `grid`,
	heading: ``,
    headingLevel: ``,
    numColumns: 4,
  }

export default GridItems
