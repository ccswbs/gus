import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import styled from "styled-components"
import EconImpactHumanImpactStats from "components/blocks/economic-impact/human-impact-stats"
import EconImpactHumanImpactBanky from "components/blocks/economic-impact/human-impact-banky"

const Lead = styled.p`
  color: #000;
`

const render = ({ title, lead, body }) => (
  <>
    <Container className="page-container mt-5">
        <Row className="site-content">
          <h2>{title}</h2>
          <Col lg={7}>
              <Lead><strong className="mt-0">{lead}</strong></Lead>
              {body.map((paragraph, index) => <p key={`human-impact-text-${index}`}>{paragraph}</p>)}
          </Col>
          <EconImpactHumanImpactStats />
        </Row>
    </Container>
    <EconImpactHumanImpactBanky />
  </>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_human_impact"}) {
      id
      title
      lead
      body
    }
  }
`

export default function EconImpactHumanImpact () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}