import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import LinksItems from './linksItems';
import CtaPara from './ctaPara';
import LeadPara from './leadPara';
import MediaText from '../components/mediaText';
import SectionWidgets from './sectionWidgets';
import StatsWidget from '../components/statsWidget';
import PageTabs from './pageTabs';
import { contentExists } from '../utils/ug-utils';

// 
// add to the if statement each widget, widgets will call each function in the order that it appears in the Drupal Backend. 
// props.pageData - an array that contains all widgets (paragraphs) in field_widget 
// if contenet exists - step through each element in props.pageData 
// widgetData - contains an array for the current element in the props.pageData array 
// if widgetData.__typename === "paragraph__{name of widget}" pass that current data to the correct widget component
// will return all the widgets in the order they were entered. 
//

function Widgets (props) {
if (contentExists(props.pageData) && props.pageData.length !== 0) {
    return (props.pageData.map((widgetData,i) => {
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
        
            return <LinksItems  key={widgetData.drupal_id}
                                pageData={widgetData.relationships.field_link_items} 
                                displayType={linksDisplayType} 
                                heading={widgetData.field_link_items_title} 
                                headingLevel={headingLevel} 
                                description={widgetData.field_link_items_description}
                                numColumns={numColumns}/>
  
        }
        else if (widgetData.__typename==="paragraph__call_to_action") {
            return( <CtaPara pageData={widgetData} />);
		} 
        else if (widgetData.__typename==="paragraph__lead_paragraph") {
            return( <LeadPara pageData={widgetData} />);
		} 
        else if (widgetData.__typename==="paragraph__section") {
            const sectionTitle = (contentExists(widgetData.field_section_title) ? widgetData.field_section_title : ``);
            return (<>
				{contentExists(sectionTitle) === true && <h2>{sectionTitle}</h2>}
				<div key={widgetData.drupal_id} className={widgetData.field_section_classes}>                    
                    <SectionWidgets pageData={widgetData.relationships.field_section_content}/>
                </div>
			</>);
        }
		else if (widgetData.__typename==="paragraph__media_text") {
		   return <div className="row mt-5"><MediaText headingClass="mt-md-0" widgetData={widgetData} /></div>
		}
        else if (widgetData.__typename==="paragraph__general_text" && contentExists(widgetData.field_general_text.processed)) {
            return <div dangerouslySetInnerHTML={{__html: widgetData.field_general_text.processed }}/>; 
        }
		else if (widgetData.__typename==="paragraph__stats_widget") {
			return <StatsWidget statsWidgetData={widgetData} />			
		}
		else if (widgetData.__typename==="paragraph__section_tabs") {
            		return( <PageTabs pageData={widgetData} />);
		}
        else if (widgetData.__typename==="paragraph__accordion_section") {
            return(
                widgetData.relationships.field_accordion_block_elements.map((accordionData,j) => {
                    return( <>
                        <div className="panel-group panel-group-lists collapse in show" id={"accordionWidget"+widgetData.drupal_id}>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent={"#accordionWidget"+widgetData.drupal_id} href={"#collapse"+j+widgetData.drupal_id} className="collapsed" dangerouslySetInnerHTML={{__html: accordionData.field_accordion_block_title.processed}}></a>
                                    </h4>
                                </div>
                                <div id={"collapse"+j+widgetData.drupal_id} className="panel-collapse collapse in">
                                    <div className="panel-body" dangerouslySetInnerHTML={{__html: accordionData.field_accordion_block_text.processed}}/>
                                </div>
                            </div>
                        </div>
                    </>);
                } )
            );  
}
		return null;
    }
    ))}
    return null;
}
Widgets.propTypes = {
    pageData: PropTypes.array,
   
}
Widgets.defaultProps = {
    pageData: ``,

  }

export default Widgets

export const query = graphql`
  fragment GeneralTextParagraphFragment on paragraph__general_text {
    drupal_id
    field_general_text {
      processed
    }
    relationships {
      field_section_column {
        name
      }
    }
  }

  fragment AccordionSectionParagraphFragment on paragraph__accordion_section {
    drupal_id
    relationships {
      field_accordion_block_elements {
        drupal_id
        field_accordion_block_title {
          processed
        }
        field_accordion_block_text {
          processed
        }
      }
    }
  }

`