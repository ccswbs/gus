import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { ParseText } from "utils/ug-utils";

const GeneralText = (props) => {
  return (
    <React.Fragment key={`parsed-${props.data.drupal_id}`}>
      <ParseText textContent={props.data.field_general_text.processed} />
    </React.Fragment>
  );
};

GeneralText.propTypes = {
  data: PropTypes.object
};

GeneralText.defaultProps = {
  data: null,
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
