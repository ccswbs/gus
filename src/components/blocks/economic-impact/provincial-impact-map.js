import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"

const render = ({ image, stations, campuses }) => (
    <Row>
        <Col md={9}>
            <GatsbyImage image={getImage(image.src)} alt={image.alt} />
        </Col>
        <Col md={3}>
            <h3>{stations.section_title}</h3>
            <ol>
                {stations.names.map((name, index) => 
                    <li key={`station-${index}`}>{name}</li>
                )}
            </ol>
            <h3>{campuses.section_title}</h3>
            <ol>
                {campuses.names.map((name, index) => 
                    <li key={`campus-${index}`}>{name}</li>
                )}
            </ol>
        </Col>
    </Row>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_provincial_map"}) {
        id
        title
        image {
            src {
              childImageSharp {
                gatsbyImageData
              }
            }
            alt
        }
        stations {
            section_title
            names
        }
        campuses {
            section_title
            names
        }
    }
  }
`

export default function EconImpactProvincialImpactMap () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}