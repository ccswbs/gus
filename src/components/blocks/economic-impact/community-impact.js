import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Statistic from "components/shared/statistic"
import EconImpactCommunityImpactCampusStats from "components/blocks/economic-impact/community-impact-campus-stats"
import EconImpactCommunityImpactMealcare from "components/blocks/economic-impact/community-impact-mealcare"
import styled from "styled-components"

const Heading = styled.h3`
  color: #000;
  font-size: 1.8rem;
`

const render = ({ title, intro, stats }) => (
  <>
    <Container className="page-container mt-5">
        <Row className="site-content gy-4">
          <h2 id="community-impact">{title}</h2>
          <Col lg={5}>
              <Heading className="mt-0 text-uppercase">{intro.heading}</Heading>
              {intro.body.map((paragraph, index) => <p key={`community-text-${index}`}>{paragraph}</p>)}
          </Col>
          <Col lg={7}>
              <Statistic className="row g-4 row-cols-1 row-cols-sm-3">
                  {stats.map(({value, type, icon}, index) => 
                      <Col key={`community-stat-${index}`}>
                          <Statistic.Card className="px-5">
                              <Statistic.Icon icon={icon} />
                              <Statistic.Value><strong>{value}</strong></Statistic.Value>
                              <Statistic.Type>{type}</Statistic.Type>
                          </Statistic.Card>
                      </Col>
                  )}
              </Statistic>
          </Col>
          <EconImpactCommunityImpactCampusStats />
        </Row>
    </Container>

    <EconImpactCommunityImpactMealcare />
  </>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_community"}) {
      id
      title
      intro {
        heading
        body
      }
      stats {
          value
          type
          icon
      }
    }
  }
`

export default function EconImpactCommunityImpact () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}