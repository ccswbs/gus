import React from 'react';
import { graphql } from 'gatsby';
import { getImage } from "gatsby-plugin-image";
import { Col, Row } from "react-bootstrap";
import { ConditionalWrapper } from 'utils/ug-utils';
import GeneralText from 'components/shared/generalText';
import ModalVideo from "components/shared/modalVideo"
import Overlay from "components/shared/overlay";
import PageContainer from 'components/shared/pageContainer';
import Quote from 'components/shared/quote';
import SectionButtons from 'components/shared/sectionButtons';
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${props => (props.backgroundColour ?? "#000")};
  color: ${props => (props.textColour ?? "")};
  text-shadow: ${props => (props.backgroundColour ?? "#000")} 1px 0 4px;

  h1, h2, h3, h4, h5, h6,
  && p a {
    color: ${props => (props.textColour ?? "")} !important;
  }

  && strong {
    color: ${props => (props.textColour ?? "")} !important;
  }

  img {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
  }
`

// Currently allowing only one selection (can add support for multiple selections in future)
const StyleSelector = ({styles, image_bg, children}) => { 
  let overlayClasses;
  let backgroundColour;
  let textColour; 

  switch (styles.name) {
    case "Light overlay":
      overlayClasses = "img-light";
      backgroundColour = "#fff"
      break;
    case "No overlay":
      overlayClasses = "";
      break;
    case "No overlay with light text":
      overlayClasses = "";
      backgroundColour = "#000";
      textColour = "#fff";
      break;
    case "No overlay with dark text":
      overlayClasses = "";
      backgroundColour = "#fff";
      break;
    default:
      // DEFAULT SETTING: Dark overlay
      overlayClasses = "img-dark";
      backgroundColour = "#000";
      textColour = "#fff";
      break;
  }

  return (
    <Wrapper backgroundColour={backgroundColour} textColour={textColour} className={`d-flex flex-column p-0`}>
      <ConditionalWrapper 
        condition={image_bg?.src} 
        wrapper={children => 
            <Overlay.GatsbyImage 
              gatsbyImageData={getImage(image_bg?.src)} 
              alt={image_bg?.alt ?? ""} 
              className={overlayClasses}>
                {children}
            </Overlay.GatsbyImage>}>
          {children}
      </ConditionalWrapper>
    </Wrapper>
  )
}

// Currently allowing only one selection (can add support for multiple selections in future)
function selectAlignment (alignment) {
  // DEFAULT SETTING: Centre middle
  let alignmentClasses = {
    position: "justify-content-center align-items-center",
    text: "text-center",
  }

  switch (alignment.name) {
    case "Left middle":
      alignmentClasses.position = "justify-content-start align-items-center";
      alignmentClasses.text = "ps-5 text-start";
      break;
    case "Centre bottom":
      alignmentClasses.position = "justify-content-center align-items-end";
      break;
    default:
      break;
  }

  return alignmentClasses;  
}

const ContentSelector = ({data, textAlignment }) => {
    switch (data?.__typename) {
        case "paragraph__general_text":
          return <Col lg={10}>
                    <div className={textAlignment}>
                      <GeneralText processed={data.field_general_text.processed} />
                    </div>
                  </Col>;
        case "paragraph__section_buttons":
          return <div className={textAlignment}>
                    <SectionButtons key={data.drupal_id} pageData={data} />
                  </div>;
        case "paragraph__story_modal_video":
          let video = data.relationships?.field_media_video;
          let videoID = video?.drupal_id;
          let videoName = video?.name;
          let videoSrc = video?.field_media_oembed_video;
          let videoTranscript = video?.relationships?.field_media_file?.publicUrl;
          return <div className={textAlignment}><ModalVideo 
          id={videoID} 
          src={videoSrc} 
          title={videoName} 
          transcript={videoTranscript} 
          modalButton = {
              <button type="button" className="btn btn-primary my-4">
                  <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {videoName}</span>
              </button>
          } /></div>;
        case "paragraph__story_quote":
          return <Col lg={9} className="ps-5">
                    <Quote text={data.field_story_quote} 
                      source={data.field_quote_source} 
                      source_description={data.field_quote_source_description} />
                  </Col>;
        default:
          return null;
    }
}

const ImageOverlay = (props) => {
    let relationships = props.data?.relationships;
    
    // Content
    let content = relationships.field_story_content;
    let image_bg = {
      src: relationships?.field_story_image_bg?.relationships.field_media_image,
      alt: relationships?.field_story_image_bg?.field_media_image?.alt,
    }

    // Display settings
    let styles = relationships?.field_display_style;
    let alignment = relationships?.field_display_alignment;
    let alignmentClasses = selectAlignment(alignment);

    return content ? 
      <StyleSelector styles={styles} image_bg={image_bg}>
        <PageContainer className={`bg-transparent h-100`}>
          <Row className={`h-100 w-100 p-5 ${alignmentClasses.position}`}>
              {content?.map((contentItem, index) => <ContentSelector data={contentItem} key={index} textAlignment={alignmentClasses.text} />)}
          </Row>
        </PageContainer>
      </StyleSelector> : null
}

export default ImageOverlay

export const query = graphql`
  fragment ImageOverlayParagraphFragment on paragraph__image_overlay {
    drupal_id
    relationships {
      field_display_alignment {
        name
      }
      field_display_style {
        name
      }
      field_story_content {
        __typename
        ... on paragraph__general_text {
          ...GeneralTextParagraphFragment
        }
        ... on paragraph__section_buttons {
          ...SectionButtonsParagraphFragment
        }
        ... on paragraph__story_quote {
          drupal_id
          field_story_quote
          field_quote_source
          field_quote_source_description
        }
        ... on paragraph__story_modal_video {
          drupal_id
          field_modal_video_button_title {
            processed
          }
          relationships {
            field_media_video {
                ...RemoteVideoFragment
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
              publicUrl
              gatsbyImage(
                width: 1400,
                height: 600,
                placeholder: BLURRED, 
                layout: CONSTRAINED,
                cropFocus: ENTROPY,
              )
            }
          }
        }
      }
    }
  }

  fragment RemoteVideoFragment on media__remote_video {
    drupal_id
    name
    field_media_oembed_video
    field_video_height
    field_video_width
    relationships {
      field_media_file {
        publicUrl
      }
      field_video_cc {
        publicUrl
      }
    }
  }
`
