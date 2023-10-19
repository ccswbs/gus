import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer'
import styled from "styled-components"

const yaml = require('js-yaml');

const Background = styled(PageContainer.FullWidth)`
  background: #F4F7FA;
`
const HeadingIcon = styled.i`
  color: ${props => (props.iconColour ?? "#000000")};
`

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "admission_supplementary_block"}) {
      id
      field_yaml_id
      field_yaml_map
    }
  }
`
  
export default function AdmissionGrid() {
  const data = useStaticQuery(query);
  const field_yaml_map = data.blockContentYamlBlock.field_yaml_map;
  let yamlMap;

  try {
    yamlMap = yaml.load(field_yaml_map);
  } catch (e) {
    console.log(e);
    return null;
  }
  
  return (
    <Background>
      <PageContainer.SiteContent>
        <PageContainer.ContentArea>
          {yamlMap.title && <h2 className="mt-4">{yamlMap.title}</h2>}
          <Row className="row-cols-1 row-cols-md-3 g-4 mt-0">
              {yamlMap.content.map(({title, body_html, icon, icon_color}, index) => 
                  <Col key={`admission-supplementary-grid-${index}`} className="pe-4">
                    <h3 className="h4 text-dark mt-0 d-flex align-items-start"><HeadingIcon aria-hidden={true} className={`${icon} pe-3`} iconColour={icon_color} /> {title}</h3>
                    <div dangerouslySetInnerHTML={{__html: body_html}}></div>
                  </Col>
              )}
          </Row>
        </PageContainer.ContentArea>
      </PageContainer.SiteContent>
    </Background>
  )
  
}