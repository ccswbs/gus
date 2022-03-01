import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import EconImpactProvincialImpactMap from "components/blocks/economic-impact/provincial-impact-map"
import EconImpactProvincialImpactStats from "components/blocks/economic-impact/provincial-impact-stats"

const render = ({ title, image, sections }) => (
    <>
        <Container fluid={true} className="position-relative overflow-hidden">
            <div className="full-width-container">
                <Container className="page-container">
                    <div>
                        <Col>
                            <h2 id="provincial-impact">{title}</h2>
                        </Col>
                        <Row>
                            {/* Temporarily using Bootstrap to change font-size */}
                            <Col md={7} className="fs-3 pe-4">
                                {sections.map(({title, body_html}, index) => 
                                    <div key={`prov-section-${index}`}>
                                        <h3>{title}</h3>
                                        <div className="border-start border-warning border-4" dangerouslySetInnerHTML={{__html: body_html}}></div>
                                    </div>
                                )}
                            </Col>
                            <Col md={5}>
                                <GatsbyImage image={getImage(image.src)} alt={image.alt} />
                            </Col>
                        </Row>
                        <EconImpactProvincialImpactMap />
                        <EconImpactProvincialImpactStats />
                    </div>
                </Container>
            </div>
        </Container>
    </>
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

export default function EconImpactProvincialImpact () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}