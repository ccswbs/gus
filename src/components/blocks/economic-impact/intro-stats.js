import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Col } from "react-bootstrap";
import Statistic from 'components/shared/statistic';

const colourOptions = [
  {border: "var(--black)"},
  {border: "var(--uog-red)"},
  {border: "var(--uog-yellow)"},
  {border: "var(--uog-blue)"},
  {border: "var(--black)"},
];

const render = ({ title, stats }) => (
    <>
    <Container>
      <h3 className="visually-hidden">{title}</h3>
      <Statistic className="row row-cols-1 row-cols-lg-3 mb-5 g-4">
        {stats.map(({value, type}, index) => 
          <Col key={`intro-stat-${index}`} className="col-lg">
            <Statistic.BorderCard border={colourOptions[index].border} >
              <Statistic.Value><strong>{value}</strong></Statistic.Value>
              <Statistic.Type><span className="text-uppercase">{type}</span></Statistic.Type>
            </Statistic.BorderCard>
          </Col>
        )}
        </Statistic>
      </Container>
    </>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_intro_stats"}) {
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