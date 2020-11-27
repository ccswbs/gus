import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentExists } from '../utils/ug-utils';

function Breadcrumbs (props) {

	const currentPage = String(props.nodeID);
	const pageTitle = props.nodeTitle;
	
	const menuData = require('../../config/sitemaps/main.yml');
	
	if (contentExists(currentPage)) {

		let endCrumb;
		let midCrumb;
		let midCrumbURL;
		let topCrumbURL;
		
		if (contentExists(menuData)) {
			for (let i=0; i<menuData.length; i++) {
				if (menuData[i].title === "Home") {
					topCrumbURL = menuData[i].alias;
				}
				if (menuData[i].drupal_id === currentPage) {
					endCrumb = menuData[i].title;
				} else {
					if (menuData[i].children !== null) {
						for (let j=0; j<menuData[i].children.length; j++) {
							if (menuData[i].children[j].drupal_id === currentPage) {
								endCrumb = menuData[i].children[j].title;
								midCrumb = menuData[i].title;
								midCrumbURL = menuData[i].alias;
							}
						}
					}
				}
			}
		}
		
		return (<>
			<div className="breadcrumbs loaded">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="site-breadcrumbs">			
							<ol className="breadcrumb breadcrumb-right-tag">								
								<li className="breadcrumb-item">									
									<a href={contentExists(topCrumbURL) ? topCrumbURL : "https://www.uoguelph.ca"}>
										<i className='fa fa-home'><span className='sr-only'>Home</span></i>
									</a>
								</li>
								{contentExists(midCrumb) ? <li className="breadcrumb-item"><Link to={midCrumbURL}>{midCrumb}</Link></li> : null}
								<li className="breadcrumb-item">{contentExists(endCrumb) ? endCrumb : pageTitle}</li>							
							</ol>							
							</div>
						</div>
					</div>
				</div>
			</div>			
		</>)		
	}
	return null;
}

Breadcrumbs.propTypes = {
	nodeID: PropTypes.number,
}

Breadcrumbs.defaultProps = {
    nodeID: null,
	nodeTitle: ``,
}

export default Breadcrumbs