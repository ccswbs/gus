import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SocioEconomicTotalImpactStats from "components/blocks/socioeconomic/total-impact-stats"

const render = ({ title, body, testimonial, aside }) => (
    <>
        <div className="full-width-container bg-light blueoverlay">
            <div className="container page-container">

                <div className="mx-4">
                    <div className="col-md-12 content-area mt-7">
                        <h2 id="total-impact">{title}</h2>
                    </div>

                    <div className="row">

                        <div className="col-md-6 content-area me-3">
                            {body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
                            <div className="testimonial mt-5 me-3 pb-5">
                                <div className="row">
                                    <div className="col-md-3 content-area">
                                        <GatsbyImage image={getImage(testimonial.image.src)} alt={testimonial.image.alt} />
                                    </div>

                                    <div className="col-md-9 content-area">
                                        <p className="quote">
                                            <i className="fad fa-quote-left" aria-hidden="true"></i> <em>{testimonial.quote}</em> <i className="fad fa-quote-right" aria-hidden="true"></i></p>
                                        <p className="author"><strong>{testimonial.person}</strong> {testimonial.person_pronouns}
                                        <br /><em>{testimonial.person_desc}</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 content-area">
                            <div className="card full-black">
                                <div className="card-body">
                                    {aside}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
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
        aside
    }
  }
`

export default function SocioEconomicTotalImpact () {
  return <StaticQuery query={query} render={({socioeconomicYaml}) => render(socioeconomicYaml)} />
}