import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
/* import Accordion from 'components/shared/accordion';
import GeneralText from 'components/shared/generalText';
import MediaText from 'components/shared/mediaText';
import PageTabs from 'components/shared/pageTabs';
import SectionButtons from 'components/shared/sectionButtons'; */
import Widget from 'components/shared/widget';

/* function renderWidgetBlocks(thing) {
    switch (thing?.__typename) {
        case "paragraph__accordion_section":
            console.log("accordion yes");
            return <Accordion pageData={thing} />;
        case "paragraph__general_text":
            return "text yes";
            //return <GeneralText key={thing.drupal_id} processed={thing.field_general_text.processed} />;
        case "paragraph__media_text":
            return <MediaText key={thing.drupal_id} thingData={thing} region="Primary" />;
        case "paragraph__section_tabs":
            return <PageTabs pageData={thing} />;
        case "paragraph__section_buttons":
            return <SectionButtons key={thing.drupal_id} pageData={thing} />;
        default:
            return <></>;
    }  
} */

const BlockWidget = (props) => {
    
    let basicBlockContent;
    let widgetBlockContent = [];
    
    if (props.blockData.relationships.field_custom_block.__typename === "block_content__basic") {
        basicBlockContent = props.blockData.relationships.field_custom_block?.body.processed;
    } else if (props.blockData.relationships.field_custom_block.__typename === "block_content__widget_block") {
        widgetBlockContent = props.blockData.relationships.field_custom_block?.relationships?.field_widget_block_content;
    }
    
    if (widgetBlockContent) {
        {widgetBlockContent?.map((widget, index) => <Widget widget={widget} key={index} />)}
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
              ...FieldWidgetsFragment
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