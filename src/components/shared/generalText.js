import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const GeneralText = ({textClass, processed}) => (
    <div className={textClass} dangerouslySetInnerHTML={{__html: processed}}></div>
)

GeneralText.propTypes = {
    textClass: PropTypes.string,
}

GeneralText.defaultProps = {
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