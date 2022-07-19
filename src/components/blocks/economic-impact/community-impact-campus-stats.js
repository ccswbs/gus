import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Statistic from "components/shared/statistic"

const colourOptions = [
    {background: "var(--black)", colour: "#FFFFFF"},
    {background: "var(--uog-red)", colour: "#FFFFFF"},
    {background: "var(--uog-yellow)", colour: "#000000"},
  ];

const render = ({ title, stats }) => (
  <div className="content-area">
      <h3 className="h4">{title}</h3>
      <Statistic.Grid columns="3" className="mb-5 gap-4">
          {stats.map(({value, type, image, link}, index) =>
            <Statistic.SolidCard  
              key={`community-stat-campuses-${index}`} 
              background={colourOptions[index].background} 
              colour={colourOptions[index].colour}
              className="pt-4 pb-0 px-0 h-100 card border-0" >
              <Statistic.Value><strong>{value}</strong></Statistic.Value>
              {link ? 
                <Statistic.Type className="mb-4 px-5"><a href={link.url} className="fs-3 text-white">{type}</a></Statistic.Type>
                : <Statistic.Type className="mb-4 px-5">{type}</Statistic.Type>
              }
              <dd className="mb-0 h-100"><GatsbyImage image={getImage(image.src)} alt={image.alt} className="h-100 card-img-bottom" /></dd>
            </Statistic.SolidCard>
          )}
      </Statistic.Grid>
  </div>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_community_campus_stats"}) {
      id
      title
      stats {
          value
          type
          image {
              src{
                gatsbyImage(width: 1000)
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
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}