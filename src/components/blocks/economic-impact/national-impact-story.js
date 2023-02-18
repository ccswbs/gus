import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"

const NationalImpactAside = ({aside}) => (
    <div className="card bg-dark border-0 text-white p-5 rounded-0 align-self-center me-5">
        <div className="card-body px-5">
            <h3 className="mt-0 text-white h1">{aside.title}</h3>
            <div className="card-text fs-3">
                {aside.body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
            </div>
        </div>
    </div>
)

const NationalImpactTestimony = ({ testimonial }) => (
    <div className="mt-5 me-3 pb-5">
        <Row className="justify-content-center g-5">
            <Col xs={5} sm={4} md={3}>
                <GatsbyImage image={getImage(testimonial.source.image.src)} alt={testimonial.source.image.alt} imgClassName="rounded-circle" />
            </Col>
            <Col sm={8} md={9} className="ps-5 fs-2">
                <p className="fs-1 text-dark">
                    <i className="fad fa-quote-left pe-2 uog-blue" aria-hidden="true" /> 
                        <em>{testimonial.quote}</em>
                    <i className="fad fa-quote-right ps-2 uog-blue" aria-hidden="true" />
                </p>
                <p className="author"><strong>{testimonial.source.name}</strong> {testimonial.source.pronouns}
                <br /><em>{testimonial.source.desc}</em></p>
            </Col>
        </Row>
    </div>
)

const render = ({ title, lead, body_html, testimonial, aside }) => (
    <>
        <div className="d-flex flex-column bg-light">
            <div className="full-width-container">
                <Container className="page-container pe-0">
                    <Row className="site-content mx-4 py-0 pe-0">
                        <Col md={6} className="pe-5 pt-4">
                            <h2 id="national-impact">{title}</h2>
                            <p className="text-dark text-uppercase"><strong>{lead}</strong></p>
                            <div dangerouslySetInnerHTML={{__html: body_html}}></div>
                            <NationalImpactTestimony testimonial={testimonial} />
                        </Col>
                        <Col md={6} className="d-flex position-relative p-0">
                            <GatsbyImage image={getImage(aside.image.src)} alt={aside.image.alt} className="position-absolute top-0 end-0" />
                            <NationalImpactAside aside={aside} />    
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    </>
)

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {eq: "economic_impact_national_story"}) {
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

export default function EconImpactNationalStory () {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}