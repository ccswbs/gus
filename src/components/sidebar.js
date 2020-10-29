import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentIsNullOrEmpty } from '../utils/ug-utils';
import { useMenuData } from '../utils/fetch-menu';
import '../styles/sidebar.css';

function Sidebar (props) {
	
	const menuData = useMenuData();	
	let checkIfContentAvailable = false;
	
	if (!contentIsNullOrEmpty(props.relatedContent) || !contentIsNullOrEmpty(menuData)) {
		checkIfContentAvailable = true;
	}
	
	if (checkIfContentAvailable === true) {
		
		return (<>
			<nav id="sidebar">
			
			{!contentIsNullOrEmpty(menuData) && menuData.length !== 0 && <>
				<h2>Menu: {menuData[0].node.menu_name}</h2>
				<ul className="sidebar-sub-container">
					{menuData.map (menuItem => {
						return <li key={menuItem.node.id}><Link to={menuItem.node.url}>{menuItem.node.title}</Link></li>
					})}					
				</ul>
			</>}
			
			{!contentIsNullOrEmpty(props.relatedContent) && props.relatedContent.length !== 0 && <>
				<h2>Related Content</h2>
				<ul className="sidebar-sub-container">
				{props.relatedContent.map (paragraph  => {
					if (!contentIsNullOrEmpty(paragraph.relationships.field_list_pages)) {
						let relatedContent = paragraph.relationships.field_list_pages;
						return(relatedContent.map(page => {
							return <li key={page.drupal_id}>
									<Link to={page.fields.alias.value}>{page.title}</Link>
								</li>
							})
						)
					}
					return null;
					})
				}
				</ul>
			</>}
			
			</nav>
		</>)
	}
	return null;
}

Sidebar.propTypes = {
	relatedContent: PropTypes.array,
}

Sidebar.defaultProps = {
    relatedContent: null,
}

export default Sidebar