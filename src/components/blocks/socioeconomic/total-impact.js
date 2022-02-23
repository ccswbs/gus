import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import SocioEconomicTotalImpactStats from "components/blocks/socioeconomic/total-impact-stats"

const TotalImpactAside = ({aside}) => (
    <div className="card bg-dark text-white p-5 fs-2">
        <div className="card-body px-2">
            <p className="card-text">{aside.body}</p>
        </div>
    </div>
)

const TotalImpactTestimony = ({ testimonial }) => (
    <div className="testimonial mt-5 me-3 pb-5">
        <div className="row">
            <div className="col-md-3 content-area">
                <GatsbyImage image={getImage(testimonial.image.src)} alt={testimonial.image.alt} imgClassName="rounded-circle" />
            </div>

            <div className="col-md-9 content-area">
                <p className="quote fs-2">
                    <i className="fad fa-quote-left" aria-hidden="true"></i> <em>{testimonial.quote}</em> <i className="fad fa-quote-right" aria-hidden="true"></i></p>
                <p className="author"><strong>{testimonial.person}</strong> {testimonial.person_pronouns}
                <br /><em>{testimonial.person_desc}</em></p>
            </div>
        </div>
    </div>
)

const render = ({ title, body, testimonial, aside }) => (
    <Container fluid={true}>
        <GatsbyImage image={getImage(aside.image.src)} alt={aside.image.alt} className="position-absolute end-0" />
        <div className="full-width-container bg-light blueoverlay">
            <Container className="page-container">
                <div className="mx-4">
                    <Col className="mt-7">
                        <h2 id="total-impact">{title}</h2>
                    </Col>
                    <Row>
                        <Col md={6}>
                            {body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
                            <TotalImpactTestimony testimonial={testimonial} />
                        </Col>
                        <Col md={6}>
                            <TotalImpactAside aside={aside} />
                        </Col>
                    </Row>
                </div>
                {/* <TotalImpactOverlay /> */}
            </Container>
        </div>
    </Container>
)

const query = graphql`
  query {
    socioeconomicYaml(id: {eq: "socioeconomic_total_impact"}) {
        id
        title
        body
        testimonial {
            quote
            image {
                src {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                alt
            }
            person
            person_pronouns
            person_desc
        }
        aside {
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

export default function SocioEconomicTotalImpact () {
  return <StaticQuery query={query} render={({socioeconomicYaml}) => render(socioeconomicYaml)} />
}