import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PageContainer from 'components/shared/pageContainer'
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
    <PageContainer.SiteContent>
      <PageContainer.ContentArea>
        <Statistic.Grid columns="3" className="mb-5 gap-4">
          {yamlMap.stats.map(({value, type, footnote, footnote_marker}, index) => 
            <Statistic.BorderCard key={`bcomm-stat-bordered-${index}`} border={colourOptions[index].border} >
              <Statistic.Value><strong>{value}</strong></Statistic.Value>
              <Statistic.Type>{type}</Statistic.Type>
            </Statistic.BorderCard>
          )}
        </Statistic.Grid>
      </PageContainer.ContentArea>
    </PageContainer.SiteContent>
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