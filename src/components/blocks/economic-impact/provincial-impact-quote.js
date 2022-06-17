import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"
import Overlay from "components/shared/overlay"
import styled from "styled-components"

const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #000;
`
const QuoteShadow = styled.div`
  text-shadow: #fff 1px 0 4px;
`

const render = ({ quote, source, background_image }) => (
  <div className="d-flex flex-column bg-light mb-4">
    <Overlay.BgImage gatsbyImageData={getImage(background_image.src)} alt={background_image.alt}>
      <Container className="page-container">
        <Row className="h-100 w-100 p-5 justify-content-center align-items-center">
          <Col sm={9} className="ps-5">
            <QuoteShadow>
              <QuoteText className="display-4 my-5">
                  <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                      <em>{quote}</em>
                  <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
              </QuoteText>
              <p className="author text-dark fs-2"><strong>{source.name}</strong>
              <br /><em>{source.desc}</em></p>
            </QuoteShadow>
          </Col>
        </Row>
      </Container>
    </Overlay.BgImage>
  </div>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_provincial_quote"}) {
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
                gatsbyImageData (height:300)
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