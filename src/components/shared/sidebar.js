import React from 'react';
import PropTypes from 'prop-types';
import { contentExists, fetchMenuMain } from 'utils/ug-utils';
import 'styles/sidebar.css';

function getSubmenu(submenu, currentPage) {
	let submenuItems = [];
	if (contentExists(submenu)) {
		submenu.forEach(submenuItem => {
			if (submenuItem.drupal_id === currentPage) {
				submenuItems.push(<li key={submenuItem.id}>
					<a className="current" href={submenuItem.alias !== "" ? submenuItem.alias : submenuItem.url}>{submenuItem.title}</a>
				</li>);
			} else {
				submenuItems.push(<li key={submenuItem.id}>
					<a href={submenuItem.alias !== "" ? submenuItem.alias : submenuItem.url}>{submenuItem.title}</a>
				</li>);
			}
		})
		return <ul>{submenuItems}</ul>
	}
	return null;
}

function Sidebar (props) {
	
	const currentPage = String(props.nodeID);
	const menuData = require('../../config/sitemaps/' + fetchMenuMain() + '.yml');
	
	if (contentExists(currentPage) && contentExists(menuData)) {
		return (<>
			<nav id="sidebar">
				<h2>Menu</h2>
				<ul className="sidebar-sub-container">
					{menuData.map (menuItem => {
						let submenu = menuItem.children;						
						if (menuItem.drupal_id === currentPage) {
							return (
							<li key={menuItem.id}>
								<a className="current" href={menuItem.alias !== "" ? menuItem.alias : menuItem.url}>{menuItem.title}</a>
								{getSubmenu(submenu, currentPage)}
							</li>
							)
						} else {
							return (
							<li key={menuItem.id}>
								<a href={menuItem.alias !== "" ? menuItem.alias : menuItem.url}>{menuItem.title}</a>
								{getSubmenu(submenu, currentPage)}
							</li>								
							)
						}						
					})}					
				</ul>
			</nav>
		</>)
	}
	return null;
}

Sidebar.propTypes = {
	nodeID: PropTypes.number,
}

Sidebar.defaultProps = {
    nodeID: null,
}

export default Sidebar