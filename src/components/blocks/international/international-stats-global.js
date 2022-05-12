import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Col } from "react-bootstrap"
import Statistic from "components/shared/statistic"
import styled from 'styled-components'

const yaml = require('js-yaml');


const Gradient = styled.div`
  background: linear-gradient(to right,#000 0%,#000 60%,#69A3B9 60%,#69A3B9 100%);
`
const colourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
];

const render = ({ field_yaml_map, relationships }, colourOptions) => {
  const yamlMap = yaml.load(field_yaml_map);
  const yamlFiles = {};
  relationships.field_yaml_files.forEach(file => {
    yamlFiles[file.path.alias] = file.relationships.field_media_image.localFile;
  });
  
  return (
    <Gradient className="d-flex flex-column">
      <Container className="page-container p-0">
          <Statistic className="row g-0 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center mb-0">
              {yamlMap.stats.map(({value, type}, index) => 
                <Col key={`international-stat-${index}`}>
                  <Statistic.SolidCard 
                    background={colourOptions[index].background} 
                    colour={colourOptions[index].colour} 
                    className="p-5" >
                    <Statistic.Value fontsize="3.25rem"><strong>{value}</strong></Statistic.Value>
                    <Statistic.Type>{type}</Statistic.Type>
                  </Statistic.SolidCard>
                </Col>
              )}
          </Statistic>
      </Container>
    </Gradient>
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
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
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

export default function InternationalStatsGlobal() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock, colourOptions)} />
}