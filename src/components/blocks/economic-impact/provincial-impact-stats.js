import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Col, Container } from "react-bootstrap";
import Statistic from 'components/shared/statistic';

const colourOptions = [
  {border: "var(--black)"},
  {border: "var(--uog-red)"},
  {border: "var(--uog-yellow)"},
];

const render = ({ title, stats }) => (
  <Container>
    <h3 className="visually-hidden">{title}</h3>
    <Statistic className="row row-cols-1 row-cols-md-3 mb-5 g-4">
      {stats.map(({value, type, link}, index) => 
        <Col key={`prov-stat-${index}`} className="col-lg">
          <Statistic.BorderCard key={`prov-stat-${index}`} border={colourOptions[index].border} >
            <Statistic.Value><strong>{value}</strong></Statistic.Value>
            {link ? 
              <Statistic.Type><a href={link.url} className="fs-3">{type}</a></Statistic.Type>
              : <Statistic.Type>{type}</Statistic.Type>
            }
          </Statistic.BorderCard>
        </Col>
      )}
      </Statistic>
    </Container>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_provincial_stats"}) {
      id
      title
      stats {
          value
          type
          link {
            url
          }
      }
    }
  }
`

export default function EconImpactIntroStats () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml, colourOptions)} />
}