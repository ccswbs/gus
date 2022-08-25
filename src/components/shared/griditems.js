import PropTypes from 'prop-types';
import React from 'react';
import Grid from 'components/shared/grid';
import GridCell from 'components/shared/gridCell';

function GridItems (props) {
    if (props.pageData && props.pageData.length !== 0) {
		return (
			<Grid key={props.pageData.drupal_id} heading={props.heading} headingLevel={props.headingLevel}>
				{props.pageData.map (paragraph  => {
					if (paragraph?.relationships) {
						let gridItem = paragraph.relationships;
						const image = (gridItem?.field_grid_image ? gridItem.field_grid_image.relationships.field_media_image : null);
						const imageFile = (image && image.gatsbyImage) ? <img src={image.gatsbyImage} alt="" /> : null;

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
