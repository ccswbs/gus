import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import Overlay from "components/shared/overlay"
import styled from 'styled-components'

const yaml = require('js-yaml');

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

const render = ({ field_yaml_map, relationships }) => {
  let yamlMap;
  let yamlFiles = {};
  relationships.field_yaml_files.forEach(file => {
      yamlFiles[file.path.alias] = file.relationships.field_media_image.localFile;
  });
  
  try {
      yamlMap = yaml.load(field_yaml_map);
  } catch (e) {
      console.log(e);
      return null;
  }
  
  return (
    <div className="d-flex flex-column bg-dark">
    <Overlay.GatsbyImage gatsbyImageData={getImage(yamlFiles[yamlMap.images.background.src])} alt={yamlMap.images.background.alt}>
        <Container className="page-container">
            <Row className="site-content bg-transparent h-100 text-white pb-0">
                <Col lg={6} className="fs-3 mb-4">
                    <SectionTitle>{yamlMap.title}</SectionTitle>
                    {yamlMap.body.map((paragraph, index) => <p key={`banky-text-${index}`}>{paragraph}</p>)}
                </Col>
                <Col lg={6} className="d-flex justify-content-center">
                    <GatsbyImage image={getImage(yamlFiles[yamlMap.images.foreground.src])} alt={yamlMap.images.foreground.alt} className="align-self-end img-fluid" />
                </Col>
            </Row>
        </Container>
    </Overlay.GatsbyImage>

    <Testimonial className="d-flex justify-content-center">
        <Row className="w-100 p-5 text-center">
            <QuoteText className="display-3 text-white">
                <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                    <em>{yamlMap.testimonial.quote}</em>
                <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
            </QuoteText>
            <QuoteSource className="fs-3">~ {yamlMap.testimonial.source.name}</QuoteSource>
        </Row>
    </Testimonial>
</div>
  )}

  const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "lang_bcomm_feature_experience"}) {
        id
        field_yaml_id
        field_yaml_map
        relationships {
          field_yaml_files {
            id
            name
            relationships {
              field_media_image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                        placeholder: BLURRED, 
                        layout: CONSTRAINED
                    )
                  }
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
  `

export default function LangBcommFeatureExperience() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}