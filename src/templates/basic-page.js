import React from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Breadcrumbs from '../components/breadcrumbs';
import Widgets from '../components/widgets'
import { graphql } from 'gatsby';
import { contentExists } from '../utils/ug-utils';

const BasicPage = ({data}) => {

    const pageData = data.pages.edges[0].node;
    const nodeID = pageData.drupal_internal__nid;   
    const title = pageData.title;
    const imageData = data.images.edges;
    const ogDescription = (contentExists(pageData.field_metatags) ? pageData.field_metatags.og_description : null);
    const ogImage = (contentExists(imageData) ? imageData[0].node.relationships.field_media_image.localFile.publicURL : null);
    const ogImageAlt = (contentExists(imageData) ? imageData[0].node.field_media_image.alt : null);

    /****
    WidgetData contains all widgets (paragraphs) that are available - when adding a new widget, validate that the correct items are selected using a comparison to __typename.  This will be paragraph__WIDGETNAME - you can pass the widgetsData variable through to your component. 
    ****/
    
    const widgetsData = (contentExists(pageData.relationships.field_widgets) ? pageData.relationships.field_widgets : null);
    
    console.log(ogImage);

    return (
        <Layout>
            <Helmet bodyAttributes={{
                class: 'basic-page'
            }}
            />
            <Helmet><script defer type="text/javascript" src="https://www.uoguelph.ca/js/uog-media-player.js"></script></Helmet>
            <SEO title={title} description={ogDescription} img={ogImage} imgAlt={ogImageAlt} />
            
            { /**** Header and Title ****/ }
            <div className={!contentExists(imageData) && "no-thumb"} id="rotator">
                <Hero imgData={imageData} />
                <div className="container ft-container">
                    <h1 className="fancy-title">{title}</h1>
                </div>
            </div>
            
            <Breadcrumbs nodeID={nodeID} nodeTitle={title} />
            
            { /**** Body content ****/ }
            <div className="container page-container">
                { /**** Widgets content ****/}      
                <div className="row row-with-vspace site-content">
                    <section className="col-md-12 content-area">
                        <Widgets pageData={widgetsData} />
                    </section>
                </div>
            </div>
        </Layout>
    )
    
}

export default BasicPage;

export const query = graphql`query ($id: String) {
  pages: allNodePage(filter: {id: {eq: $id}}) {
    edges {
      node {
        drupal_id
        drupal_internal__nid
        title
        field_metatags {
          og_description
        }
        relationships {
          field_widgets {
            __typename
            ... on paragraph__call_to_action {
              id
              field_cta_title
              field_cta_description
              field_cta_primary_link {
                title
                uri
              }
              relationships {
                field_section_column {
                  name
                }
              }
            }
            ... on paragraph__general_text {
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
            ... on paragraph__lead_paragraph {
              id
              field_lead_paratext {
                value
              }
              relationships {
                field_lead_para_hero {
                  field_media_image {
                    alt
                  }
                  relationships {
                    field_media_image {
                      localFile {
                        publicURL
                        childImageSharp {
                          gatsbyImageData(
                            placeholder: BLURRED
                            layout: FULL_WIDTH
                          )
                        }
                      }
                    }
                  }
                }
              }
            }
        ... on paragraph__section_tabs {
              id
              relationships {
                field_tabs {
                  field_tab_title
                  field_tab_body {
                    value
                  }
                }
              }
        }
            ... on paragraph__links_widget {
              drupal_id
              field_link_items_title
              field_link_items_description
              relationships {
                field_link_items {
                  drupal_id
                  field_link_description
                  field_link_url {
                    title
                    uri
                  }
                  relationships {
                    field_link_image {
                      relationships {
                        field_media_image {
                          localFile {
                            publicURL
                            childImageSharp {
                              resize(width: 400, height: 300, cropFocus: CENTER) {
                                src
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
            ... on paragraph__section {
              drupal_id
              field_section_title
              field_section_classes
              relationships {
                field_section_content {
                  __typename
                  ... on paragraph__call_to_action {
                    id
                    field_cta_title
                    field_cta_description
                    field_cta_primary_link {
                      title
                      uri
                    }
                    relationships {
                      field_section_column {
                        name
                      }
                    }
                  }
                  ... on paragraph__general_text {
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
                  ... on paragraph__links_widget {
                    drupal_id
                    field_link_items_title
                    field_link_items_description
                    relationships {
                      field_link_items {
                        drupal_id
                        field_link_description
                        field_link_url {
                          title
                          uri
                        }
                        relationships {
                          field_link_image {
                            relationships {
                              field_media_image {
                                localFile {
                                  publicURL
                                  childImageSharp {
                                    resize(width: 400, height: 300, cropFocus: CENTER) {
                                      src
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
                  ... on paragraph__media_text {
                    field_media_text_title
                    field_media_text_desc {
                      processed
                    }
                    field_media_text_links {
                      title
                      uri
                    }
                    relationships {
                      field_section_column {
                        name
                      }
                      field_media_text_media {
                        ... on media__image {
                          name
                          field_media_image {
                            alt
                          }
                          relationships {
                            field_media_image {
                              localFile {
                                publicURL
                                childImageSharp {
                                  gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
                                }
                              }
                            }
                          }
                        }
                        ... on media__remote_video {
                          drupal_id
                          name
                          field_media_oembed_video
                          relationships {
                            field_media_file {
                              localFile {
                                publicURL
                              }
                            }
                            field_video_cc {
                              localFile {
                                publicURL
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  ... on paragraph__stats_widget {
                    drupal_id
                    relationships {
                      field_section_column {
                        name
                      }
                      field_statistic {
                        field_stat_range
                        field_stat_value
                        field_stat_value_end
                        relationships {
                          field_stat_type {
                            name
                          }
                        }
                      }
                    }
                  }
                  ... on paragraph__lead_paragraph {
                    id
                    field_lead_paratext {
                      value
                    }
                    relationships {
                      field_section_column {
                        name
                      }
                      field_lead_para_hero {
                        field_media_image {
                          alt
                        }
                        relationships {
                          field_media_image {
                            localFile {
                              publicURL
                              childImageSharp {
                                gatsbyImageData(
                                  placeholder: BLURRED
                                  layout: FULL_WIDTH
                                )
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  ... on paragraph__section_buttons {
                    drupal_id
                    relationships {
                      field_section_column {
                        name
                      }
                      field_buttons {
                        drupal_id
                        field_button_link {
                          title
                          uri
                        }
                        field_cta_heading {
                          processed
                        }
                        field_font_awesome_icon
                        field_formatted_title {
                          processed
                        }
                        relationships {
                          field_button_style {
                            name
                          }
                          field_font_awesome_icon_colour {
                            name
                          }
                          field_cta_analytics_goal {
                            name
                            field_goal_action
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on paragraph__media_text {
              field_media_text_title
              field_media_text_desc {
                processed
              }
              field_media_text_links {
                title
                uri
              }
              relationships {
                field_media_text_media {
                  ... on media__image {
                    name
                    field_media_image {
                      alt
                    }
                    relationships {
                      field_media_image {
                        localFile {
                          publicURL
                          childImageSharp {
                            gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
                          }
                        }
                      }
                    }
                  }
                  ... on media__remote_video {
                    drupal_id
                    name
                    field_media_oembed_video
                    relationships {
                      field_media_file {
                        localFile {
                          publicURL
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on paragraph__stats_widget {
              drupal_id
              relationships {
                field_statistic {
                  field_stat_range
                  field_stat_value
                  field_stat_value_end
                  relationships {
                    field_stat_type {
                      name
                    }
                  }
                }
              }
            }
          }
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
  images: allMediaImage(filter: {relationships: {node__page: {elemMatch: {id: {eq: $id}}}}}) {
    edges {
      node {
        drupal_id
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
              publicURL
              childImageSharp {
                 gatsbyImageData(
                  transformOptions: {cropFocus: CENTER}
                  placeholder: BLURRED
                  aspectRatio: 3
                )
              }
            }
          }
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
`
