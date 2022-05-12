import PropTypes from 'prop-types';
import React from 'react';
import LinksItems from 'components/shared/linksItems';

import { contentExists } from 'utils/ug-utils';

function LinksWidget (props) {

// if there is at least one links widget (paragarph__links_widget) - step through each one to display links 
    // if there are link items on the page display them using LinksItems
    // if the first element has an image - display as a grid otherwise display as a list with no images (not srue if this is the best way to do this, but it works)
    // logic could be added to have a selction of layout - 
    // to use - call LinksItems - passing the array of links (pictures optional)
    // - set level heading to start at h2 for grid and list, option to change. 

    const gridFirstHeadingLevel = "h2";
    const listFirstHeadingLevel = "h2";
   

if(contentExists(props.pageData)&& props.pageData.length !==0){
   return( props.pageData.map(linksWidgetData => {
      if (linksWidgetData.__typename==="paragraph__links_widget") {
        const linksDisplayType = (contentExists(linksWidgetData.relationships.field_link_items[0].relationships.field_link_image))? 'grid': 'list';
        const headingLevel = (linksDisplayType === 'grid')? gridFirstHeadingLevel: listFirstHeadingLevel;
        const numColumns = (linksDisplayType === 'grid')? 4: null;
    
        return <LinksItems  key={linksWidgetData.drupal_id}
                            pageData={linksWidgetData.relationships.field_link_items} 
                            displayType={linksDisplayType} 
                            heading={linksWidgetData.field_link_items_title} 
                            headingLevel={headingLevel} 
                            description={linksWidgetData.field_link_items_description}
                            numColumns={numColumns}/>
     } 
     return null;
     
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