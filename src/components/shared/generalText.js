import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import InlineImage from 'components/shared/inlineImage';

const GeneralText = (props) => {    
    let processed = props.processed;
    let textClass = props.textClass;    
    let replaced = InlineImage(processed)
    return <div class="clearfix">
            <div {...(textClass !== `` ? {className:textClass} : {})} >{replaced}</div>  
          </div>  
}

GeneralText.propTypes = {
    processed: PropTypes.string,
    textClass: PropTypes.string,
}

GeneralText.defaultProps = {
    processed: ``,
    textClass: ``,
}

export default GeneralText

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
`