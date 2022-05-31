import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Overlay from "components/shared/overlay"
import { Container, Col, Row } from "react-bootstrap"
import PageContainer from 'components/shared/pageContainer'
import Statistic from "components/shared/statistic"
import styled from 'styled-components'

const yaml = require('js-yaml');

const Shadow = styled.p`
  text-shadow: 0px 0px 4px #ffffff;
`
const Gradient = styled(PageContainer.FullWidth)`
  background: linear-gradient(to right,#000 0%,#000 60%,#69A3B9 60%,#69A3B9 100%);
`
const colourOptions = [
  {background: "var(--uog-yellow)", colour: "#000000"},
];

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
          <Overlay.GatsbyImage gatsbyImageData={getImage(yamlFiles[yamlMap.background_image.src])} alt={yamlMap.background_image.alt}>
          </Overlay.GatsbyImage>
        </div>
      <Gradient className="d-flex flex-column">
        <Container className="page-container p-0">
         <p className="display-2 text-dark"><strong>{yamlMap.title}</strong></p>
        </Container>
      </Gradient>
    </>
  )}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "dvm_application_selection"}) {
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

export default function DVMApplicationSelection() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock, colourOptions)} />
}