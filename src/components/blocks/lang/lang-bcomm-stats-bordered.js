import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Col } from "react-bootstrap";
import Statistic from 'components/shared/statistic';
import Statistic from "components/shared/statistic"

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
      <h3 className="visually-hidden">{yamlMap.title}</h3>
      <Statistic className="row row-cols-1 row-cols-md-3 mb-5 g-4">
        {yamlMap.stats.map(({value, type}, index) => 
          <Col key={`bcomm-stat-bordered-${index}`} className="col-lg">
            <Statistic.BorderCard border={colourOptions[index].border} >
              <Statistic.Value><strong>{value}</strong></Statistic.Value>
              <Statistic.Type>{type}</Statistic.Type>
            </Statistic.BorderCard>
          </Col>
        )}
        </Statistic>
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