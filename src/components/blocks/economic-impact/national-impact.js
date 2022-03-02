import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import EconImpactNationalImpactStats from "components/blocks/economic-impact/national-impact-stats"

const NationalImpactAside = ({aside}) => (
    <div className="card bg-dark text-white p-5 fs-3 rounded-0">
        <div className="card-body px-2">
            <h3 className="text-white">{aside.title}</h3>
            <div className="card-text">
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

            <Col className="col-md-9 content-area">
                <p className="quote fs-2">
                    <i className="fad fa-quote-left" aria-hidden="true"></i> <em>{testimonial.quote}</em> <i className="fad fa-quote-right" aria-hidden="true"></i></p>
                <p className="author"><strong>{testimonial.source.name}</strong> {testimonial.source.pronouns}
                <br /><em>{testimonial.source.desc}</em></p>
            </Col>
        </Row>
    </div>
)

const render = ({ title, body_html, testimonial, aside }) => (
    <>
        <Container fluid={true} className="position-relative overflow-hidden">
            <GatsbyImage image={getImage(aside.image.src)} alt={aside.image.alt} className="position-absolute end-0" />
            <div className="full-width-container bg-light">
                <Container className="page-container">
                    <div className="mx-4">
                        <Col className="mt-7">
                            <h2 id="national-impact">{title}</h2>
                        </Col>
                        <Row className="gx-0">
                            <Col md={6} className="fs-3 pe-4">
                                <div dangerouslySetInnerHTML={{__html: body_html}}></div>
                                <NationalImpactTestimony testimonial={testimonial} />
                            </Col>
                            <Col md={6}>
                                <NationalImpactAside aside={aside} />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </Container>
        <EconImpactNationalImpactStats />
    </>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_national_impact"}) {
        id
        title
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