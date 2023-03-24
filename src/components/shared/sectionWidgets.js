import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import Accordion from 'components/shared/accordion';
import BlockWidget from 'components/shared/blockWidget';
import GeneralText from 'components/shared/generalText';
import ImageOverlay from 'components/shared/imageOverlay';
import LeadPara from 'components/shared/leadPara';
import LinksItems from 'components/shared/linksItems';
import MediaText from 'components/shared/mediaText';
import PageTabs from 'components/shared/pageTabs';
import SectionButtons from 'components/shared/sectionButtons';
import StatisticWidget from 'components/shared/statisticWidget';
import StatsWidget from 'components/shared/statsWidget';
import YamlWidget from 'components/shared/yamlWidget';
import { ConditionalWrapper } from 'utils/ug-utils';

// For the left column
function renderPrimary(widget) {
    switch (widget?.__typename) {
        case "paragraph__accordion_section":
            return <Accordion key={widget.drupal_id} pageData={widget} />;
        case "paragraph__block_widget":
            return <BlockWidget key={widget.drupal_id} blockData={widget} />;
        case "paragraph__general_text":
            return <GeneralText key={widget.drupal_id} processed={widget.field_general_text.processed} />;
        case "paragraph__image_overlay":
            return <ImageOverlay key={widget.drupal_id} data={widget} />;
        case "paragraph__lead_paragraph":
            return( <LeadPara key={widget.drupal_id} pageData={widget} />);        
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
            return <MediaText key={widget.drupal_id} widgetData={widget} region="Primary" />;
        case "paragraph__section_tabs":
            return <PageTabs key={widget.drupal_id} pageData={widget} />;
        case "paragraph__statistic_widget":
            return <StatisticWidget key={widget.drupal_id} statisticData={widget} />;
        case "paragraph__stats_widget":
            return <StatsWidget key={widget.drupal_id} statsWidgetData={widget} />;
        case "paragraph__section_buttons":
            return <SectionButtons key={widget.drupal_id} pageData={widget} />;
        case "paragraph__yaml_widget":
            return <YamlWidget key={widget.drupal_id} blockData={widget} />;
        default:
            return <></>;                          
    }
}

//For the right column
//Only render certain widgets if there's enough space, i.e. class of col-md-6
function renderSecondary(widget, sectionClasses) {
    switch (widget?.__typename) {
        case "paragraph__block_widget":
            return <BlockWidget key={widget.drupal_id} blockData={widget} />;
        case "paragraph__general_text":
            return <GeneralText key={widget.drupal_id} processed={widget.field_general_text.processed} />;                        
        case "paragraph__media_text":
            return <MediaText key={widget.drupal_id} widgetData={widget} region="Secondary" />;
        case "paragraph__section_buttons":
            return <SectionButtons key={widget.drupal_id} pageData={widget} />;
        case "paragraph__yaml_widget":
            return <YamlWidget key={widget.drupal_id} blockData={widget} />;
        case "paragraph__section_tabs":
            if (sectionClasses === "col-md-6") {
                return <PageTabs key={widget.drupal_id} pageData={widget} />; 
            } else {
                return <></>; 
            }
        case "paragraph__accordion_section":
            if (sectionClasses === "col-md-6") {
                return <Accordion key={widget.drupal_id} pageData={widget} />; 
            } else {
                return <></>; 
            }  
        default:
            return <></>;                          
    }
}

function SectionWidgets (props) {

    if (props.pageData?.length > 0) {        
        let primary = [];
        let secondary = [];
        let primaryClass;
        let secondaryClass;
        let allWidgets = props.pageData;
        let sectionClasses = props.sectionClasses;
        
        allWidgets.forEach(widgetData => {
            let secCol = widgetData.relationships?.field_section_column?.name;
            if (secCol === "right" || secCol === "Secondary") {
                secondary.push(widgetData);
            } else {
                primary.push(widgetData);
            }
        })

        if (secondary.length > 0) {
            if (sectionClasses === "col-md-6") {
                primaryClass = classNames("col-md-6 mb-5 mb-md-0");
                secondaryClass = classNames("col-md-6");
            } else {
                primaryClass = classNames("col-md-9 mb-5 mb-md-0");
                secondaryClass = classNames("col-md-3");
            }
        } else {
            primaryClass = "row";
        }
        
        return (<>
            <div className={primaryClass} data-title="Primary column">
                <ConditionalWrapper condition={secondary.length > 0} wrapper={children => <div className="row">{children}</div>}>
                {primary && primary.map(widget => {
                    return renderPrimary(widget)
                })}                
                </ConditionalWrapper>
            </div>
            {secondary.length > 0 && 
            <div className={secondaryClass} data-title="Secondary column">
            {secondary.map(widget => {
                return renderSecondary(widget, sectionClasses)
            })}    
            </div>}
        </>)
    }
    return null;
}

SectionWidgets.propTypes = {
    pageData: PropTypes.array,
    sectionClasses: PropTypes.string,
}
SectionWidgets.defaultProps = {
    pageData: ``,
    sectionClasses: ``,
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
        ... on paragraph__accordion_section {
            ...AccordionSectionParagraphFragment
        }
        ... on paragraph__block_widget {
            ...BlockWidgetParagraphFragment
        }
        ... on paragraph__general_text {
            ...GeneralTextParagraphFragment
        }
        ... on paragraph__image_overlay {
            ...ImageOverlayParagraphFragment
        }
        ... on paragraph__links_widget {
            ...LinksWidgetParagraphFragment
        }
        ... on paragraph__media_text {
            ...MediaTextParagraphFragment
        }
        ... on paragraph__statistic_widget {
            ...StatisticWidgetParagraphFragment
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
        ... on paragraph__section_tabs {
            ...SectionTabsParagraphFragment
        }
        ... on paragraph__yaml_widget {
            ...YamlWidgetParagraphFragment
        }
      }
    }
  }
`
