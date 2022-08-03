import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Video from 'components/shared/video';
import SectionButtons from 'components/shared/sectionButtons';
import { ConditionalWrapper } from 'utils/ug-utils';

function MediaText (props) {
    
    const region = props.region;

    const mediaTitle = props.widgetData?.field_media_text_title;
    const mediaDescription = props.widgetData.field_media_text_desc?.processed;
    const mediaBgColor = props.widgetData.relationships?.field_bg_color?.name;
    const mediaButtons = props.widgetData.relationships?.field_button_section;
    const mediaRelationships = props.widgetData.relationships.field_media_text_media?.relationships;

    const imageURL = mediaRelationships?.field_media_image?.localFile;	
    const imageAlt = props.widgetData.relationships?.field_media_text_media?.field_media_image?.alt ?? "";
    const mediaSize = props.widgetData?.field_media_image_size;
    
    const videoTitle = props.widgetData.relationships.field_media_text_media?.name;
    const videoTranscript = mediaRelationships?.field_media_file?.localFile.publicURL;
    const videoURL = props.widgetData.relationships.field_media_text_media?.field_media_oembed_video;
    const videoHeight = props.widgetData.relationships.field_media_text_media?.field_video_height;
    const videoWidth = props.widgetData.relationships.field_media_text_media?.field_video_width;
    const videoType = (videoURL?.includes("youtube") || videoURL?.includes("youtu.be") ? `youtube` : `vimeo`);
    const videoID = (videoType === `youtube` ? videoURL?.substr(videoURL?.length - 11) : videoURL?.substr(18));
    
    let mediaCol = "col-xs-12";
    let textCol = "col-xs-12";
    let textColBg;
    let textColPadding;
    let wrapperCol;
    let headingClass;
    let headingColor;
    let textOrButtons = mediaDescription || mediaButtons ? true : false;
    
    switch(mediaBgColor) {
        case "Blue Muted":
            textColBg = " uog-blue-muted";
            headingColor = " text-dark";            
        break;
        case "Light Gray":
            textColBg = " bg-light";
            headingColor = " text-dark";
        break;
        case "Dark Gray":
            textColBg = " bg-dark";
            headingColor = " text-light";
        break;
        default:
            textColBg = "";            
        break;
    }
    
    if (textColBg) {
        textColPadding = " p-4";
    } else {
        textColPadding = "";
    }

    if (region === "Primary") {
        // For images
        if (imageURL) {
            if (mediaDescription || mediaButtons) {
                switch(mediaSize) {
                    case "small":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-4";
                        textCol = "col-md-8";
                        wrapperCol = "col-md-6 row mt-4";
                    break;
                    case "medium":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                        wrapperCol = "col-md-6 row mt-4";
                    break;
                    case "large":
                        mediaCol = "col-xs-12";
                        textCol = "col-xs-12";
                        wrapperCol = "col-md-6 border-0 card";
                    break;
                    default:
                        mediaCol = "col-xs-12";
                        textCol = "col-xs-12";
                        wrapperCol = "col-sm mb-3 border-0 card";
                    break;
                }
            } else {
                switch(mediaSize) {
                    case "small":
                        mediaCol = "col-md-4";                    
                    break;
                    case "medium":
                        mediaCol = "col-md-6";
                    break;
                    case "large":
                        mediaCol = "col-xs-12";
                    break;
                    default:
                        mediaCol = "col-sm mb-3";
                    break;
                }
            }
        // For videos in Primary section, text and/or buttons will always appear underneath
        } else {
            switch(mediaSize) {
                case "small":
                    wrapperCol = "col-md-4 border-0 card";
                break;
                case "medium":
                    wrapperCol = "col-md-6 border-0 card";
                break;
                case "large":
                    wrapperCol = "col-xs-12 border-0 card";
                break;
                default:
                    wrapperCol = "col-sm border-0 card";
                break;
            }
        }
    // Everything in the Secondary column is stacked
    } else if (region === "Secondary") {
        wrapperCol = "col-xs-12 border-0 card";        
    // Region is null, widget not in section 
    } else {
        wrapperCol = "row mt-5" + textColBg;
        if (imageURL) {
            if (mediaDescription || mediaButtons) {
                switch(mediaSize) {
                    case "small":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-3";
                        textCol = "col-md-9";
                    break;
                    case "medium":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-4";
                        textCol = "col-md-8";
                    break;
                    case "large":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                    break;
                    default:
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                    break;
                }                
            } else {
                mediaCol = "col-xs-12";
            }
        } else {
            if (mediaDescription || mediaButtons) {
                switch(mediaSize) {
                    case "small":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-4";
                        textCol = "col-md-8";
                    break;
                    case "medium":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                    break;
                    case "large":
                        mediaCol = "col-md-12";
                        textCol = "col-md-12";
                    break;
                    default:
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                    break;
                }
            } else {
                mediaCol = "col-xs-12";
            }
        }
        if (textColBg) {
            mediaCol = mediaCol + " ps-0";
        }
    }

    return (
    <ConditionalWrapper condition={wrapperCol} wrapper={children => <section data-title="media-text-widget" className={wrapperCol}>{children}</section>}>
        <div data-title="media" className={mediaCol}>
            {videoURL &&
            <Video videoID={videoID}
                videoTitle={videoTitle}
                videoTranscript={videoTranscript}
                videoType={videoType}
                videoURL={videoURL}
                videoHeight={videoHeight}
                videoWidth={videoWidth}
            />}

            {imageURL && <GatsbyImage image={imageURL.childImageSharp.gatsbyImageData} alt={imageAlt} />}
        </div>
        {textOrButtons &&
        <div data-title="media-description" className={textCol + textColBg + textColPadding + " text-break h-100"}>
            {mediaTitle && <h3 className={(headingClass ? headingClass : undefined) + (headingColor ? headingColor : undefined)}>{mediaTitle}</h3>}
            {mediaDescription && <div {...(textColBg === ` bg-dark` ? {className:`text-light`} : {})} dangerouslySetInnerHTML={{ __html: mediaDescription}} />}
            {mediaButtons && <SectionButtons pageData={props.widgetData.relationships.field_button_section} />}
        </div>}
    </ConditionalWrapper>
    );
}

MediaText.propTypes = {
    widgetData: PropTypes.object,
    region: PropTypes.string,
}
MediaText.defaultProps = {
    widgetData: null,
    region: ``,
}

export default MediaText

export const query = graphql`

  fragment MediaImageFragment on media__image {
    name
    field_media_image {
      alt
    }
    relationships {
      field_media_image {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
    }
  }

  fragment MediaTextParagraphFragment on paragraph__media_text {
    drupal_id
    field_media_image_size
    field_media_text_title
    field_media_text_desc {
      processed
    }
    relationships {
      field_bg_color {
        name
      }
      field_section_column {
        name
      }
      field_media_text_media {
        ... on media__image {
          ...MediaImageFragment
        }
        ... on media__remote_video {
          ...MediaRemoteVideoFragment
        }
      }
      field_button_section {
        ... on paragraph__section_buttons {
          ...SectionButtonsParagraphFragment
        }
      }
    }
  }

`