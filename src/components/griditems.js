import React from 'react';
import PropTypes from 'prop-types';
import { contentExists  } from '../utils/ug-utils';
import '../styles/stats.css';
import GridItem from './griditem'


function GridItems (gridItemsData) {
if (contentExists(gridItemsData)){
	// console.log("gridItemsData")
	// console.log(gridItemsData)
	// console.log(gridItemsData.pageData)
	// console.log(gridItemsData.pageData.length)
	// console.log(contentExists(gridItemsData.pageData))
	// console.log(gridItemsData.pageData.length !== 0)

	return <React.Fragment>
	<div className="full-width-container stats-bg">
		<div className="container page-container">
			<section className="row row-with-vspace site-content">
				<div className="col-md-12 content-area"> 
					<h2 className="sr-only">Grid Place holder</h2>
					<GridItem gridItemsData={gridItemsData}/>
				</div>
			</section>
		</div>
	</div>
	
	</React.Fragment>
}
}

GridItems.propTypes = {
	gridItemsData: PropTypes.array,
}
GridItems.defaultProps = {
	gridItemsData: null,
}
export default GridItems