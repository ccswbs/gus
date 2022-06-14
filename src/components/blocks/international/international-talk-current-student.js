import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components";

const yaml = require('js-yaml');

const Wrapper = styled(Row)`
  @media only screen and (min-width: 768px) {
    margin: 8rem 0;
  }
`

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
      <Wrapper>
        <Col md={7}>
          <GatsbyImage image={getImage(yamlFiles[yamlMap.image.src])} alt={yamlMap.image.alt} />
        </Col>
        <Col md={5} className="mt-5 ps-5">
          <h3>{yamlMap.title}</h3>
          <p>{yamlMap.body}</p>
          <a href={yamlMap.link.url}>{yamlMap.link.title}</a>
        </Col>
      </Wrapper>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_talk_current_student"}) {
      id
      field_yaml_id
      field_yaml_map
      relationships {
        field_yaml_files {
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
`

export default function InternationalTalkCurrentStudent() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}