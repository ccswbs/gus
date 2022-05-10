import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container } from "react-bootstrap"
import Statistic from "components/shared/statistic"

const yaml = require('js-yaml');

const colourOptions = [
    {background: "var(--black)", colour: "#FFFFFF"},
    {background: "var(--uog-red)", colour: "#FFFFFF"},
    {background: "var(--uog-yellow)", colour: "#000000"},
  ];

const render = ({ field_yaml_map, relationships }) => {
  const yamlMap = yaml.load(field_yaml_map);
  // let yamlImage = fetchYamlImage("./images/grce/economic-impact/humber-building.jpg");

  console.log(yamlMap);
  console.log(relationships);
  // console.log(yamlImage);
  // console.log(getImage("/static/f28ef9269c5a3c8a9a11ee2a580232c1/johnston-hall-building.jpg"));
  
  return (
    <Container>
        <h3 className="h4">{yamlMap.title}</h3>
        <Statistic className="row mb-5 g-4">
            {yamlMap.stats.map(({value, type, image, link}, index) =>
              <div key={`community-stat-campuses-${index}`} className="col-lg">
                  <Statistic.SolidCard  
                      background={colourOptions[index].background} 
                      colour={colourOptions[index].colour}
                      className="pt-4 pb-0 px-0 h-100 card border-0" >
                      <Statistic.Value><strong>{value}</strong></Statistic.Value>
                      {link ? 
                        <Statistic.Type className="mb-4 px-5"><a href={link.url} className="fs-3 text-white">{type}</a></Statistic.Type>
                        : <Statistic.Type className="mb-4 px-5">{type}</Statistic.Type>
                      }
                      <GatsbyImage image={getImage(image.src)} alt={image.alt} className="h-100 card-img-bottom" />
                  </Statistic.SolidCard>
                </div>
            )}
        </Statistic>
    </Container>
  )
}

const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "test_economic_impact_community_campus_stats"}) {
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
                  gatsbyImageData
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
    economicImpactYaml(yamlId: {eq: "economic_impact_community_campus_stats"}) {
      id
      title
      stats {
          value
          type
          image {
              src{
                childImageSharp {
                    gatsbyImageData
                }
              }
              alt
          }
          link {
            url
          }
      }
    }
  }
`

export default function GrceImpactCommunityImpactCampusStats () {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}