import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import MediaText from 'components/shared/mediaText';


const BlockWidget = (props) => {    
    let processed = props.blockData.relationships.field_custom_block?.body.processed;
    let widgets = props.blockData.relationships?.field_widget_block;
    
    if (widgets) {
        return <MediaText key={props.blockData.drupal_id} widgetData={widgets} region="Secondary" />;
    }
    
    return <div data-title="Custom Block content" dangerouslySetInnerHTML={{__html: processed}}></div>  
}

BlockWidget.propTypes = {
    blockData: PropTypes.string,
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
        info
        body { 
          processed
        }
      }
      field_widget_block {
        __typename
        ... on paragraph__media_text {
            ...MediaTextParagraphFragment
        }
      }
      field_section_column {
        name
      }
    }
  }
`