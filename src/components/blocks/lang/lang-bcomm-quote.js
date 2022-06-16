import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"
import Overlay from "components/shared/overlay"
import styled from "styled-components"

const yaml = require('js-yaml');

const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #000;
`
const QuoteShadow = styled.div`
  text-shadow: #fff 1px 0 4px;
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

  return(
    <div className="d-flex flex-column bg-light mb-4">
      <Overlay.GatsbyImage gatsbyImageData={getImage(yamlFiles[yamlMap.background_image.src])} alt={yamlMap.background_image.alt}>
        <Container className="page-container">
          <Row className="h-100 w-100 p-5 justify-content-center align-items-center">
            <Col sm={9} className="ps-5">
              <QuoteShadow>
                <QuoteText className="display-4 my-5">
                    <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                        <em>{yamlMap.quote}</em>
                    <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
                </QuoteText>
                <p className="author text-dark fs-2"><strong>{yamlMap.source.name}</strong>
                <br /><em>{yamlMap.source.desc}</em></p>
              </QuoteShadow>
            </Col>
          </Row>
        </Container>
      </Overlay.GatsbyImage>
    </div>
  )
}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "lang_bcomm_quote"}) {
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
                  gatsbyImageData(width: 1400, height: 190, placeholder: BLURRED, layout: CONSTRAINED)
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

export default function LangBcommQuote () {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}