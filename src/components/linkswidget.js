import PropTypes from 'prop-types';
import React from 'react';
import LinksItems from './linksItems';

import { contentExists } from '../utils/ug-utils';

function LinksWidget (props) {

// if there is at least one links widget - step through each one to display links 
    // if there are link items on the page display them
    // if the first element has an image - display as a grid otherwise display as a list with no images
if(contentExists(props.pageData)&& props.pageData.length !==0){
   return( props.pageData.map(linksWidgetData => {
     const linksDisplayType = (contentExists(linksWidgetData.relationships.field_link_items[0].relationships.field_link_image))? 'grid': 'list';
     const headingLevel = (linksDisplayType === 'grid')? 'h2': '';
     const numColumns = (linksDisplayType === 'grid')? 4: null;
        return <LinksItems  key={linksWidgetData.drupal_id}
                            pageData={linksWidgetData.relationships.field_link_items} 
                            displayType={linksDisplayType} 
                            heading={linksWidgetData.field_link_items_title} 
                            headingLevel={headingLevel} 
                            description={linksWidgetData.field_link_items_description}
                            numColumns={numColumns}/>
        } )
   )     
}
return null;
   
}
LinksWidget.propTypes = {
    pageData: PropTypes.array,
   
}
LinksWidget.defaultProps = {
    pageData: ``,

  }

export default LinksWidget