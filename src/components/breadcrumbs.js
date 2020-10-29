import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentIsNullOrEmpty } from '../utils/ug-utils';
import { useMenuData } from '../utils/fetch-menu';
//import '../styles/breadcrumbs.css';

function Breadcrumbs (props) {

	const menuData = useMenuData();
	const currentPage = String(props.activePage);

	if (!contentIsNullOrEmpty(menuData)) {
	
		return (<>
			{!contentIsNullOrEmpty(menuData) && menuData.length !== 0 && <>
			<div className="breadcrumbs loaded">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="site-breadcrumbs">			
							<ol className="breadcrumb breadcrumb-right-tag">
								<li className="breadcrumb-item">
									<Link to="/"><i className='fa fa-home'><span className='sr-only'>Home</span></i></Link>
								</li>
								{menuData.map (menuItem => {
									let menuNode = (!contentIsNullOrEmpty(menuItem.node.route.parameters.node) ? menuItem.node.route.parameters.node : ``);
									let menuChild = (!contentIsNullOrEmpty(menuItem.node.childMenuItems) ? menuItem.node.childMenuItems.route.parameters.node : ``);
									return (<React.Fragment key={menuItem.node.id}>
									{!contentIsNullOrEmpty(menuItem.node.childMenuItems) && menuChild === currentPage ? 
										<li className="breadcrumb-item"><Link to={menuItem.node.url}>{menuItem.node.title}</Link></li> 
									: ``}
									{menuNode === currentPage ? <li className="breadcrumb-item">{menuItem.node.title}</li> : ``}
									</React.Fragment>)
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
	activePage: PropTypes.number,
}

Breadcrumbs.defaultProps = {
    activePage: null,
}

export default Breadcrumbs