import React from "react";
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import widgetModules from "components/shared/widgetModules";
import { ParseText, renderWidget } from "../../utils/ug-utils";

const BlockWidget = (props) => {
    
    let basicBlockContent;
    let widgetBlockContent = [];
    
    if (props.data?.relationships?.field_custom_block?.__typename === "block_content__basic") {
        basicBlockContent = props.data?.relationships?.field_custom_block?.body.processed;
    }
    if (props.data?.relationships?.field_custom_block?.__typename === "block_content__widget_block") {
        widgetBlockContent = props.data.relationships.field_custom_block?.relationships?.field_widget_block_content;
        let region = props.region;

        return (widgetBlockContent.map(widget => {
          let moduleName = widgetModules[widget.__typename].moduleName;
          let fallback = widgetModules[widget.__typename].fallback;
          let shouldLazyLoad = widgetModules[widget.__typename].shouldLazyLoad ?? false;

          if (widgetModules[widget.__typename] && widgetModules[widget.__typename].shouldRenderBlock) {
            return renderWidget(moduleName, shouldLazyLoad, fallback, widget, region);
          }

          return <></>;
        }))
    }
    return <ParseText textContent={basicBlockContent} />
};

BlockWidget.propTypes = {
    data: PropTypes.object,
    region: PropTypes.string,
}

BlockWidget.defaultProps = {
    data: ``,
    region: ``,
}

export default BlockWidget;

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