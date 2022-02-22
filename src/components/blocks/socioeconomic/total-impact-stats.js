import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from 'react-bootstrap'
import Statistic from "../../shared/statistic"

const render = ({ title, stats }) => (
    <>
        <h3 className="visually-hidden">{title}</h3>
        <Row className="mb-5">
            {stats.map(({value, type, colour}, index) => 
                <Col key={`intro-stat-${index}`} md={3} className="content-area">
                  <Statistic.Card colour={colour}>
                    <Statistic.Value><strong>{value}</strong></Statistic.Value>
                    <Statistic.Type>{type}</Statistic.Type>
                  </Statistic.Card>
                </Col>
            )}
        </Row>
    </>
)

const query = graphql`
  query {
    socioeconomicYaml(id: {eq: "socioeconomic_total_impact_stats"}) {
        id
        title
        stats {
            value
            type
            colour
        }
    }
  }
`

export default function SocioEconomicTotalImpactStats () {
  return <StaticQuery query={query} render={({socioeconomicYaml}) => render(socioeconomicYaml)} />
}