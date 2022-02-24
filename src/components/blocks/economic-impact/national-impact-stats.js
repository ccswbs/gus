import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from 'react-bootstrap'
import Statistic from "../../shared/statistic"

const colourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
];

const render = ({ title, stats }, colourOptions) => (
    <div className="mx-4">
        <h3 className="visually-hidden">{title}</h3>
        <Statistic className="row mb-5 gx-0">
            {stats.map(({value, type}, index) => 
                <Statistic.SolidCard key={`nationalimpact-stat-${index}`} background={colourOptions[index].background} colour={colourOptions[index].colour} className="col content-area px-5">
                  <Statistic.Value><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type>{type}</Statistic.Type>
                </Statistic.SolidCard>
            )}
        </Statistic>
    </div>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_national_impact_stats"}) {
        id
        title
        stats {
            value
            type
        }
    }
  }
`

export default function EconImpactNationalImpactStats () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml, colourOptions)} />
}