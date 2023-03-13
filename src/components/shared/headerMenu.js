/***
 * This component has been customized and adapted from the original Gatsby plugin:
 * https://github.com/xaviemirmon/gatsby-plugin-drupal-menus
 ***/
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types";

const createMenuHierarchy = (menuData, menuName) => {
  let tree = [],
      mappedArr = {},
      arrElem,
      mappedElem

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = menuData.length; i < len; i++) {
    arrElem = menuData[i].node
    if (arrElem.menu_name === menuName && arrElem.enabled === true) {
      mappedArr[arrElem.drupal_id] = arrElem
      if (arrElem.drupal_parent_menu_item != null && arrElem.drupal_parent_menu_item.includes(arrElem.bundle)) {
        let stripped_drupal_id = arrElem.drupal_parent_menu_item.replace(arrElem.bundle + ':', '')
        mappedArr[arrElem.drupal_id].drupal_parent_menu_item = stripped_drupal_id
      }
      mappedArr[arrElem.drupal_id]['children'] = []
    }
  }

  for (let id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id]
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.drupal_parent_menu_item) {
        let parentElem = mappedArr[mappedElem.drupal_parent_menu_item]
        // Check if the parent element is enabled before adding the current element as its child
        if (parentElem?.enabled === true) {
          parentElem['children'].push(mappedElem)
        }
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem)
      }
    }
  }
  return tree
}

const generateMenu = (menuLinks, menuName) => {
    let pageSpecificMenu;
    let menuTree;

    menuTree = createMenuHierarchy(menuLinks.allMenuLinkContentMenuLinkContent.edges, menuName);    

    pageSpecificMenu = menuTree.map(item => {			
        let submenu = item.children;
        let submenuItems = [];

        if (submenu !== null && submenu.length > 0) {
            for (let i=0; i<submenu.length; i++) {
                submenuItems.push(
                    <li key={submenu[i].drupal_id}>
                        <a href={submenu[i].link.url}>{submenu[i].title}</a>
                    </li>
                );
            }
        }
        return (<React.Fragment key={item.drupal_id + `menu`}>
        {submenu !== null && submenu.length > 0 ?  
            <><uofg-dropdown-menu key={item.drupal_id}>
            <button data-for="menu-button">{item.title}</button>
            <ul data-for="menu-content">
                {item.link.url !== "" && <li key={item.drupal_id + `dup`}><a href={item.link.url}>{item.title}</a></li> }
                {submenuItems}
            </ul>
            </uofg-dropdown-menu></>
        : <React.Fragment key={item.drupal_id}><a href={item.link.url}>{item.title}</a></React.Fragment>}
        </React.Fragment>)
    })

    return pageSpecificMenu
}

const HeaderMenu = ({menuName}) => (
   <StaticQuery
      query={
        graphql`query HeaderMenuQuery {
  allMenuLinkContentMenuLinkContent(sort: {weight: ASC}) {
    edges {
      node {
        enabled
        title
        expanded
        external
        langcode
        weight
        link {
          uri
          url
        }
        drupal_parent_menu_item
        bundle
        drupal_id
        menu_name
      }
    }
  }
}`
      }
      render={data => generateMenu(data, menuName)}
   />
)

HeaderMenu.propTypes = {
  menuName: PropTypes.string,
}

HeaderMenu.defaultProps = {
  menuName: `main`,
}

export default HeaderMenu
