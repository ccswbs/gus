import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"

const render = ({ title, image, sections }) => (   
  <Row>
    <h2 id="provincial-impact">{title}</h2>
    <Col lg={7}>
        {sections.map(({title, body_html}, index) => 
            <div key={`prov-section-${index}`}>
                <h3 className="mt-0">{title}</h3>
                <div className="border-start border-warning border-4 px-4" dangerouslySetInnerHTML={{__html: body_html}}></div>
            </div>
        )}
    </Col>
    <Col lg={5}>
        <GatsbyImage image={getImage(image.src)} alt={image.alt} />
    </Col>
  </Row>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_provincial"}) {
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
        sections {
            title
            body_html
        }
    }
  }
`

export default function EconImpactProvincialImpactIntro () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}