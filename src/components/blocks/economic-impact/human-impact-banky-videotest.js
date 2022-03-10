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

const Video = ({src}) => (
    <div className="col-md-6">
        <div id="video-embed">
            <section name="vimeo" className="ui-kit-section">
                <div className="embed-responsive embed-responsive-16by9">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-grow text-yellow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <video className="ugplayer embed-responsive-item" width="100%" id="" preload="none" controls="controls">
                        <source type="video/vimeo" src={`${src}`} />
                        {//contentExists(transcript) ? 
                        // <><track className="caption-input" label="English" kind="subtitles" srclang="en" src={videoCC} default="true" />
                        // <link className="transcript-input" rel="transcript" label="English" kind="descriptions" srclang="en" src={transcript} default="true" /></>
                        // : ``
                        }
                    </video>
                </div>
            </section>
        </div>
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
                        <a className="btn btn-primary my-4" href={video.url}><i class="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span></a>
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
        <Video src={video.url} />
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

export default function EconImpactCommunityImpactBankyVideoTest () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}