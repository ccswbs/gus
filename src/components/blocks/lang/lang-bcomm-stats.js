import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"
import PageContainer from 'components/shared/pageContainer'
import Statistic from "components/shared/statistic"
import styled from 'styled-components'

const yaml = require('js-yaml');

const Gradient = styled(PageContainer.FullWidth)`
  background: linear-gradient(to right,#000 0%,#000 60%,#69A3B9 60%,#69A3B9 100%);
`
const colourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
];

const render = ({ field_yaml_map }, colourOptions) => {
  let yamlMap;

  try {
    yamlMap = yaml.load(field_yaml_map);
  } catch (e) {
    console.log(e);
    return null;
  }
  
  return (
      <Gradient className="d-flex flex-column">
        <Container className="page-container p-0">
            <Statistic className="row g-0 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center mb-0">
                {yamlMap.stats.map(({value, type, footnote_marker}, index) => 
                  <Statistic.SolidCard 
                    key={`lang-bcomm-stat-${index}`}
                    background={colourOptions[index].background} 
                    colour={colourOptions[index].colour} 
                    className="px-5 pt-5 pb-3 col" >
                    <Statistic.Value fontsize="3.25rem"><strong>{value}</strong></Statistic.Value>
                    <Statistic.Type>{type} {footnote_marker}</Statistic.Type>
                  </Statistic.SolidCard>
                )}
            </Statistic>
        </Container>
      </Gradient>
  )}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "lang_bcomm_stats"}) {
      id
      field_yaml_id
      field_yaml_map
    }
  }
`

export default function LangBcommStats() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock, colourOptions)} />
}