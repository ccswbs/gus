/***
 * This component has been customized and adapted from the original Gatsby plugin:
 * https://github.com/xaviemirmon/gatsby-plugin-drupal-menus
 ***/
import React from "react"
import PropTypes from "prop-types"
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
      if (
        arrElem.drupal_parent_menu_item != null &&
        arrElem.drupal_parent_menu_item.includes(arrElem.bundle)
      ) {
        let stripped_drupal_id = arrElem.drupal_parent_menu_item.replace(
          arrElem.bundle + ":",
          ""
        )
        mappedArr[arrElem.drupal_id].drupal_parent_menu_item =
          stripped_drupal_id
      }
      mappedArr[arrElem.drupal_id]["children"] = []
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
          parentElem["children"].push(mappedElem)
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
  let menuTree = createMenuHierarchy(menuLinks.allMenuLinkContentMenuLinkContent.edges, menuName);
  let pageHome = menuTree.shift();

  const menuItems = menuTree.map((item) => {
    let submenu = item.children;
    return (
      <React.Fragment key={item.drupal_id + `menu`}>
        {submenu !== null && submenu.length > 0 ? (
          <ul data-title={item.title} key={item.drupal_id}>
            {item.link.url !== "" && (
              <li key={item.drupal_id + `dup`}>
                <a href={item.link.url}>{item.title}</a>
              </li>
            )}
            {item?.children.map((child) => (
              <li key={child.drupal_id}>
                <a href={child.link.url}>{child.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <a key={item.drupal_id} href={item.link.url}>
            {item.title}
          </a>
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      {pageHome && pageHome.title != null ? (
        <uofg-header page-title={pageHome.title} page-url={pageHome.link.url}>
          {menuItems}
        </uofg-header>
      ) : (
        <uofg-header></uofg-header>
      )}
    </>
  );
};

const HeaderMenu = ({ menuName }) => {
  const data = useMenuData();
  return generateMenu(data, menuName)
}

HeaderMenu.propTypes = {
  menuName: PropTypes.string,
}

HeaderMenu.defaultProps = {
  menuName: `main`,
}

export default HeaderMenu
