import PropTypes from 'prop-types';
import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Video from 'components/shared/video';
import SectionButtons from 'components/shared/sectionButtons';
import { contentExists } from 'utils/ug-utils';

function MediaText (props) {

    const mediaTitle = (contentExists(props.widgetData.field_media_text_title) ? props.widgetData.field_media_text_title : ``);
    const mediaDescription = (contentExists(props.widgetData.field_media_text_desc) ? props.widgetData.field_media_text_desc.processed: ``);
    const mediaLinks = props.widgetData.field_media_text_links;	
    const mediaRelationships = (contentExists(props.widgetData.relationships.field_media_text_media) ? props.widgetData.relationships.field_media_text_media.relationships: ``);

    const imageURL = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_image) ? mediaRelationships.field_media_image.localFile : ``);	
    const imageAlt = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_image) ? mediaRelationships.field_media_image.alt : ``);
    const imageSize = (contentExists(imageURL) && contentExists(props.widgetData.field_media_image_size) ? props.widgetData.field_media_image_size : ``);

    const playerID = (contentExists(props.widgetData.relationships.field_media_text_media) ? props.widgetData.relationships.field_media_text_media.drupal_id : ``);
    const videoURL = (contentExists(mediaRelationships) ? props.widgetData.relationships.field_media_text_media.field_media_oembed_video : ``);
    const videoTranscript = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_file) ? mediaRelationships.field_media_file.localFile.publicURL : ``);
    const videoCC = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_video_cc) ? mediaRelationships.field_video_cc.localFile.publicURL : ``);
    const videoType = (videoURL?.includes("youtube") || videoURL?.includes("youtu.be") ? `youtube` : `vimeo`);
    const videoID = (videoType === `youtube` ? videoURL?.substr(videoURL?.length - 11) : videoURL?.substr(18));
    
    let mediaCol;
    let textCol;
    
    if (contentExists(imageSize)) {
        switch(imageSize) {
            case "small":
                mediaCol = "col-md-3";
                textCol = "col-md-9";
            break;
            case "medium":
                mediaCol = "col-md-4";
                textCol = "col-md-8";
            break;
            case "large":
                mediaCol = "col-md-6";
                textCol = "col-md-6";
            break;
            default:
                mediaCol = "col-md-6";
                textCol = "col-md-6";
            break;
        }        
    } else {
        mediaCol = props.colClass;
        textCol = props.colClass;
    }
    
    return <>
        <section className={mediaCol}>
            {contentExists(videoURL) ?
            <Video playerID={playerID} videoType={videoType} videoID={videoID} videoURL={videoURL} videoTranscript={videoTranscript} videoCC={videoCC} />
            : ``}
            {contentExists(imageURL) ? <GatsbyImage image={imageURL.childImageSharp.gatsbyImageData} alt={imageAlt} /> : ``}
        </section>
        <section className={textCol}>
            {contentExists(mediaTitle) ? <h3 {...(contentExists(props.headingClass) ? {className:props.headingClass} : {})}>{mediaTitle}</h3> : ``}
            <div dangerouslySetInnerHTML={{ __html: mediaDescription}} />
            {contentExists(props.widgetData.relationships.field_button_section) === true && <SectionButtons pageData={props.widgetData.relationships.field_button_section} />}
            {contentExists(props.widgetData.relationships.field_button_section) === false && <div>{mediaLinks.map(mediaLink => {
                return ( 
                <React.Fragment>
                    {(mediaLink.uri.includes("http"))? <><a className="btn btn-outline-info" href={mediaLink.url}>{mediaLink.title}</a> </> :
                    <Link to={mediaLink.url} className="btn btn-outline-info" >{mediaLink.title}</Link>}
                </React.Fragment>)                
            })}</div>}
        </section>
    </>;
}

MediaText.propTypes = {
    widgetData: PropTypes.object,
    colClass: PropTypes.string,
    headingClass: PropTypes.string,
}
MediaText.defaultProps = {
    widgetData: null,
    colClass: `col-md-6`,
    headingClass: ``,
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