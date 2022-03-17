import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import LinksItems from 'components/shared/linksItems';
import CtaPara from 'components/shared/ctaPara'
import MediaText from 'components/shared/mediaText';
import StatsWidget from 'components/shared/statsWidget';
import LeadPara from 'components/shared/leadPara';
import SectionButtons from 'components/shared/sectionButtons';
import { contentExists } from 'utils/ug-utils'
import 'styles/widgets.css';
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

    if (contentExists(props.pageData) && props.pageData.length !== 0) {
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
                const ctaClassName = contentExists(widgetData.relationships.field_section_column)? "flex-even section-"+widgetData.relationships.field_section_column.name: '';
                return( <div className={ctaClassName}>
                        <CtaPara pageData={widgetData} />
                        </div>);
            }
            else if (widgetData.__typename==="paragraph__media_text") {
                let divColClass;
                let mediaColClass;
                const mediaSectionCol = contentExists(widgetData.relationships.field_section_column) ? widgetData.relationships.field_section_column.name : '';
                if (mediaSectionCol === "left" || mediaSectionCol === "right") {
                    divColClass = "col-md-6 mt-5";
                    mediaColClass = "col-md-6";
                } else {
                    divColClass = "mt-5";
                    mediaColClass = "col-md-6";
                }
                return <div className={divColClass}><div className="row"><MediaText colClass={mediaColClass} widgetData={widgetData} /></div></div>;			
            }
            else if (widgetData.__typename==="paragraph__stats_widget") {
                const statsClassName = contentExists(widgetData.relationships.field_section_column)? "section-"+widgetData.relationships.field_section_column.name: '';
                return (
                        <div className = {statsClassName} >
                            <StatsWidget statsWidgetData={widgetData} />
                        </div>
                );                
            }
            else if (widgetData.__typename==="paragraph__lead_paragraph") {
                const leadClassName = contentExists(widgetData.relationships.field_section_column)? "section-"+widgetData.relationships.field_section_column.name: '';
                return (
                        <div className = {leadClassName} >
                            <LeadPara pageData={widgetData} />
                        </div>
                );
            }
            else if (widgetData.__typename==="paragraph__general_text" && contentExists(widgetData.field_general_text.processed)) {
                const textClassName = contentExists(widgetData.relationships.field_section_column)? "section-"+widgetData.relationships.field_section_column.name: '';
                return <div className={textClassName } dangerouslySetInnerHTML={{__html: widgetData.field_general_text.processed }}/>; 
            }
            else if (widgetData.__typename==="paragraph__section_buttons") {
                const sbtnClassName = contentExists(widgetData.relationships.field_section_column)? "section-"+widgetData.relationships.field_section_column.name: '';
                return(
                    <div className={sbtnClassName}>
                        <SectionButtons pageData={widgetData} />
                    </div>
                );
            }
            else if (widgetData.__typename==="paragraph__new_widget") {
                return(<p>This is Paragraph_new_widget</p>);
           }
           return null;
        }))
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

export const query = graphql`

    fragment SectionParagraphFragment on paragraph__section {
        drupal_id
        field_section_title
        field_section_classes
        relationships {
            field_section_content {
                __typename
                ... on paragraph__call_to_action {
                    ...CallToActionParagraphFragment
                }
                ... on paragraph__general_text {
                    ...GeneralTextParagraphFragment
                }
                ... on paragraph__links_widget {
                    ...LinksWidgetParagraphFragment
                }
                ... on paragraph__media_text {
                    ...MediaTextParagraphFragment
                }
                ... on paragraph__stats_widget {
                    ...StatsWidgetParagraphFragment
                }
                ... on paragraph__lead_paragraph {
                    ...LeadParagraphFragment
                }
                ... on paragraph__section_buttons {
                    ...SectionButtonsParagraphFragment
                }
            }
        }
    }
`