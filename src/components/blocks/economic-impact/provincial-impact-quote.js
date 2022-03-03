import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"

const render = ({ quote, source, background_image }) => (
    <Container className="page-container">
        {/* <Row className="card border-0"> */}
        <Row className="px-5">
            {/* <GatsbyImage image={getImage(background_image.src)} alt={background_image.alt} className="card-img" /> */}
            {/* <Row className="card-img-overlay justify-content-center align-items-center"> */}
            <Row className="justify-content-center align-items-center">
                <Col xs={2}>
                    <GatsbyImage image={getImage(source.image.src)} alt={source.image.alt} imgClassName="rounded-circle" />
                </Col>
                <Col md={6} className="ps-3">
                    <p className="quote fs-2">
                        <i className="fad fa-quote-left" aria-hidden="true"></i> <em>{quote}</em> <i className="fad fa-quote-right" aria-hidden="true"></i></p>
                    <p className="author"><strong>{source.name}</strong>
                    <br /><em>{source.desc}</em></p>
                </Col>
            </Row>
        </Row>
    </Container>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_provincial_quote"}) {
        id
        title
        quote
        source {
            name
            desc
            image {
                src {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                alt
            }
        }
        background_image {
            src {
              childImageSharp {
                gatsbyImageData(height: 300)
              }
            }
            alt
        }
    }
  }
`

export default function EconImpactProvincialImpactQuote () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}