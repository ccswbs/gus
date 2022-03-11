import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Col, Modal, Row } from "react-bootstrap"
import Video from "components/shared/video"
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

// const ModalButton = ({id, children}) => (
//     <button type="button" className="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#bankyVideoModal">
//         {children}
//     </button>
// )

// const MyModal = ({id, children}) => (
//     <div id={id} className="modal fade" tabIndex="-1">
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content">
//                 <div className="modal-body p-0">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     </div>
// )

// const Video = ({id, src, transcript, captions}) => (
//     <div id={id} className="bg-dark">
//         <section name="vimeo" className="ui-kit-section">
//             <div className="embed-responsive embed-responsive-16by9">
//                 <div className="d-flex justify-content-center">
//                     <div className="spinner-grow text-yellow" role="status">
//                         <span className="sr-only">Loading...</span>
//                     </div>
//                 </div>
//                 <video className="ugplayer embed-responsive-item" width="100%" preload="none" controls="controls">
//                     <source type="video/vimeo" src={`${src}`} />
//                     <>
//                         { captions && <track className="caption-input" label="English" kind="subtitles" srclang="en" src={captions} default="true" /> }
//                         { transcript && <link className="transcript-input" rel="transcript" label="English" kind="descriptions" srclang="en" src={transcript} default="true" /> }
//                     </>
//                 </video>
//             </div>
//         </section>
//     </div>
// )

const RenderBankySection = ({ title, body, images, video, testimonial }) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="d-flex flex-column bg-dark">
            <Overlay.GatsbyImage gatsbyImageData={getImage(images.background.src)} alt={images.background.alt}>
                <Container className="page-container">
                    <Row className="site-content bg-transparent h-100 text-white pb-0">
                        <Col lg={6} className="fs-3 mb-4">
                            <SectionTitle>{title}</SectionTitle>
                            {body.map((paragraph, index) => <p key={`banky-text-${index}`}>{paragraph}</p>)}
                            {/* <ModalButton id={video.id}>
                                <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                            </ModalButton> */}
                            <button type="button" className="btn btn-primary my-4" onClick={handleShow}>
                                <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                            </button>

                            <Modal size="lg" show={show} onHide={handleClose} centered>
                                <Modal.Body className="p-0 bg-dark">
                                    <Video videoID={video.id} videoType={video.type} playerID={`player-${video.id}`} videoTranscript={video.transcript} videoCC={video.captions} />
                                </Modal.Body>
                            </Modal>

                            {/* <MyModal id={video.id}>
                                <Video playerID={`embed-${video.id}`} videoURL={video.url} videoTranscript={video.transcript} videoCC={video.captions} /> */}
                                {/* <Video id={`embed-${video.id}`} src={video.url} transcript={video.transcript} captions={video.captions} /> */}
                            {/* </MyModal> */}
                        </Col>
                        <Col lg={6} className="d-flex justify-content-center">
                            <GatsbyImage image={getImage(images.foreground.src)} alt={images.foreground.alt} className="align-self-end img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </Overlay.GatsbyImage>

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

}

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
  return <StaticQuery query={query} render={({economicImpactYaml}) => RenderBankySection(economicImpactYaml)} />
}