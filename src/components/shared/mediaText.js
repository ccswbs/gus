import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import SectionButtons from 'components/shared/sectionButtons';
import Video from 'components/shared/video';
import { ConditionalWrapper } from 'utils/ug-utils';

function MediaText (props) {
    
    const region = props.region;

    const mediaTitle = props.widgetData?.field_media_text_title;
    const mediaDescription = props.widgetData?.field_media_text_desc?.processed;
    const mediaBgColor = props.widgetData?.relationships?.field_bg_color?.name;
    const mediaButtons = props.widgetData?.relationships?.field_button_section;
    const mediaRelationships = props.widgetData?.relationships.field_media_text_media?.relationships;

    const imageURL = mediaRelationships?.field_media_image;	
    const imageAlt = props.widgetData?.relationships?.field_media_text_media?.field_media_image?.alt ?? "";
    const mediaSize = props.widgetData?.field_media_image_size;
    
    const videoTitle = props.widgetData?.relationships.field_media_text_media?.name;
    const videoTranscript = mediaRelationships?.field_media_file?.publicUrl;
    const videoURL = props.widgetData?.relationships.field_media_text_media?.field_media_oembed_video;
    const videoHeight = props.widgetData?.relationships.field_media_text_media?.field_video_height;
    const videoWidth = props.widgetData?.relationships.field_media_text_media?.field_video_width;
    const videoType = (videoURL?.includes("youtube") || videoURL?.includes("youtu.be") ? `youtube` : `vimeo`);
    const videoID = (videoType === `youtube` ? videoURL?.substr(videoURL?.length - 11) : videoURL?.substr(18));
    
    let mediaCol = "col-xs-12";
    let textCol = "col-xs-12";
    let textColBg;
    let textColHeight;
    let textColPadding;
    let wrapperCol;
    let headingClass;
    let headingColor;
    let textOrButtons = mediaDescription || mediaButtons ? true : false;
    
    switch(mediaBgColor) {
        case "Light Blue":
            textColBg = classNames('uog-blue-muted');
            headingColor = classNames('text-dark');            
        break;
        case "Dark Gray":
            textColBg = classNames('bg-dark');
            headingColor = classNames('text-light');
        break;
        default:
            textColBg = "";            
        break;
    }
    
    if (textColBg) {
        textColPadding = classNames('px-4 pb-4');
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
                        textColPadding = textColBg ? "p-4" : "";
                        wrapperCol = "col-md-6 row mt-4";
                    break;
                    case "medium":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                        textColPadding = textColBg ? "p-4" : "";
                        wrapperCol = "col-md-6 row mt-4";
                    break;
                    case "large":
                        mediaCol = "col-xs-12";
                        textCol = "col-xs-12";
                        textColHeight = "h-100"
                        wrapperCol = "col-md-6 mb-4 border-0 card";
                    break;
                    default:
                        mediaCol = "col-xs-12";
                        textCol = "col-xs-12";
                        textColHeight = "h-100"
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
                    wrapperCol = "col-md-4 border-0 card mb-4";
                break;
                case "medium":
                    wrapperCol = "col-md-6 border-0 card mb-4";
                break;
                case "large":
                    wrapperCol = "col-xs-12 border-0 card mb-4";
                break;
                default:
                    wrapperCol = "col-sm border-0 card mb-4";
                break;
            }
        }
    // Everything in the Secondary column is stacked
    } else if (region === "Secondary") {
        wrapperCol = "col-xs-12 border-0 card mb-4";        
    // Region is null, widget not in section 
    } else {
        wrapperCol = classNames('row mt-5', textColBg);
        if (imageURL) {
            if (mediaDescription || mediaButtons) {
                switch(mediaSize) {
                    case "small":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-3";
                        textCol = "col-md-9";
                        textColHeight = "h-100"
                        textColPadding = textColBg ? "p-4" : "";
                    break;
                    case "medium":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-4";
                        textCol = "col-md-8";
                        textColHeight = "h-100"
                        textColPadding = textColBg ? "p-4" : "";
                    break;
                    case "large":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                        textColHeight = "h-100"
                        textColPadding = textColBg ? "p-4" : "";
                    break;
                    default:
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                        textColHeight = "h-100"
                        textColPadding = textColBg ? "p-4" : "";
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
                        textColHeight = "h-100"
                    break;
                    case "medium":
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                        textColHeight = "h-100"
                    break;
                    case "large":
                        mediaCol = "col-md-12";
                        textCol = "col-md-12";
                        textColHeight = "h-100"
                    break;
                    default:
                        headingClass = "mt-md-0";
                        mediaCol = "col-md-6";
                        textCol = "col-md-6";
                        textColHeight = "h-100"
                    break;
                }
            } else {
                mediaCol = "col-xs-12";
            }
        }
        if (textColBg) {
            mediaCol = classNames(mediaCol, 'ps-0');
        }        
    }
    headingClass = classNames(headingClass, headingColor);
    textCol = classNames(textCol, textColBg, textColHeight, textColPadding, "text-break");
    
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

            {imageURL && <GatsbyImage image={imageURL.gatsbyImage} alt={imageAlt} />}
        </div>
        {textOrButtons &&
        <div data-title="media-description" className={textCol}>
            {mediaTitle && <h3 {...(headingClass !== `` ? {className:headingClass} : {})}>{mediaTitle}</h3>}
            {mediaDescription && <div {...(textColBg === `bg-dark` ? {className:`text-light`} : {})} dangerouslySetInnerHTML={{ __html: mediaDescription}} />}
            {mediaButtons && <SectionButtons key={props.widgetData.relationships.field_button_section.drupal_id} pageData={props.widgetData.relationships.field_button_section} />}
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
        publicUrl
        gatsbyImage(width: 1000, placeholder: BLURRED, layout: CONSTRAINED)
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