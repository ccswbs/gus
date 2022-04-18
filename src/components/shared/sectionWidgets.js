import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import GeneralText from 'components/shared/generalText';
import LeadPara from 'components/shared/leadPara';
import LinksItems from 'components/shared/linksItems';
import MediaText from 'components/shared/mediaText';
import SectionButtons from 'components/shared/sectionButtons';
import StatsWidget from 'components/shared/statsWidget';
import { ConditionalWrapper } from 'utils/ug-utils';

// For the left column
function renderPrimary(widget) {
    switch (widget?.__typename) {
        case "paragraph__general_text":
            return <GeneralText processed={widget.field_general_text.processed} />;
        case "paragraph__lead_paragraph":
            return( <LeadPara pageData={widget} />);        
        case "paragraph__links_widget":
            const gridFirstHeadingLevel = "h2";
            const listFirstHeadingLevel = "h2";
            const linksDisplayType = widget.relationships.field_link_items[0].relationships.field_link_image ? "grid" : "list";
            const headingLevel = (linksDisplayType === "grid") ? gridFirstHeadingLevel : listFirstHeadingLevel;
            const numColumns = (linksDisplayType === "grid") ? 4 : null;
            return <LinksItems key={widget.drupal_id}
                    pageData={widget.relationships.field_link_items} 
                    displayType={linksDisplayType} 
                    heading={widget.field_link_items_title} 
                    headingLevel={headingLevel} 
                    description={widget.field_link_items_description}
                    numColumns={numColumns} />
        case "paragraph__media_text":
            return <MediaText widgetData={widget} region="Primary" />;
        case "paragraph__stats_widget":
            return <StatsWidget statsWidgetData={widget} />;
        case "paragraph__section_buttons":
            return <SectionButtons pageData={widget} />;
        default:
            return <></>;                          
    }
}

//For the right column
function renderSecondary(widget) {
    switch (widget?.__typename) {
        case "paragraph__general_text":
            return <GeneralText processed={widget.field_general_text.processed} />;                        
        case "paragraph__media_text":
            return <MediaText widgetData={widget} region="Secondary" />;
        case "paragraph__section_buttons":
            return <div><SectionButtons pageData={widget} /></div>;
        default:
            return <></>;                          
    }
}

function SectionWidgets (props) {

    if (props.pageData?.length > 0) {        
        let primary = [];
        let secondary = [];
        let primaryClass;
        let allWidgets = props.pageData;
        
        allWidgets.forEach(widgetData => {
            let secCol = widgetData.relationships.field_section_column?.name;
            if (secCol === "right" || secCol === "Secondary") {
                secondary.push(widgetData);
            } else {
                primary.push(widgetData);
            }
        })

        if (secondary.length > 0) {
            primaryClass = "col-md-9";
        } else {
            primaryClass = "row row-cols-1 row-cols-md-2";
        }
        
        return (<>
            <div className={primaryClass} title="Primary Area (col-md-9 if right column exists, row if it doesn't)">
                <ConditionalWrapper condition={secondary.length > 0} wrapper={children => <div className="row row-cols-1 row-cols-md-2" title="primary sub-row when right column exists">{children}</div>}>
                {primary && primary.map(widget => {
                    return renderPrimary(widget)
                })}                
                </ConditionalWrapper>
            </div>
            {secondary.length > 0 && 
            <div className="col-md-3" title="Secondary Column (right)">
            {secondary.map(widget => {
                return renderSecondary(widget)
            })}    
            </div>}
        </>)
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