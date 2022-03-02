import React from "react"
import { Container, Col } from "react-bootstrap"
import { StaticQuery, graphql } from "gatsby"
import Statistic from "components/shared/statistic"

const colourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
];

const render = ({ title, stats }, colourOptions) => (
  <Container className="page-container">
    <div className="mx-4">
        <h3 className="visually-hidden">{title}</h3>
        <Statistic className="row g-0">
            {stats.map(({value, type}, index) => 
              <Col key={`nationalimpact-stat-${index}`}>
                <Statistic.SolidCard 
                  background={colourOptions[index].background} 
                  colour={colourOptions[index].colour} >
                  <Statistic.Value><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type>{type}</Statistic.Type>
                </Statistic.SolidCard>
              </Col>
            )}
        </Statistic>
    </div>
  </Container>
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