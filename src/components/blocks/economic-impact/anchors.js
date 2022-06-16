import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ title, anchors }) => (
    <>
        <h4>{title}</h4>
        <div id="menubox1">
          <ul className="menu list-group">
            {anchors.map(({title, url}, index) =>
                <li key={`anchor-${title}-${index}`} className="list-group-item"><a href={url}>{title}</a></li>
            )}
          </ul>
        </div>
    </>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_anchors"}) {
      id
      title
      anchors {
        title
        url 
      }
    }
  }
`

export default function EconImpactAnchors () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}