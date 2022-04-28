import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';


const BlockWidget = (props) => {    
    let processed = props.blockData.relationships.field_custom_block?.body.processed;    
    return <div dangerouslySetInnerHTML={{__html: processed}}></div>  
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
      field_section_column {
        name
      }
    }
  }
`