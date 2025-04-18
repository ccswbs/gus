import React from "react"
import {Link } from 'gatsby'
import PropTypes from "prop-types";
import { useMenuData } from "hooks/drupal/use-menu-data"

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
        mappedArr[mappedElem.drupal_parent_menu_item]['children'].push(mappedElem)
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem)
      }
    }
  }
  return tree
}

const buildLink = link => {
  if (link.link.uri.includes('entity:')) {
    return (<Link to={link.link.url}>{link.title}</Link>)
  } else {
    return ( <a href={link.link.url}>
      {link.title}
    </a>)
  }
}

const buildMenu = menuArray => {
  if(!menuArray)  {
    return
  }
  let menu = []
  for(let item in menuArray) {
    if(menuArray[item].children.length !== 0) {
      menu.push(
      <li key={menuArray[item].drupal_id}>
        {buildLink(menuArray[item])}
        <ul className="submenu">
          {buildMenu(menuArray[item].children)}
        </ul>
      </li>)
    } else {
      menu.push(<li key={menuArray[item].drupal_id}>{buildLink(menuArray[item])}</li>)
    }
  }

  return menu

};

const generateMenu = (menuLinks, menuName) => {
  let menu

  menu = createMenuHierarchy(menuLinks.allMenuLinkContentMenuLinkContent.edges, menuName)
  menu = buildMenu(menu)

  return menu
}

const Menu = ({menuName}) => {
  const data = useMenuData();

  return (
    <nav className={menuName}>
      <ul >
        {generateMenu(data, menuName)}
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  menuName: PropTypes.string,
}

Menu.defaultProps = {
  menuName: `main`,
}

export default Menu