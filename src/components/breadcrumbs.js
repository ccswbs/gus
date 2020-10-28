import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentIsNullOrEmpty } from '../utils/ug-utils';
import { useMenuData } from '../utils/fetch-menu';
//import '../styles/breadcrumbs.css';

function Breadcrumbs (props) {

	const menuData = useMenuData();

	if (!contentIsNullOrEmpty(menuData)) {
	
		return (<>
			{!contentIsNullOrEmpty(menuData) && menuData.length !== 0 && <>
			<div className="breadcrumbs loaded">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="site-breadcrumbs">			
							<ol className="breadcrumb breadcrumb-right-tag">
								{menuData.map (menuItem => {
									return <li className="breadcrumb-item"><Link to={menuItem.node.url}>{menuItem.node.title}</Link></li>
								})}					
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
	activePage: PropTypes.array,
}

Breadcrumbs.defaultProps = {
    activePage: null,
}

export default Breadcrumbs