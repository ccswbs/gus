import React from "react"
import { Container, Col } from "react-bootstrap"
import { StaticQuery, graphql } from "gatsby"
import Statistic from "components/shared/statistic"
import styled from 'styled-components'

const Gradient = styled.div`
  background: linear-gradient(to right,#000 0%,#000 60%,#69A3B9 60%,#69A3B9 100%);
`
const colourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
];

const render = ({ title, stats }, colourOptions) => (
  <Gradient className="d-flex flex-column">
    <Container className="page-container p-0">
      <h3 className="visually-hidden">{title}</h3>
        <Statistic className="row g-0 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center mb-0">
            {stats.map(({value, type}, index) => 
              <Col key={`nationalimpact-stat-${index}`}>
                <Statistic.SolidCard 
                  background={colourOptions[index].background} 
                  colour={colourOptions[index].colour} 
                  className="p-5 h-100" >
                  <Statistic.Value><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type>{type}</Statistic.Type>
                </Statistic.SolidCard>
              </Col>
            )}
        </Statistic>
    </Container>
  </Gradient>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_national_impact_stats"}) {
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