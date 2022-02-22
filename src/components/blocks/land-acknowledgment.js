import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ title, body }) => (
  <>
    <h2>{title}</h2>
    <p>{body}</p>
  </>
)

const query = graphql`
  query {
    blockYaml(id: {eq: "land_acknowledgment"}) {
      id
      title
      body
    }
  }
`

export default function LandAcknowledgment () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml)} />
}