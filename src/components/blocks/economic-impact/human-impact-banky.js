import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Col, Row } from "react-bootstrap"
//import Video from "components/shared/video"
import Overlay from "components/shared/overlay"
import styled from "styled-components"

const SectionTitle = styled.h3`
  font-size: 2.5rem;
  color: #fff;
  text-transform: uppercase;
`
const Testimonial = styled.div`
    background: #000;
`
const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #000;
`
const QuoteSource = styled.p`
    color: var(--uog-blue);
`

const render = ({ title, body, images, video, testimonial }) => (        
        <div className="d-flex flex-column bg-dark">
            <Overlay>
            <Overlay.BgImage gatsbyImageData={getImage(images.background.src)} alt={images.background.alt}>
                <Container className="page-container">
                    <Row className="site-content bg-transparent h-100 text-white pb-0">
                        <Col lg={6} className="fs-3 mb-4">
                            <SectionTitle>{title}</SectionTitle>
                            {body.map((paragraph, index) => <p key={`banky-text-${index}`}>{paragraph}</p>)}
                            <Overlay.ModalButton id={`modal-${video.id}`} className="btn-primary my-4">
                                <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                            </Overlay.ModalButton>
                            <Overlay.ModalVideo
                              id={`modal-${video.id}`}
                              videoSrc={video.url}
                              videoTitle={video.title}
                              videoTranscript={video.transcript}
                            />
                        </Col>
                        <Col lg={6} className="d-flex justify-content-center">
                            <GatsbyImage image={getImage(images.foreground.src)} alt={images.foreground.alt} className="align-self-end img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </Overlay.BgImage>
            </Overlay>

            <Testimonial className="d-flex justify-content-center">
                <Row className="w-100 p-5 text-center">
                    <QuoteText className="display-3 text-white">
                        <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                            <em>{testimonial.quote}</em>
                        <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
                    </QuoteText>
                    <QuoteSource className="fs-3">~ {testimonial.source.name}</QuoteSource>
                </Row>
            </Testimonial>
        </div>
    )

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_human_impact_banky"}) {
        id
        title
        body
        images {
            foreground {
                src {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                alt
            }
            background {
                src {
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                }
                alt
            }
        }
        video {
            id
            type
            title
            url
            transcript
            captions
        }
        testimonial {
            quote
            source {
                name
                desc
            }
        }
    }
  }
`

export default function EconImpactCommunityImpactBanky () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}