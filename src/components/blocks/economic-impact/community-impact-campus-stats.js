import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container } from "react-bootstrap"
import Statistic from "components/shared/statistic"

const colourOptions = [
    {background: "var(--black)", colour: "#FFFFFF"},
    {background: "var(--uog-red)", colour: "#FFFFFF"},
    {background: "var(--uog-yellow)", colour: "#000000"},
  ];

const render = ({ title, stats }) => (
  <Container>
      <h3 className="h4">{title}</h3>
      <Statistic className="row mb-5 g-4">
          {stats.map(({value, type, image}, index) =>
            <div key={`community-stat-campuses-${index}`} className="col-lg">
                <Statistic.SolidCard  
                    background={colourOptions[index].background} 
                    colour={colourOptions[index].colour} >
                    <Statistic.Value><strong>{value}</strong></Statistic.Value>
                    <Statistic.Type>{type}</Statistic.Type>
                    <GatsbyImage image={getImage(image.src)} alt={image.alt} imgClassName="card-img" />
                </Statistic.SolidCard>
              </div>
          )}
      </Statistic>
  </Container>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_community_campus_stats"}) {
      id
      title
      stats {
          value
          type
          image {
              src{
                childImageSharp {
                    gatsbyImageData
                }
              }
              alt
          }
      }
    }
  }
`

export default function EconImpactCommunityImpactCampusStats () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}