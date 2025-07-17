import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import SectionButtons from 'components/shared/sectionButtons';
import Video from 'components/shared/video';
import { extractVideoID, extractVideoType, slugify, ConditionalWrapper, ParseText } from 'utils/ug-utils';

// Media templates use the guideline "section-displaySize-mediaColPercentage-textColPercentage"

// For example:
// primary-sm-img-25-txt-75: a small image in the primary section taking up 25% of the container / the text takes up 75% of the container
// no-section-default-img-100-txt-none: an image taking up 100% of the container with no section or display size selected and no text

const mediaTemplates = {
    'primary-sm-img-25-txt-75': { mediaCol: "col-md-4", textCol: "col-md-8", textColPadding: "pt-md-0", wrapperCol: "col-md-6 row mt-4" },
    'primary-sm-img-25-txt-none': { mediaCol: "col-md-4" },
    'primary-sm-vid-100-txt-100': { wrapperCol: "col-md-4 border-0 card mb-4" },
    'primary-md-img-50-txt-50': { mediaCol: "col-md-6", textCol: "col-md-6", textColPadding: "pt-md-0", wrapperCol: "col-md-6 row mt-4" },
    'primary-md-img-50-txt-none': { mediaCol: "col-md-6" },
    'primary-md-vid-100-txt-100': { wrapperCol: "col-md-6 border-0 card mb-4"},
    'primary-lg-img-100-txt-100': { textCol: "h-100", wrapperCol: "col-md-6 mb-4 border-0 card" },
    'primary-lg-img-100-txt-none': { },
    'primary-lg-vid-100-txt-100': { textCol: "h-100", wrapperCol: "border-0 card mb-4" },
    'primary-default-img-100-txt-100': { textCol: "h-100", wrapperCol: "col-sm mb-3 border-0 card" },
    'primary-default-img-100-txt-none': { mediaCol: "col-sm mb-3" },
    'primary-default-vid-100-txt-100': { textCol: "h-100", wrapperCol: "col-sm border-0 card mb-4" },
    'secondary-default': { wrapperCol: "border-0 card mb-4" },
    'no-section-sm-img-25-txt-75': { mediaCol: "col-md-3 ps-0", textCol: "col-md-9 h-100", textColPadding: "pt-md-0", wrapperCol: "row my-5" },
    'no-section-md-img-25-txt-75': { mediaCol: "col-md-4 ps-0", textCol: "col-md-8 h-100", textColPadding: "pt-md-0", wrapperCol: "row my-5" },
    'no-section-lg-img-50-txt-50': { mediaCol: "col-md-6 ps-0", textCol: "col-md-6 h-100", textColPadding: "pt-md-0", wrapperCol: "row my-5" },
    'no-section-default-img-50-txt-50': { mediaCol: "col-md-6 ps-0", textCol: "col-md-6 h-100", textColPadding: "pt-md-0", wrapperCol: "row my-5" },
    'no-section-default-img-100-txt-none': { mediaCol: "ps-0", wrapperCol: "row my-5" },
    'no-section-sm-vid-25-txt-75': { mediaCol: "col-md-4 ps-0", textCol: "col-md-8 h-100", textColPadding: "pt-md-0", wrapperCol: "row my-5" },
    'no-section-md-vid-50-txt-50': { mediaCol: "col-md-6 ps-0", textCol: "col-md-6 h-100", textColPadding: "pt-md-0", wrapperCol: "row my-5" },
    'no-section-lg-vid-100-txt-100': { mediaCol: "col-md-12 ps-0", textCol: "col-md-12 h-100", wrapperCol: "row my-5" },
    'no-section-default-vid-50-txt-50': { mediaCol: "col-md-6 ps-0", textCol: "col-md-6 h-100", textColPadding: "pt-md-0", wrapperCol: "row my-5" },
    'no-section-default-vid-100-txt-none': { mediaCol: "ps-0", wrapperCol: "row my-5" },
  }

  
function MediaText (props) {
    
    const region = props.region;

    const mediaTitle = props.data?.field_media_text_title;
    const mediaDescription = props.data?.field_media_text_desc?.processed;
    const mediaBgColor = props.data?.relationships?.field_bg_color?.name;
    const mediaButtons = props.data?.relationships?.field_button_section;
    const mediaRelationships = props.data?.relationships.field_media_text_media?.relationships;

    const imageURL = mediaRelationships?.field_media_image;	
    const imageAlt = props.data?.relationships?.field_media_text_media?.field_media_image?.alt ?? "";
    const mediaSize = props.data?.field_media_image_size;
    const mediaAlignment = props.data?.field_media_alignment ?? 'left';
    const mediaIsDecorative = props.data?.field_media_is_decorative;

    const videoTitle = props.data?.relationships.field_media_text_media?.name;
    const videoTranscript = mediaRelationships?.field_media_file?.publicUrl;
    const videoURL = props.data?.relationships.field_media_text_media?.field_media_oembed_video;
    const videoHeight = props.data?.relationships.field_media_text_media?.field_video_height;
    const videoWidth = props.data?.relationships.field_media_text_media?.field_video_width;
    let videoType;
    let videoID;

    if (videoURL) {
        videoType = extractVideoType(videoURL);
        videoID = (videoType === `youtube` ? extractVideoID(videoURL) : videoURL?.substring(18));
    }
    
    let mediaCol = "col-xs-12";
    let textCol = "col-xs-12";
    let textColBg;
    let textColHeight;
    let textColPadding = "pt-4";
    let wrapperCol;
    let headingClass = "mt-0";
    let headingColor;
    let textOrButtons = mediaDescription || mediaButtons ? true : false;
    let HeadingLevel = (props.data?.field_heading_level ? props.data.field_heading_level : "h3");

    let chosenMediaTemplate;
    
    switch(mediaBgColor) {
        case "Light Blue":
            textColBg = classNames('bg-light');
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

    if (region === "Primary") {
        // For images
        if (imageURL) {
            if (mediaDescription || mediaButtons) {
                switch(mediaSize) {
                    case "small":
                        chosenMediaTemplate = mediaTemplates['primary-sm-img-25-txt-75'];
                    break;
                    case "medium":
                        chosenMediaTemplate = mediaTemplates['primary-md-img-50-txt-50'];
                    break;
                    case "large":
                        chosenMediaTemplate = mediaTemplates['primary-lg-img-100-txt-100'];
                    break;
                    default:
                        chosenMediaTemplate = mediaTemplates['primary-default-img-100-txt-100'];
                    break;
                }
            } else {
                switch(mediaSize) {
                    case "small":
                        chosenMediaTemplate = mediaTemplates['primary-sm-img-25-txt-none'];
                    break;
                    case "medium":
                        chosenMediaTemplate = mediaTemplates['primary-md-img-50-txt-none'];
                    break;
                    case "large":
                        chosenMediaTemplate = mediaTemplates['primary-lg-img-100-txt-none'];
                    break;
                    default:
                        chosenMediaTemplate = mediaTemplates['primary-default-img-100-txt-none'];
                    break;
                }
            }
        // For videos in Primary section, text and/or buttons will always appear underneath
        } else {
            switch(mediaSize) {
                case "small":
                    chosenMediaTemplate = mediaTemplates['primary-sm-vid-100-txt-100'];
                break;
                case "medium":
                    chosenMediaTemplate = mediaTemplates['primary-md-vid-100-txt-100'];
                break;
                case "large":
                    chosenMediaTemplate = mediaTemplates['primary-lg-vid-100-txt-100'];
                break;
                default:
                    chosenMediaTemplate = mediaTemplates['primary-default-vid-100-txt-100'];
                break;
            }
        }
    // Everything in the Secondary column is stacked
    } else if (region === "Secondary") {
        chosenMediaTemplate = mediaTemplates['secondary-default'];
    // Region is null, widget not in section
    } else {
        wrapperCol = classNames(textColBg);
        if (imageURL) {
            if (mediaDescription || mediaButtons) {
                switch(mediaSize) {
                    case "small":
                        chosenMediaTemplate = mediaTemplates['no-section-sm-img-25-txt-75'];
                    break;
                    case "medium":
                        chosenMediaTemplate = mediaTemplates['no-section-md-img-25-txt-75'];
                    break;
                    case "large":
                        chosenMediaTemplate = mediaTemplates['no-section-lg-img-50-txt-50'];
                    break;
                    default:
                        chosenMediaTemplate = mediaTemplates['no-section-default-img-50-txt-50'];
                    break;
                }                
            } else {
                chosenMediaTemplate = mediaTemplates['no-section-default-img-100-txt-none'];
            }
        } else {
            if (mediaDescription || mediaButtons) {
                switch(mediaSize) {
                    case "small":
                        chosenMediaTemplate = mediaTemplates['no-section-sm-vid-25-txt-75'];
                    break;
                    case "medium":
                        chosenMediaTemplate = mediaTemplates['no-section-md-vid-50-txt-50'];
                    break;
                    case "large":
                        chosenMediaTemplate = mediaTemplates['no-section-lg-vid-100-txt-100'];
                    break;
                    default:
                        chosenMediaTemplate = mediaTemplates['no-section-default-vid-50-txt-50'];
                    break;
                }
            } else {
                chosenMediaTemplate = mediaTemplates['no-section-default-vid-100-txt-none'];
            }
        }
    }

    headingClass = classNames(headingClass, chosenMediaTemplate.headingClass, headingColor);
    mediaCol = classNames(mediaCol, chosenMediaTemplate.mediaCol);
    textColPadding = textColBg ? "p-4" : classNames(textColPadding, chosenMediaTemplate.textColPadding);
    textCol = classNames(textCol, chosenMediaTemplate.textCol, textColBg, textColHeight, textColPadding, "text-break");
    wrapperCol = mediaAlignment !== "left" ? classNames(wrapperCol, chosenMediaTemplate.wrapperCol, "flex-row-reverse") : classNames(wrapperCol,chosenMediaTemplate.wrapperCol);

    return (
    <ConditionalWrapper condition={wrapperCol} wrapper={children => <section data-title="media-text-widget" className={wrapperCol}>{children}</section>}>
        <div data-title="media" className={wrapperCol ? mediaCol : classNames(mediaCol, "mt-3 mb-5")}>
            {videoURL &&
            <Video videoID={videoID}
                videoTitle={videoTitle}
                videoTranscript={videoTranscript}
                videoType={videoType}
                videoURL={videoURL}
                videoHeight={videoHeight}
                videoWidth={videoWidth}
            />}

            {imageURL && <GatsbyImage image={imageURL.gatsbyImage} alt={mediaIsDecorative ? "" : imageAlt} />}
        </div>
        {textOrButtons &&
        <div data-title="media-description" className={textCol}>
            {mediaTitle && <HeadingLevel id={slugify(mediaTitle)} {...(headingClass !== `` ? {className:headingClass} : {})}>{mediaTitle}</HeadingLevel>}
            {mediaDescription && <div {...(textColBg === `bg-dark` ? {className:`text-light`} : {})}><ParseText textContent={mediaDescription} /></div>}
            {mediaButtons && <SectionButtons key={props.data.relationships.field_button_section.drupal_id} data={props.data.relationships.field_button_section} />}
        </div>}
    </ConditionalWrapper>
    );
}

MediaText.propTypes = {
    data: PropTypes.object,
    region: PropTypes.string,
}
MediaText.defaultProps = {
    data: null,
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
        gatsbyImage(width: 1000, placeholder: BLURRED, layout: FULL_WIDTH, formats: [AUTO, WEBP])
      }
    }
  }

  fragment MediaTextParagraphFragment on paragraph__media_text {
    drupal_id
    field_media_image_size
    field_media_alignment
    field_media_text_title
    field_media_is_decorative
    field_heading_level
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
