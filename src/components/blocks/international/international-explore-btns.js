import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const yaml = require('js-yaml');

const ListButtonWrapper = styled.div`
  background: #edf2f5;
  padding: 2rem !important;
  &:hover, &:focus {
    background: #d4e2e8;
  }
`
const ListButtons = styled.ul`
  padding-left: 0 !important;
`
const ListButtonLink = styled.a`
  border-bottom: none !important;
  color: #555;
  text-decoration: none;
  &:hover, &:focus {
    color: #555;
  }
`
const ListButtonItem = styled.li`
  &:before {
      content: none !important;
    }
`

const render = ({ field_yaml_map, relationships }) => {
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
    <section>
        <h2>{yamlMap.title}</h2>
        <ListButtons className="row row-cols-1 row-cols-md-4 g-4">
            {yamlMap.links.map(({title, url, icon}, index) =>
              <div className="col">
                <ListButtonWrapper>
                  <ListButtonLink href={url} className="h-100">
                      <ListButtonItem key={`international-explore-btns-${index}`}>
                          <i className={`${icon} display-3 text-dark`} /> {title}
                      </ListButtonItem>
                  </ListButtonLink>
                </ListButtonWrapper>
              </div>
            )}
        </ListButtons>
    </section>
  )

}


const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "international_explore_btns"}) {
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
                formats: [AUTO, WEBP]
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

export default function InternationalExploreButtons() {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}