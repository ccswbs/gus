import { graphql, Link } from 'gatsby';
import Layout from 'components/layout';
import React from 'react';
import Seo from 'components/seo';
import { GatsbyImage } from "gatsby-plugin-image";

const IndexPage = ({ data }) => {
    console.log(data);
    const pageTags = [];    
    const pages = data.allNodePage.edges;
    const tags = data.tags.edges;
    
    // Fetch tags used on pages
    for (let i=0; i<tags.length; i++) {
        if ((tags[i].node?.relationships?.node__page?.length > 0)&&(tags[i].node.name === "OVC Department of Biomedical Sciences" || tags[i].node.name === "OVC Department of Clinical Studies" ||tags[i].node.name === "OVC Department of Pathobiology" || tags[i].node.name === "OVC Department of Population Medicine" )){
            pageTags.push(tags[i])            
        }
    }
    console.log(pageTags)
 
    return (
    <Layout>
        <Seo title="Ontario Veterinary College" />
        <div className="container page-container">
          <div className="site-content">
            <div className="content-area">
              <h1>Ontario Veterinary College Faculty List</h1>              
              {pageTags.map((tag) => {
                const taggedPages = tag.node.relationships.node__page;
                const taggedPagesPubbed = taggedPages.filter(page => page.status === true);
                console.log("taggedPagesPubbed",taggedPagesPubbed)
                taggedPagesPubbed.sort((a,b) => (a.title.split(' ').pop() > b.title.split(' ').pop()) ? 1 : ((b.title.split(' ').pop() > a.title.split(' ').pop()) ? -1 : 0));
                return (taggedPagesPubbed.length > 0 && 
                  <React.Fragment key={`tagged-fragment-${tag.node.name}`}>
                    <h2 className="text-dark" id={`${tag.node.name.replace("OVC ",'').replace(/\s+/g, '-',).toLowerCase()}`}>{tag.node.name}</h2>
                    {tag.node.description?.processed && <div dangerouslySetInnerHTML={{__html: tag.node.description.processed}}></div>}
                    <p>Total pages: <strong>{taggedPagesPubbed.length}</strong></p>
                      <ul className="three-col-md">
                        {taggedPagesPubbed.map((taggedPage, index) => (
                            <li key={`tagged-${index}`}><Link to={taggedPage.path.alias}>
                            {/* <GatsbyImage image={taggedPage.relationships.field_widgets.relationships.field_media_text_media.relationships.field_media_image} alt="" /> */}
                            {console.log("field_widgets",taggedPage.relationships.field_widgets[0].relationships.field_media_text_media)}
                            {taggedPage.title}
                            </Link></li>
                        ))}
                      </ul>
                  </React.Fragment>)
              })}
            </div>
          </div>ß
        </div>
    </Layout>
    )
}

export default IndexPage

export const query = graphql`{
  accordion: homeYaml(yamlId: {eq: "home_accordion"}) {
    id
    accordion {
      title
      content
    }
  }
  allNodePage(sort: {title: ASC}) {
    edges {
      node {
        title
        drupal_id
        path {
          alias
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
        status
      }
    }
  }
  programs: allNodeProgram(sort: {title: ASC}) {
    edges {
      node {
        drupal_id
        drupal_internal__nid
        title
        path {
          alias
        }
        status
      }
    }
  }
  tags: allTaxonomyInterface(sort: {name: ASC}) {
    edges {
      node {
        ... on taxonomy_term__tags {
          name
          description {
            processed
          }
          relationships {
            node__page {
              status
              title
              path {
                alias
              }
              relationships {
                field_widgets {
                  ... on paragraph__media_text {
                    id
                    relationships {
                      field_media_text_media {
                        ... on media__image {
                          id
                          name
                          field_media_image {
                            alt
                          }
                          relationships {
                            field_media_image {
                              gatsbyImage(cropFocus: FACES, placeholder: BLURRED, width: 500, aspectRatio: 1)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ... on taxonomy_term__units {
          name
          description {
            processed
          }
          relationships {
            node__page {
              status
              title
              path {
                alias
              }
            }
          }
        }
      }
    }
  }
}`
