import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"
import styled from "styled-components"

const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #000;
`

const render = ({ quote, source, background_image }) => (
  <Row className="p-5 bg-light justify-content-center align-items-center">
    <Col className="col-md-2">
        <GatsbyImage image={getImage(source.image.src)} alt={source.image.alt} imgClassName="rounded-circle" />
    </Col>
    <Col className="col-md-6 ps-3">
      <QuoteText className="fs-2">
          <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
              <em>{quote}</em>
          <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
      </QuoteText>
      <p className="author"><strong>{source.name}</strong>
      <br /><em>{source.desc}</em></p>
    </Col>
  </Row>
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