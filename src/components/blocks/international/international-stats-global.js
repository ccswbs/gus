import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { OverlayImage, ModalButton, OverlayModal } from "components/shared/overlay"
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
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
];

const render = ({ field_yaml_map, relationships }, colourOptions) => {
  let yamlMap;
  let yamlFiles = {};
  relationships.field_yaml_files.forEach(file => {
    yamlFiles[file.path.alias] = file.relationships.field_media_image.gatsbyImage;
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
          <OverlayImage gatsbyImageData={getImage(yamlFiles[yamlMap.background_image.src])} alt={yamlMap.background_image.alt}>
            <PageContainer>
              <Row className="h-100 w-100 p-5 justify-content-center align-items-center">
                <div className="text-center"> 
                  <p className="display-2 text-dark"><strong>{yamlMap.title}</strong></p>
                  <Shadow><a href={yamlMap.link.url}>{yamlMap.link.title}</a></Shadow>
                </div>
              </Row>
            </PageContainer>
          </OverlayImage>
        </div>
      <Gradient className="d-flex flex-column">
        <Container className="page-container p-0">
            <Statistic className="row g-0 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center mb-0">
                {yamlMap.stats.map(({value, type}, index) => 
                  <Col key={`international-stat-${index}`}>
                    <Statistic.SolidCard 
                      background={colourOptions[index].background} 
                      colour={colourOptions[index].colour} 
                      className="px-5 pt-5 pb-3" >
                      <Statistic.Value fontsize="3.25rem"><strong>{value}</strong></Statistic.Value>
                      <Statistic.Type>{type}</Statistic.Type>
                    </Statistic.SolidCard>
                  </Col>
                )}
            </Statistic>
        </Container>
      </Gradient>
    </>
  )}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_stats_global_impact"}) {
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
                height: 190
                placeholder: BLURRED
                layout: CONSTRAINED
              ) 
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

export default function InternationalStatsGlobal() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock, colourOptions)} />
}