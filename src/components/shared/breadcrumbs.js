import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import { contentExists } from 'utils/ug-utils';

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

const makeBreadcrumbTrail = (menuLinks, menuName, nodeID, nodeTitle) => {

    let menuTree;
    const currentPage = `entity:node/` + String(nodeID);
    const pageTitle = nodeTitle;

    menuTree = createMenuHierarchy(menuLinks.allMenuLinkContentMenuLinkContent.edges, menuName);
    
    if (contentExists(currentPage)) {
        let endCrumb;
        let midCrumb;
        let midCrumbURL;
        let topCrumbURL;       
        
        if (contentExists(menuTree)) {
            for (let i=0; i<menuTree.length; i++) {
                if (menuTree[i].title === "Home") {
                    topCrumbURL = menuTree[i].link.url;
                }
                if (menuTree[i].link.uri === currentPage) {                    
                    endCrumb = menuTree[i].title;
                } else {
                    if (menuTree[i].children !== null) {
                        for (let j=0; j<menuTree[i].children.length; j++) {
                            if (menuTree[i].children[j].link.uri === currentPage) {
                                endCrumb = menuTree[i].children[j].title;
                                midCrumb = menuTree[i].title;
                                midCrumbURL = menuTree[i].link.url;
                            }
                        }
                    }
                }
            }
            //console.log(currentPage, endCrumb, midCrumb, topCrumbURL)
        }
        
        return (<>
            <div className="breadcrumbs loaded">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="site-breadcrumbs">          
                            <ol className="breadcrumb breadcrumb-right-tag">                                
                                <li key={topCrumbURL + `home`} className="breadcrumb-item">                                    
                                    <a href={contentExists(topCrumbURL) ? topCrumbURL : "https://www.uoguelph.ca"}>
                                        <i className="fa fa-home"><span className="sr-only">Home</span></i>
                                    </a>
                                </li>
                                {contentExists(midCrumb) ? <li key={midCrumbURL + `mid`} className="breadcrumb-item"><Link to={midCrumbURL}>{midCrumb}</Link></li> : null}
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
          allMenuLinkContentMenuLinkContent(sort: {order: ASC, fields: weight}) {
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
        }
      `
      }
      render={data => makeBreadcrumbTrail(data, props.menuName, props.nodeID, props.nodeTitle)}
   />
)

Breadcrumbs.propTypes = {
    menuName: PropTypes.string,
    nodeID: PropTypes.number,
    nodeTitle: PropTypes.string,
}

Breadcrumbs.defaultProps = {
    menuName: `main`,
    nodeID: null,
    nodeTitle: ``,
}

export default Breadcrumbs