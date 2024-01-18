import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Overlay from "components/shared/overlay"
import { Row } from "react-bootstrap"
import PageContainer from 'components/shared/pageContainer'
import Statistic from "components/shared/statistic"
import styled from 'styled-components'

const yaml = require('js-yaml');

const Shadow = styled.p`
  text-shadow: 0px 0px 4px #ffffff;
  &:hover, &:focus {
    text-shadow: none;
  }
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
    yamlFiles[file.path.alias] = file.relationships.field_media_image;
  });

  try {
    yamlMap = yaml.load(field_yaml_map);
  } catch (e) {
    console.log(e);
    return null;
  }
  
  return (
    <PageContainer.SiteContent>
      <PageContainer.ContentArea>
          <div className="d-flex flex-column">
            <Overlay.GatsbyImage gatsbyImageData={getImage(yamlFiles[yamlMap.background_image.src])} alt={yamlMap.background_image.alt}>
                <Row className="h-100 w-100 p-5 justify-content-center align-items-center">
                  <div className="text-center"> 
                    <h2 className="display-2 text-dark">{yamlMap.title}</h2>
                    <Shadow><a href={yamlMap.link.url}>{yamlMap.link.title}</a></Shadow>
                  </div>
                </Row>
            </Overlay.GatsbyImage>
          </div>
        <div className="d-flex flex-column">
          <Statistic className="row g-0 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center mb-0">
            {yamlMap.stats.map(({value, type}, index) => 
              <Statistic.SolidCard 
                key={`international-stat-${index}`}
                background={colourOptions[index].background} 
                colour={colourOptions[index].colour} 
                className="px-5 pt-5 pb-3 col" >
                <Statistic.Value fontsize="3.25rem"><strong>{value}</strong></Statistic.Value>
                <Statistic.Type>{type}</Statistic.Type>
              </Statistic.SolidCard>
            )}
          </Statistic>
        </div>
      </PageContainer.ContentArea>
    </PageContainer.SiteContent>
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
              gatsbyImage(width: 1400, height: 190, placeholder: BLURRED, layout: CONSTRAINED, formats: [AUTO, WEBP])
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