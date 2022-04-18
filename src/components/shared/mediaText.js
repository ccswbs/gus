import PropTypes from 'prop-types';
import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Video from 'components/shared/video';
import SectionButtons from 'components/shared/sectionButtons';
import { ConditionalWrapper } from 'utils/ug-utils';

function MediaText (props) {
    
    const region = props.region;

    const mediaTitle = props.widgetData?.field_media_text_title;
    const mediaDescription = props.widgetData.field_media_text_desc?.processed;
    const mediaLinks = props.widgetData?.field_media_text_links;
    const mediaButtons = props.widgetData.relationships?.field_button_section;
    const mediaRelationships = props.widgetData.relationships.field_media_text_media?.relationships;

    const imageURL = mediaRelationships?.field_media_image?.localFile;	
    const imageAlt = mediaRelationships?.field_media_image?.alt;
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
    let textOrButtons = mediaDescription || mediaButtons || mediaLinks ? true : false;
    let wrapperCol;
    let headingClass;

    if (region === "Primary") {
        if (textOrButtons) {
            switch(mediaSize) {
                case "small":
                    headingClass = "mt-md-0";
                    mediaCol = "col-md-4";
                    textCol = "col-md-8";
                    wrapperCol = "col-md-6 row";
                break;
                case "medium":
                    headingClass = "mt-md-0";
                    mediaCol = "col-md-6";
                    textCol = "col-md-6";
                    wrapperCol = "col-md-6 row";
                break;
                case "large":
                    mediaCol = "col-xs-12";
                    textCol = "col-xs-12";
                    wrapperCol = "col-md-6";
                break;
                default:
                    mediaCol = "col-xs-12";
                    textCol = "col-xs-12";
                    wrapperCol = "col-md-6";
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
                    mediaCol = "col-xs-12";
                break;
            }
        }            
    } else if (region === "Secondary") {
        wrapperCol = "col-xs-12";
        console.log(textOrButtons);
    // region is null, widget not in section 
    } else {
        wrapperCol = "row mt-5";
        if (imageURL) {
            if (textOrButtons) {
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
            if (textOrButtons) {
                wrapperCol = "row";
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
    }        
        
    return (
    <ConditionalWrapper condition={wrapperCol} wrapper={children => <div className={wrapperCol}>{children}</div>}>
        <section className={mediaCol}>
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
        </section>
        {textOrButtons &&
        <section className={textCol}>
            {mediaTitle && <h3 className={headingClass ? headingClass : undefined}>{mediaTitle}</h3>}
            {mediaDescription && <div dangerouslySetInnerHTML={{ __html: mediaDescription}} />}
            {mediaButtons && <SectionButtons pageData={props.widgetData.relationships.field_button_section} />}
            {mediaLinks?.length>0 && <div>{mediaLinks.map(mediaLink => {
                return ( 
                <React.Fragment>
                    {(mediaLink.uri.includes("http"))? <><a className="btn btn-outline-info" href={mediaLink.url}>{mediaLink.title}</a> </> :
                    <Link to={mediaLink.url} className="btn btn-outline-info" >{mediaLink.title}</Link>}
                </React.Fragment>)                
            })}</div>}
        </section>}
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
    field_media_text_links {
      title
      uri
      url
    }
    relationships {
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