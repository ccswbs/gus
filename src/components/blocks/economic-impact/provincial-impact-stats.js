import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row } from "react-bootstrap";
import Statistic from 'components/shared/statistic';

const colourOptions = [
  {border: "var(--black)"},
  {border: "var(--uog-red)"},
  {border: "var(--uog-yellow)"},
];

const render = ({ title, stats }) => (
  <Container>
    <Row className="content-area">
      <h3 className="visually-hidden">{title}</h3>
      <Statistic.Grid columns="3" className="mb-5 gap-4">
        {stats.map(({value, type, link}, index) => 
          <Statistic.BorderCard key={`prov-stat-${index}`} border={colourOptions[index].border} >
            <Statistic.Value><strong>{value}</strong></Statistic.Value>
            {link ? 
              <Statistic.Type><a href={link.url} className="fs-3">{type}</a></Statistic.Type>
              : <Statistic.Type>{type}</Statistic.Type>
            }
          </Statistic.BorderCard>
        )}
        </Statistic.Grid>
      </Row>
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