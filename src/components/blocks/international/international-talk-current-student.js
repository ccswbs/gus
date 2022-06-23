import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const yaml = require('js-yaml');

const render = ({ field_yaml_map, relationships }) => {
    let yamlMap;
    let yamlFiles = {};
    relationships.field_yaml_files.forEach(file => {
      yamlFiles[file.path.alias] = file.relationships.field_media_image.localFile;
    });

    try {
      yamlMap = yaml.load(field_yaml_map);
    } catch (e) {
      console.log(e);
      return null;
    }
    
    return (
      <Row className="my-sm-5">
        <Col md={7}>
          <GatsbyImage image={getImage(yamlFiles[yamlMap.image.src])} alt={yamlMap.image.alt} />
        </Col>
        <Col md={5} className="mt-5 ps-5">
          <h3>{yamlMap.title}</h3>
          <p>{yamlMap.body}</p>
          <p><a href={yamlMap.link.url}>{yamlMap.link.title}</a></p>
        </Col>
      </Row>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_talk_current_student"}) {
      id
      field_yaml_id
      field_yaml_map
      relationships {
        field_yaml_files {
          __typename
          ... on media__image {
            id
            name
            relationships {
              field_media_image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
                  }
                }
              }
            }
            path {
              alias
            }
          }
        }
      }
    }
  }
`

export default function InternationalTalkCurrentStudent() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}