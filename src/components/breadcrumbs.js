import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentExists } from '../utils/ug-utils';
import { useMenuData } from '../utils/fetch-menu';
//import '../styles/breadcrumbs.css';

function FetchLink(menuParent, menuParentID) {
	
	const nodeData = useMenuData();
	let menuID = parseInt(menuParentID);
	let menuParentLink;
	
	if (contentExists(nodeData)) {
		let pageData = nodeData.pages.edges;

		if (contentExists(menuParent) && contentExists(menuParentID)) {
			for (let i=0; i<pageData.length; i++) {
				if (pageData[i].node.drupal_internal__nid === menuID) {
					menuParentLink = pageData[i].node.fields.alias.value
				}
			}
			return <><li className="breadcrumb-item"><Link to={menuParentLink}>{menuParent}</Link></li></>
		}
	}
	return null;
}

function Breadcrumbs (props) {

	const data = useMenuData();
	const currentPage = String(props.nodeID);

	if (contentExists(data)) {
		
		let menuData = data.menuItems.edges;
		let menuParent = ``;
		let menuChild = ``;
		let menuParentID;
		
		for (let i=0; i<menuData.length; i++) {
			
			if (contentExists(menuData[i].node.childMenuItems) && menuData[i].node.childMenuItems.route.parameters.node === currentPage) {
				menuParent = menuData[i].node.title
				menuParentID = menuData[i].node.route.parameters.node				
			}
			
			if (menuData[i].node.route.parameters.node === currentPage) {
				menuChild = menuData[i].node.title
			}
			
		}
	
		return (<>
			{contentExists(menuData) && menuData.length !== 0 && <>
			<div className="breadcrumbs loaded">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="site-breadcrumbs">			
							<ol className="breadcrumb breadcrumb-right-tag">
								<li className="breadcrumb-item">
									<Link to="/"><i className='fa fa-home'><span className='sr-only'>Home</span></i></Link>
								</li>
								{FetchLink(menuParent, menuParentID)}
								<li className="breadcrumb-item">{menuChild}</li>
							</ol>
							</div>
						</div>
					</div>
				</div>
			</div>
			</>}
		</>)
	
	}
	return null;

}

Breadcrumbs.propTypes = {
	nodeID: PropTypes.number,
}

Breadcrumbs.defaultProps = {
    nodeID: null,
}

export default Breadcrumbs