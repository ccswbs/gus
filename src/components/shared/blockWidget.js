import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Accordion from 'components/shared/accordion';
import GeneralText from 'components/shared/generalText';
import MediaText from 'components/shared/mediaText';
import PageTabs from 'components/shared/pageTabs';
import SectionButtons from 'components/shared/sectionButtons';

const BlockWidget = (props) => {
    
    let basicBlockContent;
    let widgetBlockContent = [];
    
    if (props.blockData?.relationships?.field_custom_block?.__typename === "block_content__basic") {
        basicBlockContent = props.blockData?.relationships?.field_custom_block?.body.processed;
    }
    if (props.blockData?.relationships?.field_custom_block?.__typename === "block_content__widget_block") {
        widgetBlockContent = props.blockData.relationships.field_custom_block?.relationships?.field_widget_block_content;
        return (widgetBlockContent.map(widget => {
            switch(widget.__typename) {
                case "paragraph__accordion_section":
                    return <Accordion key={widget.drupal_id} pageData={widget} />;
                case "paragraph__general_text":
                    return <GeneralText key={widget.drupal_id} processed={widget.field_general_text.processed} />;
                case "paragraph__media_text":
                    return <MediaText key={widget.drupal_id} widgetData={widget} />;
                case "paragraph__section_tabs":
                    return <PageTabs key={widget.drupal_id} pageData={widget} />;
                case "paragraph__section_buttons":
                    return <SectionButtons key={widget.drupal_id} pageData={widget} />;
                default:
                    return <></>;
            }
        }))
    }
    return <div dangerouslySetInnerHTML={{__html: basicBlockContent}}></div>
}

BlockWidget.propTypes = {
    blockData: PropTypes.object,
}

BlockWidget.defaultProps = {
    blockData: ``,
}

export default BlockWidget

export const query = graphql`
  fragment BlockWidgetParagraphFragment on paragraph__block_widget {
    drupal_id
    relationships {      
      field_custom_block {
        __typename
        ...on block_content__basic {
          info
          body { 
            processed
          }
        }
        __typename
        ... on block_content__widget_block {
          relationships {
            field_widget_block_content {            
              __typename
              ... on paragraph__accordion_section {
                ...AccordionSectionParagraphFragment
              }
              ... on paragraph__general_text {
                ...GeneralTextParagraphFragment
              }
              ... on paragraph__media_text {
                ...MediaTextParagraphFragment
              }
              ... on paragraph__section_buttons {
                ...SectionButtonsParagraphFragment
              }
              ... on paragraph__section_tabs {
                ...SectionTabsParagraphFragment
              }
            }
          }
        }
      }
      field_section_column {
        name
      }
    }
  }
`