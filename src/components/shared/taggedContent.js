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
          allNodeCourse(sort: {field_code: ASC}) {
            edges {
              node {
                title
                drupal_id
                field_credits
                field_level
                field_code
                title
                field_course_url {
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
    let tags = props.tags;
    let careers = data.allNodeCareer?.edges;
    let courses = data.allNodeCourse?.edges;
    let employers = data.allNodeEmployer?.edges;
    let taggedCareers = [];
    let taggedCourses = [];
    let taggedEmployers = [];
    let nameTags = [];
    
    if (nameTags && nameTags.length > 0) {
        for (let i=0; i<tags.length; i++) {
            nameTags.push(tags[i].name);
        }
    }
    
    for (let i=0; i<careers.length; i++) {
        const careerTags = careers[i].node?.relationships?.field_tags;
        if (careerTags && careerTags.length > 0) {
            for (let j=0; j<careerTags.length; j++) {
                if (nameTags.includes(careerTags[j].name)) {
                    taggedCareers.push(careers[i]);
                    break;
                }
            }            
        }
    }
    for (let i=0; i<courses.length; i++) {
        const courseTags = courses[i].node?.relationships?.field_tags;
        if (courseTags && courseTags.length > 0) {
            for (let j=0; j<courseTags.length; j++) {
                if (nameTags.includes(courseTags[j].name)) {
                    taggedCourses.push(courses[i]);
                    break;
                }
            }            
        }
    }
    for (let i=0; i<employers.length; i++) {
        const employerTags = employers[i].node?.relationships?.field_tags;
        if (employerTags && employerTags.length > 0) {
            for (let j=0; j<employerTags.length; j++) {
                if (nameTags.includes(employerTags[j].name)) {
                    taggedEmployers.push(employers[i]);
                    break;
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
    tags: PropTypes.array,
}

TaggedContent.defaultProps = {
    contentType: ``,
    tags: null,
}

export default TaggedContent

