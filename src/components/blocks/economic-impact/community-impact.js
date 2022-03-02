import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Statistic from "components/shared/statistic"
import EconImpactCommunityImpactCampusStats from "components/blocks/economic-impact/community-impact-campus-stats"

const render = ({ title, intro, stats }) => (
    <Container className="page-container">
        <Row className="mt-5">
            <h2>{title}</h2>
            <Col md={5}>
                <h3>{intro.heading}</h3>
                {intro.body.map((paragraph, index) => <p key={`community-text-${index}`}>{paragraph}</p>)}
            </Col>
            <Col md={7}>
                <Statistic className="row gx-4">
                    {stats.map(({value, type, icon}, index) => 
                        <Col key={`community-stat-${index}`}>
                            <Statistic.Card className="px-5">
                                <Statistic.Icon icon={icon}/>
                                <Statistic.Value><strong>{value}</strong></Statistic.Value>
                                <Statistic.Type>{type}</Statistic.Type>
                            </Statistic.Card>
                        </Col>
                    )}
                </Statistic>
            </Col>
        </Row>
        <EconImpactCommunityImpactCampusStats />
    </Container>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_community"}) {
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