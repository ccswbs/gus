import React from 'react';
import { graphql } from 'gatsby';
import Testimonials from 'components/shared/testimonial';


const TestimonialSlider = (props) => {
  let testimonialData = props.testimonialData.relationships?.field_testimonial_nodes;
  let testimonialTitle = props.testimonialData?.field_title;

  return testimonialData ? 
    <Testimonials
      testimonialData={testimonialData}
      headingLevel="h3"
      heading={testimonialTitle}
    />
    : null
}

export default TestimonialSlider

export const query = graphql`
fragment TestimonialSliderParagraphFragment on paragraph__testimonial_slider {
  drupal_id
  field_title
  relationships {
    field_tags {
      ... on TaxonomyInterface {
        name
      }
    }
    field_testimonial_nodes {
      ...TestimonialNodeFragment
    }
  }
}
`
