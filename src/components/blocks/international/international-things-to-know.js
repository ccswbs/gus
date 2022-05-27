import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const yaml = require('js-yaml');
const MediaCardBody = styled.div`
  background: #edf2f5;
  padding: 2rem;
`
const MediaTitle = styled.h3`
  color: #000000;
`

const render = ({ field_yaml_map, relationships }) => {
    let yamlMap;
    let yamlFiles = {};
    relationships.field_yaml_files.forEach(file => {
      yamlFiles[file.path.alias] = file.relationships.field_media_image.gatsbyImage;
    });

    try {
      yamlMap = yaml.load(field_yaml_map);
    } catch (e) {
      console.log(e);
      return null;
    }
    
    return (
        <section>
            <h2>{yamlMap.title}</h2>
            <Row className="row-cols-1 row-cols-md-3 g-4">
                {yamlMap.cards.map(({title, text, image, links}, index) => 
                    <Col key={`international-explore-${index}`}>
                        <div className="card h-100 border-0">
                            <GatsbyImage image={getImage(yamlFiles[image.src])} alt={image.alt} className="card-img-bottom" />
                            <MediaCardBody className="card-body">
                                <MediaTitle>{title}</MediaTitle>
                                <p>{text}</p>
                                <div className="d-grid d-md-block gap-2">
                                    {links.map(({title, url}, index) => 
                                        <a key={`international-explore-btns-${index}`} href ={url} className="btn btn-info me-md-3 no-icon p-4 text-start">{title}</a>
                                    )}
                                </div>
                            </MediaCardBody>
                        </div>
                    </Col>
                )}
            </Row>
        </section>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_explore_things_to_know"}) {
      id
      field_yaml_id
      field_yaml_map
      relationships {
        field_yaml_files {
          id
          name
          relationships {
            field_media_image {
              gatsbyImage(
                width: 1000
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
          path {
            alias
          }
        }
      }
    }
  }
`

export default function InternationalExploreThingsToKnow() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}