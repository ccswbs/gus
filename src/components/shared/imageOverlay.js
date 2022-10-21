import React from 'react';
import { graphql } from 'gatsby';
import { getImage, StaticImage } from "gatsby-plugin-image";
import { Col, Row } from "react-bootstrap";
import { ConditionalWrapper } from 'utils/ug-utils';
import Overlay from "components/shared/overlay";
import PageContainer from 'components/shared/pageContainer';
import styled from "styled-components";

const GeneralText = React.lazy(() => import('components/shared/generalText'));
const ModalVideo = React.lazy(() => import('components/shared/modalVideo'));
const Quote = React.lazy(() => import('components/shared/quote'));
const SectionButtons = React.lazy(() => import('components/shared/sectionButtons'));

const TextShadow = styled.div`
  text-shadow: ${props => (props.backgroundColour ?? "#000")} 1px 0 4px;

  i.fa-quote-left,
  i.fa-quote-right,
  a.btn, a:hover, a:focus {
    text-shadow: none !important;
  }
`
const YellowQuotes = styled.div`
  i.fa-quote-left,
  i.fa-quote-right {
    color: var(--uog-yellow);
  }
`
const RedQuotes = styled.div`
  i.fa-quote-left,
  i.fa-quote-right {
    color: var(--uog-red);
  }
  .author {
    border-left-color: var(--uog-red)
  }
`
const DarkText = styled.div`
  color: #000;
  h1, h2, h3, h4, h5, h6, && strong {
    color: #000 !important;
  }
  p a:hover, p a:focus {
    color: #fff !important;
  }
`
const LightText = styled.div`
  color: #fff;
  h1, h2, h3, h4, h5, h6, && p a, && strong,
  p a:hover, p a:focus {
    color: #fff !important;
  }
`
const DarkOverlay = styled.div`
  background: #000;

  img {
    filter: brightness(0.5); 
    max-height: 100%;
    object-fit: cover;
    width: 100%;
  }
`
const LightOverlay = styled.div`
  background: #fff;
  .gatsby-image-wrapper {
    filter: brightness(1.1); 
    opacity: 0.25;
  }

  img {
    max-height: 100%;
    object-fit: cover;
    width: 100%;
  }
`

const StyleSelector = ({styles, image_bg, children}) => {

  switch (styles?.name) {
    case "Light overlay":
      return (
        <LightOverlay className={`d-flex flex-column p-0`}>
          <DarkText>
            <ConditionalWrapper 
              condition={image_bg?.src} 
              wrapper={children => 
                  <Overlay.GatsbyImage 
                    gatsbyImageData={getImage(image_bg?.src)} 
                    alt={image_bg?.alt ?? ""} >
                      {children}
                  </Overlay.GatsbyImage>}>
                {children}
            </ConditionalWrapper>
          </DarkText>
        </LightOverlay>
      )
    case "Blue background":
      return (
        <YellowQuotes>
          <DarkText>
            <div style={{ display: "grid" }}>
              <StaticImage src="../../images/blue-quote-bg.jpg" alt="" style={{ gridArea: "1/1" }} />
              <div style={{ gridArea: "1/1", position: "relative", display: "grid" }}>
                {children}
              </div>
            </div>
          </DarkText>
        </YellowQuotes>
      )
    case "Red background":
      return (
        <TextShadow>
          <YellowQuotes>
            <LightText>
              <div style={{ display: "grid" }}>
                <StaticImage src="../../images/red-quote-bg.jpg" alt="" style={{ gridArea: "1/1" }} />
                <div style={{ gridArea: "1/1", position: "relative", display: "grid" }}>
                  {children}
                </div>
              </div>
            </LightText>
          </YellowQuotes>
        </TextShadow>
      )
    case "Yellow background":
      return (
        <RedQuotes>
          <DarkText>
            <div style={{ display: "grid" }}>
              <StaticImage src="../../images/yellow-quote-bg.jpg" alt="" style={{ gridArea: "1/1" }} />
              <div style={{ gridArea: "1/1", position: "relative", display: "grid" }}>
                {children}
              </div>
            </div>
          </DarkText>
        </RedQuotes>
      )
    default:
      break;
  }

  // DEFAULT SETTING: Dark overlay
  return (
    <TextShadow>
      <DarkOverlay className={`d-flex flex-column p-0`}>
        <LightText>
          <ConditionalWrapper 
            condition={image_bg?.src} 
            wrapper={children => 
                <Overlay.GatsbyImage 
                  gatsbyImageData={getImage(image_bg?.src)} 
                  alt={image_bg?.alt ?? ""} >
                    {children}
                </Overlay.GatsbyImage>}>
              {children}
          </ConditionalWrapper>
        </LightText>
      </DarkOverlay>
    </TextShadow>
  )
}

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
          return <div className={textAlignment}>
                    <GeneralText processed={data.field_general_text.processed} />
                  </div>;
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
          return <div className="ps-5">
                    <Quote text={data.field_story_quote} 
                      source={data.field_quote_source} 
                      source_description={data.field_quote_source_description} />
                  </div>;
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
            <Col lg={10}>
              {content?.map((contentItem, index) => <ContentSelector data={contentItem} key={index} textAlignment={alignmentClasses.text} />)}
            </Col>
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
