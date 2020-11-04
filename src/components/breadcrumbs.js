import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentExists } from '../utils/ug-utils';
import { useMenuData } from '../utils/fetch-menu';
//import '../styles/breadcrumbs.css';

function FetchLink(menuParent, menuParentID) {
	
	const getData = useMenuData();
	let pageID = parseInt(menuParentID);
	let pageAlias;
	let landingID = parseInt(menuParentID);
	let landingAlias;
	let menuParentLink;
	
	if (contentExists(getData)) {
		let pageData = getData.pages.edges;
		let landingData = getData.landing.edges;
		
		if (contentExists(menuParent) && contentExists(menuParentID)) {
			
			for (let i=0; i<pageData.length; i++) {
				if (pageData[i].node.drupal_internal__nid === pageID) {
					pageAlias = pageData[i].node.fields.alias.value
				}
			}
			for (let i=0; i<landingData.length; i++) {
				if (landingData[i].node.drupal_internal__nid === landingID) {
					landingAlias = landingData[i].node.fields.alias.value
				}
			}
			
			if (contentExists(pageAlias)) {
				menuParentLink = pageAlias;
			} else if (contentExists(landingAlias)) {
				menuParentLink = landingAlias;
			}
			
		return <><li className="breadcrumb-item">{menuParent} {menuParentLink}</li></>
		}
	}
	return null;
}

function FetchParent(menuData, midCrumbID) {	
	
	let test1;
	let test2;
	
	for (let i=0; i<menuData.length; i++) {
		if (contentExists(midCrumbID) && midCrumbID === menuData[i].node.id) {
			test1 = menuData[i].node.title;
			test2 = menuData[i].node.route.parameters.node;
			
			return FetchLink(test1, test2)
		}
		return null;
	}
}

function Breadcrumbs (props) {

	const data = useMenuData();
	const currentPage = String(props.nodeID);

	if (contentExists(data)) {
		
		let menuData = data.menus.edges;
		let menuParent;
		let menuParentID;
		let menuTop = data.menus.edges[0].node.title;
		let menuTopID = data.menus.edges[0].node.route.parameters;
		let menuChildren = data.menus.edges[0].node.children;
		let endCrumb;
		let endCrumbID;
		//let midCrumb;
		let midCrumbID;

		
		for (let i=0; i<menuData.length; i++) {
			if (currentPage === menuData[i].node.route.parameters.node) {
				endCrumb = menuData[i].node.title
				endCrumbID = menuData[i].node.id
			}			
		}
		for (let i=0; i<menuData.length; i++) {
			if (menuData[i].node.parent != null && menuData[i].node.id === endCrumbID) {
				midCrumbID = menuData[i].node.parent.id
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
									<Link to="/"><i className='fa fa-home'><span className='sr-only'>Home</span></i></Link>
								</li>
								{FetchParent(menuData, midCrumbID)}	
								<li className="breadcrumb-item">{contentExists(endCrumb) ? endCrumb : props.nodeTitle}</li>
								<li className="breadcrumb-item">{midCrumbID}</li>
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