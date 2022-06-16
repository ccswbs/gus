import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Col } from "react-bootstrap";
import Statistic from 'components/shared/statistic';

const yaml = require('js-yaml');

const colourOptions = [
  {border: "var(--black)"},
  {border: "var(--uog-red)"},
  {border: "var(--uog-yellow)"},
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
    <Container>
      <Statistic.Grid columns="3" className="mb-5 gap-4">
        {yamlMap.stats.map(({value, type, footnote_marker}, index) => 
          <Statistic.BorderCard key={`bcomm-stat-bordered-${index}`} border={colourOptions[index].border} >
            <Statistic.Value><strong>{value}</strong></Statistic.Value>
            <Statistic.Type>{type} {footnote_marker}</Statistic.Type>
          </Statistic.BorderCard>
        )}
      </Statistic.Grid>
    </Container>
  )}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "lang_bcomm_stats_bordered"}) {
      id
      field_yaml_id
      field_yaml_map
    }
  }
`

export default function LangBcommStatsBordered() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock, colourOptions)} />
}