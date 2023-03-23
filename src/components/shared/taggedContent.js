import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const TaggedContent = (props) => {    
    let contentType = props.contentType;
    let tag = props.tag;
    
    return <><p>The content type is {contentType} and the tag is {tag}</p></>
}

TaggedContent.propTypes = {
    contentType: PropTypes.string,
    tag: PropTypes.string,
}

TaggedContent.defaultProps = {
    contentType: ``,
    tag: ``,
}

export default TaggedContent

export const query = graphql`
  fragment TaggedContentParagraphFragment on paragraph__tagged_content {
    drupal_id
    relationships {
      field_content_type {
        name
      }
	  field_tags {
	    drupal_id
		name
	  }
    }
  }
`