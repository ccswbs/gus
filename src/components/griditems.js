import PropTypes from 'prop-types';
import React from 'react';
import Grid from './grid';
import GridCell from './gridCell';
import { contentExists } from '../utils/ug-utils';

function GridItems (props) {

    if(contentExists(props.pageData) && props.pageData.length !== 0){
		return (
			<Grid key={props.pageData.drupal_id}>
				{props.pageData.map (paragraph  => {
					if(contentExists(paragraph.relationships)){
						let gridItem = paragraph.relationships;
						const image = (contentExists(gridItem.field_grid_image)) ? gridItem.field_grid_image.relationships.field_media_image : null;
						const imageFile = (contentExists(image)) ? <img src={image.localFile.childImageSharp.resize.src} alt="" /> : null;
						return <GridCell key={paragraph.drupal_id} 
									url={gridItem.field_grid_page.fields.alias.value} 
									image={imageFile} 
									heading={gridItem.field_grid_page.title}
									headingLevel="h3" />
						
						
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
}
  
GridItems.defaultProps = {
    pageData: ``,
    displayType: `list`,
  }

export default GridItems
