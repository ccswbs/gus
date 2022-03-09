import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import EconImpactNationalImpactStats from "components/blocks/economic-impact/national-impact-stats"
import styled from "styled-components"

const Lead = styled.p`
    color: #000;
`
const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #000;
`

const NationalImpactAside = ({aside}) => (
    <div className="card bg-dark text-white p-5 rounded-0 align-self-center me-5">
        <div className="card-body px-2">
            <h3 className="mt-0 text-white h1">{aside.title}</h3>
            <div className="card-text fs-2">
                {aside.body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
            </div>
        </div>
    </div>
)

const NationalImpactTestimony = ({ testimonial }) => (
    <div className="mt-5 me-3 pb-5">
        <Row>
            <Col className="col-md-3 content-area">
                <GatsbyImage image={getImage(testimonial.source.image.src)} alt={testimonial.source.image.alt} imgClassName="rounded-circle" />
            </Col>
            <Col className="col-md-9 px-3 content-area">
                <QuoteText className="fs-2">
                    <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                        <em>{testimonial.quote}</em>
                    <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
                </QuoteText>
                <p className="author"><strong>{testimonial.source.name}</strong> {testimonial.source.pronouns}
                <br /><em>{testimonial.source.desc}</em></p>
            </Col>
        </Row>
    </div>
)

const render = ({ title, lead, body_html, testimonial, aside }) => (
    <>
        <Container fluid={true}>
            <div className="full-width-container bg-light">
                <Container className="page-container">
                    <Row className="gx-0 site-content mx-4">
                        <Col md={6} className="pe-4">
                            <h2 id="national-impact">{title}</h2>
                            <Lead className="text-uppercase"><strong>{lead}</strong></Lead>
                            <div dangerouslySetInnerHTML={{__html: body_html}}></div>
                            <NationalImpactTestimony testimonial={testimonial} />
                        </Col>
                        <Col md={6} className="d-flex position-relative overflow-hidden">
                            <GatsbyImage image={getImage(aside.image.src)} alt={aside.image.alt} className="position-absolute top-0 end-0" />
                            <NationalImpactAside aside={aside} />    
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
        <EconImpactNationalImpactStats />
    </>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_national_impact"}) {
        id
        title
        lead
        body_html
        testimonial {
            quote
            source {
                name
                desc
                pronouns
                image {
                    src {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                    alt
                }
            }
        }
        aside {
            title
            body
            image {
                src {
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

export default function EconImpactNationalImpact () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}