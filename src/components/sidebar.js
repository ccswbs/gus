import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentIsNullOrEmpty } from '../utils/ug-utils';
import '../styles/sidebar.css';

function Sidebar (props) {
	
	if (!contentIsNullOrEmpty(props.menuData)) {
		return (
			<nav id="sidebar">
				<div>
					<h2>Related Pages</h2>
					<ul className="sidebar-sub-container">
						{props.menuData.map (paragraph  => {
							if (!contentIsNullOrEmpty(paragraph.relationships.field_list_pages)) {
								let relatedPages = paragraph.relationships.field_list_pages;
								return(relatedPages.map(page => {
									return <li key={page.drupal_id} >
											<Link to={page.fields.alias.value}>{page.title}</Link>
										</li>
									})
								)
							}
							return null;
						})}					
					</ul>
				</div>
			</nav>
		)
	}
	return null;
}

Sidebar.propTypes = {
	menuData: PropTypes.array,
}

Sidebar.defaultProps = {
    menuData: null,
}

export default Sidebar