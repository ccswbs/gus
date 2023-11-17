import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"
import Link from "components/blocks/ovc/link"

const yaml = require('js-yaml')

const render = ({field_yaml_map, relationships}) => {
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
      console.log(yamlFiles);
      console.log(yamlMap);
      console.log(yamlMap.image.src);

    return(<>
        <div id={yamlMap.id} className="cover my-4">
            <GatsbyImage image={getImage(yamlFiles[4270].src)} className="cover-img" alt={yamlFiles[4270].alt}
                        style={{
                        }} 
            />
            <div className="cover-img-overlay p-4 m-0 bg-black-50 h-100"
                style={{
                background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.7) 25%)",
                }}
            >
            <div className="container h-100">
                <div className="row h-100 justify-content-end align-content-end">
                <div className="col-md-8 text-center">
                    <h2 className="text-warning font-weight-bold my-4 display-4">
                    {yamlMap.title}
                    </h2>
                    <Row className="no-gutters my-2">
                    {yamlMap.links.map(({title,url,variant}, index) => (
                        <Col md={4} key={index}>
                        <Link to={url} className={`btn btn-block ${variant === 'primary' ? 'btn-primary' : 'btn-outline-light'}  py-3`}
                                style={{borderColor: "rgba(248, 249, 250, .25)"}}>
                            {title}
                        </Link>
                        </Col>
                    ))}
                    </Row>
                </div>
                </div>
            </div>
            </div>
    </div></>)
}

const query = graphql`
query {
    blockContentYamlBlock(field_yaml_id: {glob: "discover_guelph"}) {
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

export default function DiscoverGuelph () {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}