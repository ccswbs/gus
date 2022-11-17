import React from 'react';
import { graphql } from 'gatsby';
import Testimonials from 'components/shared/testimonial';

const myUnionBy = (arrays, iteratee) => {
  const map = {};

  arrays.forEach((array) => {
    array.forEach((object) => {
      map[object[iteratee]] = object;
    });
  });

  return Object.values(map);
};

const TestimonialSlider = (props) => {
  let testimonialTitle = props.testimonialData?.field_title;

  // handle testimonials added individually
  let testimonialNodes = props.testimonialData.relationships?.field_testimonial_nodes;

  // handle testimonials added by tag
  let testimonialTags = props.testimonialData.relationships?.field_tags;
  let testimonialTaggedNodes = testimonialTags.flatMap((tag) => {
    return tag.relationships.node__testimonial;
  })

  // remove duplicate values from array of objects using drupal_id + limit to 10 testimonials
  let testimonialData = myUnionBy([testimonialNodes, testimonialTaggedNodes], 'drupal_id').slice(0,10);

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
      __typename
      ... on TaxonomyInterface {
        name
      }
      ... on taxonomy_term__tags {
        relationships {
          node__testimonial {
            ...TestimonialNodeFragment
          }
        }
      }
      ... on taxonomy_term__testimonial_type {
        relationships {
          node__testimonial {
            ...TestimonialNodeFragment
          }
        }
      }
      ... on taxonomy_term__specializations {
        relationships {
          node__testimonial {
            ...TestimonialNodeFragment
          }
        }
      }
      ... on taxonomy_term__programs {
        relationships {
          node__testimonial {
            ...TestimonialNodeFragment
          }
        }
      }
      ... on taxonomy_term__degrees {
        relationships {
          node__testimonial {
            ...TestimonialNodeFragment
          }
        }
      }
      ... on taxonomy_term__units {
        relationships {
          node__testimonial {
            ...TestimonialNodeFragment
          }
        }
      }
    }
    field_testimonial_nodes {
      ...TestimonialNodeFragment
    }
  }
}
`
