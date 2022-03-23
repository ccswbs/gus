import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import { contentExists } from 'utils/ug-utils';

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

const makeBreadcrumbTrail = (menuData, domain, menuName, nodeID, nodeTitle) => {

    let pageMenu = [];
    let midCrumbs = [];
    let homeCrumbURL;
    let topCrumb;
    let topCrumbURL;
    let endCrumb;
    let endCrumbParent;
    const currentPage = `entity:node/` + String(nodeID);
    const pageTitle = nodeTitle;
    
    if (contentExists(currentPage)) {
 
        let allMenuItems = menuData.allMenuLinkContentMenuLinkContent.edges;        
    
        if (contentExists(allMenuItems)) {
            
            allMenuItems.forEach(item => {
                if (item.node.menu_name === menuName) {
                    pageMenu.push(item);
                }
            });
            
            if (contentExists(pageMenu)) {
                
                if (domain !== "api.liveugconthub.uoguelph.dev") {
                    homeCrumbURL = pageMenu[0].node.link.url;
                } else {
                    homeCrumbURL = "https://www.uoguelph.ca";
                    topCrumb = pageMenu[0].node.title;
                    topCrumbURL = pageMenu[0].node.link.url;
                }

                pageMenu.forEach(item => {
                    if (item.node.link.uri === currentPage) {
                        endCrumb = item.node.title;
                        endCrumbParent = stripParentID(item.node.drupal_parent_menu_item);
                    }
                });
                
                midCrumbs = findCrumbs(pageMenu, endCrumbParent);
            }            
        }
        
        return (<>
            <div className="breadcrumbs loaded">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="site-breadcrumbs">          
                            <ol className="breadcrumb breadcrumb-right-tag">                                
                                <li key={homeCrumbURL + `home`} className="breadcrumb-item">                                    
                                    <a href={contentExists(homeCrumbURL) ? homeCrumbURL : "https://www.uoguelph.ca"}>
                                        <i aria-hidden="true" className="fa fa-home"></i><span className="visually-hidden">Home</span>
                                    </a>
                                </li>
                                {contentExists(topCrumbURL) && topCrumb !== pageTitle && <li key={topCrumbURL} className="breadcrumb-item"><Link to={topCrumbURL}>{topCrumb}</Link></li>}
                                {contentExists(midCrumbs) ? 
                                    midCrumbs.map(midCrumb => {
                                    return <><li key={midCrumb.node.link.url + `mid`} className="breadcrumb-item">
                                            <Link to={midCrumb.node.link.url}>{midCrumb.node.title}</Link>
                                    </li></>})
                                : null}
                                <li key={endCrumb + `end`} className="breadcrumb-item">{contentExists(endCrumb) ? endCrumb : pageTitle}</li>                           
                            </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)        
    }
    return null;
}

const Breadcrumbs = (props) => (
   <StaticQuery
      query={
        graphql`
        query BreadcrumbMenuQuery {
          allMenuLinkContentMenuLinkContent(sort: {order: ASC, fields: weight}, filter: {enabled: {eq: true}}) {
            edges {
              node {
                drupal_id
                drupal_parent_menu_item
                menu_name                
                link {
                  uri
                  url
                }
                title              
              }
            }
          }
        }
      `
      }
      render={data => makeBreadcrumbTrail(data, props.domain, props.menuName, props.nodeID, props.nodeTitle)}
   />
)

Breadcrumbs.propTypes = {
    domain: PropTypes.string,
    menuName: PropTypes.string,
    nodeID: PropTypes.number,
    nodeTitle: PropTypes.string,
}

Breadcrumbs.defaultProps = {
    domain: `api.liveugconthub.uoguelph.dev`,
    menuName: `main`,
    nodeID: null,
    nodeTitle: ``,
}

export default Breadcrumbs