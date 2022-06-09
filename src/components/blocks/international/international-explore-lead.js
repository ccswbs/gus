import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import styled from "styled-components"

const yaml = require('js-yaml');

const Lead = styled.div`
  & p {
    color: #000000;
    font-size: 2.8rem !important;
    font-weight: 300;
  }
`
const Button = styled.a`
  width: 100%;
  padding: 2rem;
  font-size: 3rem;
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
        <>
            <h2>{yamlMap.title}</h2>
            <Row>
              <Col md={9} className="pe-5">
                <Lead dangerouslySetInnerHTML={{__html: yamlMap.body_html}} />
              </Col>
              <Col md={3}>
                <Button href={yamlMap.link.url} className="btn btn-primary text-uppercase text-center">{yamlMap.link.title}</Button>
              </Col>
            </Row>
        </>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_explore_lead"}) {
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

export default function InternationalExploreLead() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}