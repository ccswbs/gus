import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"

const yaml = require('js-yaml');

const NationalImpactAside = ({aside}) => (
    <div className="card bg-dark border-0 text-white p-5 rounded-0 align-self-center me-5">
        <div className="card-body px-5">
            <h3 className="mt-0 text-white h1">{aside.title}</h3>
            <div className="card-text fs-3">
                {aside.body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
            </div>
        </div>
    </div>
)

const render = ({ field_yaml_map, relationships }) => {
  let yamlMap;
  let yamlFiles = {};
  relationships.field_yaml_files.forEach(file => {
    yamlFiles[file.drupal_internal__mid] = {
      src: file.relationships?.field_media_image,
      alt: file.relationships?.field_media_image?.relationships.media__image[0].field_media_image.alt,
    }
  });

  try {
    yamlMap = yaml.load(field_yaml_map);
  } catch (e) {
    console.log(e);
    return null;
  }

  return (<>
    <div className="d-flex flex-column bg-light">
        <div className="full-width-container">
            <Container className="page-container pe-0">
                <Row className="site-content mx-4 py-0 pe-0">
                    <Col md={6} className="pe-5 pt-4">
                        <h2 id="national-impact">{yamlMap.title}</h2>
                        <p className="text-dark text-uppercase"><strong>{yamlMap.lead}</strong></p>
                        <div dangerouslySetInnerHTML={{__html: yamlMap.body_html}}></div>
                            <div className="mt-5 me-3 pb-5">
                                <Row className="justify-content-center g-5">
                                <Col xs={5} sm={4} md={3}>
                                    <GatsbyImage 
                                      image={getImage(yamlFiles[yamlMap.testimonial.source.image.mid]?.src)} 
                                      alt={yamlFiles[yamlMap.testimonial.source.image.mid]?.alt ?? ""} imgClassName="rounded-circle" 
                                    />                                    
                                </Col>
                                <Col sm={8} md={9} className="ps-5 fs-2">
                                    <p className="fs-1 text-dark">
                                        <i className="fad fa-quote-left pe-2 uog-blue" aria-hidden="true" /> 
                                            <em>{yamlMap.testimonial.quote}</em>
                                        <i className="fad fa-quote-right ps-2 uog-blue" aria-hidden="true" />
                                    </p>
                                    <p className="author"><strong>{yamlMap.testimonial.source.name}</strong> {yamlMap.testimonial.source.pronouns}
                                    <br /><em>{yamlMap.testimonial.source.desc}</em></p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex position-relative p-0">
                        <GatsbyImage image={getImage(yamlFiles[yamlMap.aside.image.mid]?.src)} alt={yamlFiles[yamlMap.aside.image.mid]?.alt ?? ""} className="position-absolute top-0 end-0" />
                        <NationalImpactAside aside={yamlMap.aside} />    
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    </>)
}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "economic_impact_national_story"}) {
      id
      field_yaml_id
      field_yaml_map
      relationships {  
        field_yaml_files {
          id
          name
          relationships {
            field_media_image {
                gatsbyImage(
                  width: 1400 
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  cropFocus: CENTER
                )
                relationships {
                  media__image {
                    field_media_image {
                      alt
                    }
                  }
                }
            }
          }        
          drupal_internal__mid
        }
      }
    }
  }
`

export default function EconImpactNationalStory () {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}