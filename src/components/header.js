import React from 'react';

const Header = () => (
    <>
        <div id="header-breakpoint"></div>
        <uofg-header  class="unloaded">
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
    </>
)

export default Header
