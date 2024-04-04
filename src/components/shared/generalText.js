import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { ParseText } from "utils/ug-utils";

const GeneralText = (props) => {
  return <ParseText textContent={props.processed} />;
};

GeneralText.propTypes = {
  processed: PropTypes.string,
  textClass: PropTypes.string,
};

GeneralText.defaultProps = {
  processed: ``,
  textClass: ``,
};

export default GeneralText;

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
`;
