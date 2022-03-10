import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
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


const Modal=({children}) => (
    <div id="bankyVideoModal" className="modal fade" tabindex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body p-0">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const Video = ({src, transcript, captions}) => (
    <div id="video-embed-banky" className="bg-dark">
        <section name="vimeo" className="ui-kit-section">
            <div className="embed-responsive embed-responsive-16by9">
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow text-yellow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <video className="ugplayer embed-responsive-item" width="100%" preload="none" controls="controls">
                    <source type="video/vimeo" src={`${src}`} />
                    { captions && <track className="caption-input" label="English" kind="subtitles" srclang="en" src={captions} default="true" /> }
                    { transcript && <link className="transcript-input" rel="transcript" label="English" kind="descriptions" srclang="en" src={transcript} default="true" /> }
                </video>
            </div>
        </section>
    </div>
)

const render = ({ title, body, images, video, testimonial }) => (
    <div className="d-flex flex-column bg-dark">
        <Overlay.GatsbyImage gatsbyImageData={getImage(images.background.src)} alt={images.background.alt}>
            <Container className="page-container">
                <Row className="site-content bg-transparent h-100 text-white pb-0">
                    <Col lg={6} className="fs-3 mb-4">
                        <SectionTitle>{title}</SectionTitle>
                        {body.map((paragraph, index) => <p key={`banky-text-${index}`}>{paragraph}</p>)}
                        {/* <a className="btn btn-primary my-4" href={video.url}>
                            <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                        </a> */}

                        <button type="button" className="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#bankyVideoModal">
                            <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                        </button>
                        <Modal>
                            <Video src={video.url} transcript={video.transcript} captions={video.captions} />
                        </Modal>
                    </Col>
                    <Col lg={6} className="d-flex justify-content-center">
                        <GatsbyImage image={getImage(images.foreground.src)} alt={images.foreground.alt} className="align-self-end img-fluid" />
                    </Col>
                </Row>
            </Container>
        </Overlay.GatsbyImage>
        <Testimonial className="d-flex justify-content-center">
            <Row className="p-5 text-center">
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