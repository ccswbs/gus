import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import 'styles/breadcrumbs.css'
import { useMenuData } from "hooks/drupal/use-menu-data"

/***
* Recursive function to iterate through the menu in search of parents
* Keeps going until it finds the top item with null parent
***/
function findCrumbs(menu, nextCrumb) {

    let crumbArray, result = [];
    let parentID;

    menu.forEach(item => {
        if (item.node.drupal_id === nextCrumb) {
            result.push(item);          
            if (item.node.drupal_parent_menu_item != null) {
                parentID = stripParentID(item.node.drupal_parent_menu_item);
                result = result.concat(findCrumbs(menu, parentID));
            }
        }
    })
    crumbArray = result.reverse();
    return crumbArray;
}
    
function stripParentID(drupalParentID) {
    if (drupalParentID) {
        return drupalParentID.replace("menu_link_content:", '');
    }
}

const makeBreadcrumbTrail = (menuData, domains, menuName, nodeID, nodeTitle) => {

    let pageMenu = [];
    let midCrumbs = [];
    let rootItems = [];
    let homeCrumb = "U of G Homepage";
    let homeCrumbURL = "https://www.uoguelph.ca";
    let topCrumb;
    let topCrumbID;
    let topCrumbURL;
    let endCrumb;
    let endCrumbParent;
    const currentPage = `entity:node/` + String(nodeID);
    const pageTitle = nodeTitle;
    
    if (currentPage) {
 
        let allMenuItems = menuData.allMenuLinkContentMenuLinkContent.edges;        
    
        if (allMenuItems) {
            
            allMenuItems.forEach(item => {
                if (item.node.menu_name === menuName) {
                    pageMenu.push(item);
                }
            });
            
            if (pageMenu) {            
                pageMenu.forEach(item => {
                    if (!item.node.drupal_parent_menu_item) {
                        rootItems.push(item);
                    }
                });
                pageMenu.forEach(item => {
                    if (item.node.link.uri === currentPage) {
                        endCrumb = item.node.title;
                        endCrumbParent = stripParentID(item.node.drupal_parent_menu_item);
                    }
                });                
                midCrumbs = findCrumbs(pageMenu, endCrumbParent);
                
                /***
                * If there's only one domain and it's the default, set Breadcrumb home to UG homepage
                * Otherwise, assume use of sitename.uoguelph.ca and use the top menu item as Breadcrumb home
                ***/
                if (domains && domains.length > 0 && menuName !== "main") {                    
                    if (domains.length === 1 && domains[0].drupal_internal__target_id.includes("liveugconthub")) {
                        topCrumb = rootItems[0]?.node.title;
                        topCrumbID = rootItems[0]?.node.link.uri;
                        topCrumbURL = rootItems[0]?.node.link.url;
                    } else {
                        homeCrumbURL = rootItems[0]?.node.link.url;
                    }                    
                }
            }            
        }
        
        return (<>
                <nav aria-label="breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className='gus-breadcrumbs gus-breadcrumbs--collapse-on-mobile'>
                                    <ol className="gus-breadcrumbs__list">                                
                                        <li key={homeCrumbURL + `home`} className="gus-breadcrumbs__list-item">                                    
                                            <a href={homeCrumbURL}>
                                                <i aria-hidden="true" className="fa-sharp fa-light fa-home gus-breadcrumb__link"></i><span className="visually-hidden">{homeCrumb}</span>
                                            </a>
                                        </li>
                                        {menuName !== "main" && topCrumbURL && topCrumbID !== currentPage && 
                                            <li key={topCrumbURL} className="gus-breadcrumbs__list-item"><Link to={topCrumbURL}>{topCrumb}</Link></li>}
                                        {midCrumbs && midCrumbs.map(midCrumb => {
                                            return <li key={midCrumb.node.link.url + `mid`} className="gus-breadcrumbs__list-item">
                                                        <Link to={midCrumb.node.link.url}>{midCrumb.node.title}</Link>
                                                    </li>
                                        })}
                                        <li key={endCrumb + `end`} className="gus-breadcrumbs__list-item active" aria-current="page">{endCrumb ? endCrumb : pageTitle}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
        </>)        
    }
    return null;
}

const Breadcrumbs = (props) => {
    const data = useMenuData();
    return makeBreadcrumbTrail(data, props.domains, props.menuName, props.nodeID, props.nodeTitle)
  }

Breadcrumbs.propTypes = {
    domains: PropTypes.array,
    menuName: PropTypes.string,
    nodeID: PropTypes.number,
    nodeTitle: PropTypes.string,
}

Breadcrumbs.defaultProps = {
    domains: [],
    menuName: `main`,
    nodeID: null,
    nodeTitle: ``,
}

export default Breadcrumbs
