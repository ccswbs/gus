import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const BlockWidget = (props) => {    
    let processed = props.body.processed;
    let textClass = props.textClass;
    console.log(processed);
    return <div {...(textClass !== `` ? {className:textClass} : {})} dangerouslySetInnerHTML={{__html: processed}}></div>    
}

BlockWidget.propTypes = {
    processed: PropTypes.string,
    textClass: PropTypes.string,
}

BlockWidget.defaultProps = {
    processed: ``,
    textClass: ``,
}

export default BlockWidget

export const query = graphql`
  fragment BlockWidgetParagraphFragment on paragraph__block_widget {
    drupal_id
    relationships {
      field_custom_block {
        body { 
          processed
        }
      }
    }
  }
`