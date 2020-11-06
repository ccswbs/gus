import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { contentIsNullOrEmpty} from '../utils/ug-utils';
import '../styles/stats.css';

function GridItem (props) {
    console.log("griditem-function")
    console.log(props.gridItemsData)
    console.log(props.gridItemsData.pageData.length)
    console.log(props.gridItemsData.pageData.[0].drupal_id)
    console.log("griditem-function-relationships")
    console.log(props.gridItemsData.pageData.[0].relationships)
    console.log("griditem-function-relationships-field_grid_image")
    console.log(props.gridItemsData.pageData.[0].relationships.field_grid_image.relationships.field_media_image.localFile)
    console.log(props.gridItemsData.pageData.[0].relationships.field_grid_page)


	// return (
	// 	<React.Fragment>
	// 		{!contentIsNullOrEmpty(props.gridItemsData) && props.gridItemsData.pageData.length !== 0 && <>
	// 			{props.gridItemsData.pageData.map (gridItem => {	
	// 				let gridImage = gridItem.relationships.field_grid_items.relationships.field_media_image.localFile;
	// 				return <React.Fragment key={gridItem.drupal_id}>
	// 				<div className="uog-card">
	// 					<dt>
	// 						{gridImage !== null && <><SVG src={gridImage.publicURL} /></>} 
	// 					</dt>
	// 				</div>
	// 				</React.Fragment>
	// 			})}
	// 		</>}
	// 	</React.Fragment>
	// )
}

GridItem.propTypes = {
	gridItemsData: PropTypes.array,
}
GridItem.defaultProps = {
	gridItemsData: null,
}
export default GridItem