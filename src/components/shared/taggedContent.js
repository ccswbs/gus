import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Careers from 'src/components/shared/careers.js';
import Employers from 'src/components/shared/employers.js';

const listPages = (taggedPages) => {
    return (<>
      <ul className="two-col-md">
          {taggedPages.map(page => { 
              return <li><Link to={page.node.path.alias}>{page.node.title}</Link></li>
          })}
      </ul>      
    </>)
}

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
                internal {
                  type
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
                internal {
                  type
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
          allNodePage {
            edges {
              node {
                title
                path {
                  alias
                }
                internal {
                  type
                }
                relationships {
                  field_tags {
                    __typename
                    ... on TaxonomyInterface {
                      name
                    }
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
    let employers = data.allNodeEmployer?.edges;
    let pages = data.allNodePage?.edges;
    let taggedCareers = [];
    let taggedEmployers = [];
    let taggedPages = [];
    let nameTags = [];
    
    const allNodes = pages.concat(careers, employers);
    
    if (tags && tags.length > 0) {
        for (let i=0; i<tags.length; i++) {
            nameTags.push(tags[i].name);
        }
    }
    
    if (allNodes && allNodes.length > 0) {
        allNodes.forEach(item => {
            const itemTags = item.node?.relationships?.field_tags;
            if (itemTags && itemTags.length > 0) {
                let hasAllTags = true;
                for (let i=0; i<nameTags.length; i++) {
                    if (!itemTags.some(tag => tag.name === nameTags[i])) {
                        hasAllTags = false;
                        break;
                    }
                }
                if (hasAllTags) {
                    switch (item.node.internal.type) {
                        case 'node__page':
                            taggedPages.push(item);
                            break;
                        case 'node__employer':
                            taggedEmployers.push(item);
                            break;
                        case 'node__career':
                            taggedCareers.push(item);
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    }
    
    switch (contentType) {
        case "basic_page":
            return (taggedPages.length > 0 ? listPages(taggedPages) : "No pages :(")
        case "career":
            return (taggedCareers.length > 0 ? <Careers careerData={taggedCareers} numColumns={3} /> : "No careers :(")
        case "employer":
            return (taggedEmployers.length > 0 ? <Employers employerData={taggedEmployers} /> : "No employers :(")
        default:
            return null
    }
    //console.log(taggedPages)
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

