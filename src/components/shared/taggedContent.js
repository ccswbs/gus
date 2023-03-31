import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Careers from 'src/components/shared/careers.js';
import Courses from 'components/shared/courses';
import Employers from 'src/components/shared/employers.js';

const TaggedContent = (props) => {    
    const data = useStaticQuery(graphql`
      query {
          allNodeCareer(sort: {title: ASC}) {
            edges {
              node {
                title
                drupal_id
                body {
                  processed
                }
                relationships {
                  field_tags {
                    __typename
                    ... on TaxonomyInterface {
                      drupal_id
                      id
                      name
                    }
                  }
                }
              }
            }
          }

          allNodeEmployer(sort: {title: ASC}) {
            edges {
              node {
                drupal_id
                field_employer_summary {
                  processed
                }
                title
                field_image {
                  alt
                }
                field_link {
                  uri
                }
                relationships {
                  field_tags {
                    __typename
                    ... on TaxonomyInterface {
                      drupal_id
                      id
                      name
                    }
                  }
                  field_image {
                    gatsbyImage(width: 400, height: 400, placeholder: BLURRED, layout: CONSTRAINED)
                  }
                }
              }
            }
        }
      }
    `)
    let contentType = props.contentType;
    let tag = props.tag;
    let careers = data.allNodeCareer?.edges;
    let courses = data.allNodeCourse?.edges;
    let employers = data.allNodeEmployer?.edges;
    let taggedCareers = [];
    let taggedCourses = [];
    let taggedEmployers = [];
    
    for (let i=0; i<careers.length; i++) {
        if (careers[i].node?.relationships?.field_tags?.length > 0) {
            for (let j=0; j<careers[i].node.relationships.field_tags.length; j++) {
                if (careers[i].node.relationships.field_tags[j].name === tag) {
                    taggedCareers.push(careers[i])
                }
            }            
        }
    }
    for (let i=0; i<courses.length; i++) {
        if (courses[i].node?.relationships?.field_tags?.length > 0) {
            for (let j=0; j<courses[i].node.relationships.field_tags.length; j++) {
                if (courses[i].node.relationships.field_tags[j].name === tag) {
                    taggedCourses.push(courses[i])
                }
            }            
        }
    }
    for (let i=0; i<employers.length; i++) {
        if (employers[i].node?.relationships?.field_tags?.length > 0) {
            for (let j=0; j<employers[i].node.relationships.field_tags.length; j++) {
                if (employers[i].node.relationships.field_tags[j].name === tag) {
                    taggedEmployers.push(employers[i])
                }
            }            
        }
    }

    switch (contentType) {
        case "career":
            return (taggedCareers.length > 0 ? <Careers careerData={taggedCareers} numColumns={3} /> : "No careers :(")
        case "course":
            return (taggedCourses.length > 0 ? <Courses courseData={taggedCourses} headingLevel="h4" /> : "No courses :(")
        case "employer":
            return (taggedEmployers.length > 0 ? <Employers employerData={taggedEmployers} /> : "No employers :(")
        default:
            return "Nothing to see here"
    }
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

