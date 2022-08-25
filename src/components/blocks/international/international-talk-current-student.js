import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from 'styled-components'

const yaml = require('js-yaml');
const Background = styled(PageContainer.FullWidth)`
  background: ${props => (props.background ?? "#FFFFFF")};
`

const render = ({ field_yaml_map, relationships }, background ) => {
    let yamlMap;
    let yamlFiles = {};
    relationships.field_yaml_files.forEach(file => {
      yamlFiles[file.path.alias] = file.relationships.field_media_image;
    });

    try {
      yamlMap = yaml.load(field_yaml_map);
    } catch (e) {
      console.log(e);
      return null;
    }
    
    return (
      <Background background={background}>
        <PageContainer.SiteContent>
          <PageContainer.ContentArea>
            <Row className="my-sm-5">
              <Col md={7}>
                <GatsbyImage image={getImage(yamlFiles[yamlMap.image.src])} alt={yamlMap.image.alt} />
              </Col>
              <Col md={5} className="mt-5 ps-5">
                <h3>{yamlMap.title}</h3>
                <p>{yamlMap.body}</p>
                <p><a href={yamlMap.link.url}>{yamlMap.link.title}</a></p>
              </Col>
            </Row>
          </PageContainer.ContentArea>
        </PageContainer.SiteContent>
      </Background>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_talk_current_student"}) {
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

export default function InternationalTalkCurrentStudent(props) {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock, props.background)} />
}