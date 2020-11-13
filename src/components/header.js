import React from 'react';

/****
 * Sample Usage with Dropdowns:
 * 
        <div id="header-breakpoint"></div>
        <uofg-header class="unloaded">
            <a href="#">Apply</a>
            <uofg-dropdown-menu>
            <span className="opener">Dropdown Example</span>
                <ul>
                    <li><a href="#">Menu item 1</a></li>
                    <li><a href="#">Menu item 2</a></li>
                    <li><a href="#">Menu item 3</a></li>
                    <li><a href="#">Menu item 4</a></li>
                    <li><a href="#">Menu item 5</a></li>
                    <li><a href="#">Menu item 6</a></li>
                </ul>
            </uofg-dropdown-menu>
        </uofg-header>		
 * 
 * 
 */
 
const config = require('../../gatsby-config');
const menuName = config.siteMetadata.menus[0]; 
const menuData = require('../../config/sitemaps/' + menuName + '.yml');
 
const pageSpecificMenu = menuData.map(item => {
	
	let submenu = item.children;
	let submenuItems = [];
	
	if (submenu !== null && submenu.length > 0) {
		for (let i=0; i<submenu.length; i++) {
			submenuItems.push(<li key={submenu[i].id}>
				<a href={submenu[i].alias !== "" ? submenu[i].alias : submenu[i].url}>{submenu[i].title}</a>
				</li>
			);
		}
	}

	return (<>		
		{submenu !== null && submenu.length > 0 ?  
			<><uofg-dropdown-menu>
			<span className="opener">{item.title}</span>
			<ul>
				<li key={item.id}><a href={item.alias !== "" ? item.alias : item.url}>{item.title}</a></li>
				{submenuItems}
			</ul>
			</uofg-dropdown-menu></>
		: <React.Fragment key={item.id}><a href={item.alias !== "" ? item.alias : item.url}>{item.title}</a></React.Fragment>}

	</>)
})

const Header = () => (
    <>
        <div id="header-breakpoint"></div>
        <uofg-header className="unloaded">{pageSpecificMenu}</uofg-header>
    </>
)

export default Header
