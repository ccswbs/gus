import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Overlay from "components/shared/overlay"
import { Container, Col, Row } from "react-bootstrap"
import PageContainer from 'components/shared/pageContainer'
import { GatsbyImage, getImage, StaticImage} from "gatsby-plugin-image"
import Statistic from "components/shared/statistic"
import styled from 'styled-components'

const yaml = require('js-yaml');

const colourOptions = {background: "var(--uog-yellow)", colour: "#000000"};

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
        <Container className="page-container p-0">
        <GatsbyImage image={getImage(yamlFiles[yamlMap.image.src])} alt={yamlMap.image.alt} />
            <Statistic className="row g-0 row-cols-1 mb-0">
                    <Statistic.SolidCard 
                      background={colourOptions.background}  
                      colour={colourOptions.colour} 
                      className="px-5 pt-5 pb-3" >
                      <Statistic.Value fontsize="3.25rem" className="text-left">
                           <i class="fa-duotone fa-circle-3"></i><strong>{yamlMap.title}</strong></Statistic.Value>
                    </Statistic.SolidCard>
            </Statistic>
        </Container>
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