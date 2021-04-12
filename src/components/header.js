import React from 'react';
import { contentExists } from '../utils/ug-utils';

/****
 * Sample Usage with Dropdowns:
 * 
        <div id="header-breakpoint"></div>
        <uofg-header class="unloaded">
            <a href="#">Apply</a>
            <uofg-dropdown-menu>
            <button data-for="menu-button">Dropdown Example</button>
                <ul data-for="menu-content">
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
 
const menuData = require('../../config/sitemaps/main.yml');
let pageSpecificMenu;

if (contentExists(menuData)) {
	pageSpecificMenu = menuData.map(item => {			
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
					<><uofg-dropdown-menu key={item.id}>
					<button data-for="menu-button">{item.title}</button>
					<ul data-for="menu-content">
						<li><a href={item.alias !== "" ? item.alias : item.url}>{item.title}</a></li>
						{submenuItems}
					</ul>
					</uofg-dropdown-menu></>
				: <React.Fragment key={item.id}><a href={item.alias !== "" ? item.alias : item.url}>{item.title}</a></React.Fragment>}

			</>)
		})
} else {
	pageSpecificMenu = "";
}

const Header = () => (
    <>
        <div id="header-breakpoint"></div>
        <uofg-header className="unloaded">{pageSpecificMenu}</uofg-header>
    </>
)

export default Header
