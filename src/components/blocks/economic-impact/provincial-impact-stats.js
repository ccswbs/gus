import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row } from "react-bootstrap";
import Statistic from 'components/shared/statistic';

const colourOptions = [
  {border: "var(--black)"},
  {border: "var(--uog-red)"},
  {border: "var(--uog-yellow)"},
];

const render = ({ title, stats }) => (
  <Row>
    <h3 className="visually-hidden">{title}</h3>
    <Statistic className="row row-cols-1 row-cols-md-3 mb-5 g-4">
      {stats.map(({value, type}, index) => 
        <div key={`prov-stat-${index}`} className="col-lg">
          <Statistic.BorderCard key={`prov-stat-${index}`} border={colourOptions[index].border} >
            <Statistic.Value><strong>{value}</strong></Statistic.Value>
            <Statistic.Type>{type}</Statistic.Type>
          </Statistic.BorderCard>
        </div>
      )}
      </Statistic>
    </Row>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_provincial_stats"}) {
      id
      title
      stats {
          value
          type
      }
    }
  }
`

export default function EconImpactIntroStats () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml, colourOptions)} />
}