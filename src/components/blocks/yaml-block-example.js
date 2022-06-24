import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PageContainer from 'components/shared/pageContainer'
import ModalVideo from "components/shared/modalVideo"

const yaml = require('js-yaml');

const render = ({ field_yaml_map, relationships }) => {
    let yamlMap;
    let yamlFiles = {};

    relationships.field_yaml_files.forEach(file => {
      if( file.path?.alias) {
        yamlFiles[file.path.alias] = file;
      }
    });

    try {
      yamlMap = yaml.load(field_yaml_map);
    } catch (e) {
      console.log(e);
      return null;
    }

    const fileURL = yamlFiles[yamlMap.file.alias]?.relationships.field_media_file.localFile.publicURL;
    const imageURL = yamlFiles[yamlMap.image.src]?.relationships.field_media_image.localFile;
    const video = yamlFiles[yamlMap.video.alias];

    return (
      <PageContainer.SiteContent>
        <PageContainer.ContentArea>
          <h2>{yamlMap.title}</h2>
          <p>yamlMap.body</p>
          {yamlMap.body_paragraphs.map((paragraph, index) => <p key={`example-text-${index}`}>{paragraph}</p>)}
          <div dangerouslySetInnerHTML={{__html: yamlMap.body_html}} />
          {fileURL && <p><a href={fileURL}>{yamlMap.file.title}</a></p>}
          {imageURL && <GatsbyImage image={getImage(imageURL)} alt={yamlMap.image.alt} />}
          <p>{video.name}</p>
          {video && <ModalVideo 
            id={video.id} 
            src={video.field_media_oembed_video} 
            title={video.name} 
            transcript={video.relationships.field_media_file?.localFile.publicURL} 
            modalButton = {
              <button type="button" className="btn btn-primary my-4">
                  <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.name}</span>
              </button>
            }
          />}
        </PageContainer.ContentArea>
      </PageContainer.SiteContent>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "yaml_block_example"}) {
      id
      field_yaml_id
      field_yaml_map
      relationships {
        field_yaml_files {
          __typename
          ... on media__image {
            id
            name
            relationships {
              field_media_image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
                  }
                }
              }
            }
            path {
              alias
            }
          }
          ... on media__file {
            id
            drupal_id
            name
            relationships {
              field_media_file {
                localFile {
                  publicURL
                }
              }
            }
            path {
              alias
            }
          }
          ... on media__remote_video {
            id
            drupal_id
            name
            field_media_oembed_video
            field_video_height
            field_video_width
            relationships {
              field_media_file {
                localFile {
                  publicURL
                }
              }
              field_video_cc {
                localFile {
                  publicURL
                }
              }
            }
            path {
              alias
            }
          }
        }
      }
    }
  }
`

export default function YamlBlockExample() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}