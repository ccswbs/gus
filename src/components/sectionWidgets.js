import PropTypes from 'prop-types';
import React from 'react';
import LinksItems from './linksItems';
import CtaPara from './ctaPara'
import MediaText from '../components/mediaText';

import { contentExists } from '../utils/ug-utils';

// 
// add to the if statement each widget in the section widget, 
// widgets will call each function in the order that it appears in the Drupal Backend. 
// props.pageData - an array that contains all widgets (paragraphs) in field_widget 
// if contenet exists - step through each element in props.pageData 
// widgetData - contains an array for the current element in the props.pageData array 
// if widgetData.__typename === "paragraph__{name of widget}" pass that current data to the correct widget component
// will return all the widgets in the order they were entered. 
//

function SectionWidgets (props) {

if (contentExists(props.pageData) && props.pageData.length !== 0){
    return (props.pageData.map(widgetData => {
        if (widgetData.__typename==="paragraph__links_widget") {
            
            const gridFirstHeadingLevel = "h2";
            const listFirstHeadingLevel = "h2";

    // if there is at least one links widget (paragarph__links_widget) - step through each one to display links 
    // if there are link items on the page display them using LinksItems
    // if the first element has an image - display as a grid otherwise display as a list with no images (not srue if this is the best way to do this, but it works)
    // logic could be added to have a selction of layout - 
    // to use - call LinksItems - passing the array of links (pictures optional)
    // - set level heading to start at h2 for grid and list, option to change. 
    
            const linksDisplayType = (contentExists(widgetData.relationships.field_link_items[0].relationships.field_link_image))? 'grid': 'list';
            const headingLevel = (linksDisplayType === 'grid')? gridFirstHeadingLevel: listFirstHeadingLevel;
            const numColumns = (linksDisplayType === 'grid')? 4: null;
        
            return ( <div className="flex-even">
                        <LinksItems key={widgetData.drupal_id}
                                    pageData={widgetData.relationships.field_link_items} 
                                    displayType={linksDisplayType} 
                                    heading={widgetData.field_link_items_title} 
                                    headingLevel={headingLevel} 
                                    description={widgetData.field_link_items_description}
                                    numColumns={numColumns}/>
                    </div>
            )
        }

        else if (widgetData.__typename==="paragraph__call_to_action") {
            return( <div className="flex-even">
                    <CtaPara pageData={widgetData} />
                    </div>);
       } 
       else if (widgetData.__typename==="paragraph__media_text") {
        return <MediaText widgetData={widgetData} />
     }
        else if (widgetData.__typename==="paragraph__general_text" && contentExists(widgetData.field_general_text.processed)) {
        return <div className="container content-area" dangerouslySetInnerHTML={{__html: widgetData.field_general_text.processed }}/>; 
    }
       else if (widgetData.__typename==="paragraph__new_widget") {
        console.log("Paragraph__new_widget")
        return(<p>This is Paragraph_new_widget</p>);
       }
       return null;
    }
        ))
}
    return null;

   
}
SectionWidgets.propTypes = {
    pageData: PropTypes.array,
   
}
SectionWidgets.defaultProps = {
    pageData: ``,

  }

export default SectionWidgets