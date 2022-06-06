import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row } from "react-bootstrap"
import {getImage} from "gatsby-plugin-image"
import Overlay from "components/shared/overlay"
import styled from 'styled-components'

const yaml = require('js-yaml');

const Shadow = styled.p`
  text-shadow: 0px 0px 4px #ffffff;
`
const colourOptions = {background: "var(--uog-red)", colour: "#ffffff"};

const render = ({ field_yaml_map, relationships }, colourOptions) => {
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
        <div className="d-flex flex-column bg-light">
          <Overlay.GatsbyImage gatsbyImageData={getImage(yamlFiles[yamlMap.image.src])} alt={yamlMap.image.alt}>
            <Container className="page-container">
              <Row className="h-100 w-100 p-5 justify-content-center align-items-center">
                  <p className="display-2 text-light"> <i class="fa-light fa-circle-4 fa-lg"> </i> <strong>{yamlMap.title}</strong></p>
              </Row>
            </Container>
          </Overlay.GatsbyImage>
        </div>

        
    </>
  )}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "dvm_application_offers"}) {
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
                  gatsbyImageData(width: 1400, height: 190, placeholder: BLURRED, layout: CONSTRAINED)
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

export default function DVMApplicationOffers() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock, colourOptions)} />
}