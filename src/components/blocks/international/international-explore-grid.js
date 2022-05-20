import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer'
import styled from "styled-components"

const yaml = require('js-yaml');

const HeadingIcon = styled.i`
  color: ${props => (props.iconColour ?? "#000000")};
`

const render = ({ field_yaml_map }) => {
    let yamlMap;

    try {
      yamlMap = yaml.load(field_yaml_map);
    } catch (e) {
      console.log(e);
      return null;
    }
    
    return (
      <PageContainer.FullWidth className="bg-light">
        <PageContainer.SiteContent>
          <h2>{yamlMap.title}</h2>
          <Row className="row-cols-1 row-cols-md-3 g-4">
              {yamlMap.content.map(({title, body_html, icon, icon_color}, index) => 
                  <Col key={`international-explore-grid-${index}`}>
                    <h3 className="h4 text-dark mt-0"><HeadingIcon className={icon} iconColour={icon_color} /> {title}</h3>
                    <div dangerouslySetInnerHTML={{__html: body_html}}></div>
                  </Col>
              )}
          </Row>
        </PageContainer.SiteContent>
      </PageContainer.FullWidth>
)}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_explore_grid"}) {
      id
      field_yaml_id
      field_yaml_map
    }
  }
`

export default function InternationalExploreGrid() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}