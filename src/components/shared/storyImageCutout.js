import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Col, Row } from "react-bootstrap"
import Overlay from "components/shared/overlay"
import ModalVideo from "components/shared/modalVideo"
import Video from 'components/shared/video';
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
// const render = ({ title, body, images, video, testimonial }) => (        
function StoryImageCutout (props) {
  let title = props.field_story_title;
  let body = props.field_story_text;
  let foreground = props.field_story_image;
  let background = props.field_story_image_bg;
  let video = props.field_story_content.relationships?.field_media_video;
  // let testimonial = props.field_story_content.relationships?.field_media_video;

  return foreground ? (
    <div className="d-flex flex-column bg-dark">
        <Overlay.GatsbyImage gatsbyImageData={getImage(background.src)} alt={background.alt}>
            <Container className="page-container">
                <Row className="site-content bg-transparent h-100 text-white pb-0">
                    <Col lg={6} className="fs-3 mb-4">
                        <SectionTitle>{title}</SectionTitle>
                        {body.map((paragraph, index) => <p key={`banky-text-${index}`}>{paragraph}</p>)}
                        {video ?? <ModalVideo 
                            id={video.id} 
                            src={video.url} 
                            title={video.title} 
                            transcript={video.transcript} 
                            modalButton = {
                                <button type="button" className="btn btn-primary my-4">
                                    <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                                </button>
                            }
                        />}
                    </Col>
                    <Col lg={6} className="d-flex justify-content-center">
                        <GatsbyImage image={getImage(foreground.src)} alt={foreground.alt} className="align-self-end img-fluid" />
                    </Col>
                </Row>
            </Container>
        </Overlay.GatsbyImage>

        {/* <Testimonial className="d-flex justify-content-center">
            <Row className="w-100 p-5 text-center">
                <QuoteText className="display-3 text-white">
                    <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                        <em>{testimonial.quote}</em>
                    <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
                </QuoteText>
                <QuoteSource className="fs-3">~ {testimonial.source.name}</QuoteSource>
            </Row>
        </Testimonial> */}
    </div>
  ) : null
}

export default StoryImageCutout

export const query = graphql`
  fragment StoryImageCutoutParagraphFragment on paragraph__story_image_cutout_background {
    id
    drupal_id
    field_story_title
    field_story_text {
      processed
    }
    field_story_image {
      ... on media__image {
        name
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }

    field_story_image_bg {
      ... on media__image {
        name
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }

    field_story_content {
      ... on paragraph__story_modal_video {
        drupal_id
        field_modal_video_button_title {
          processed
        }
        field_media_video {
          ... on media__remote_video {
            ...MediaRemoteVideoFragment
          }
        }
      }
    }
  }
`
