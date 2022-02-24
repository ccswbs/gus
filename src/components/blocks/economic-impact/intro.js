import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ title, lead, body, author, author_desc, author_pronouns }) => (
    <>
        <h2>{title}</h2>
        <p><strong>{lead}</strong></p>
        {body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
        <p className="author mb-5">
            <strong>{author}</strong> {author_pronouns}
            <br /><em>{author_desc}</em>
        </p>
    </>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_intro"}) {
      id
      title
      lead
      body
      author
      author_desc
      author_pronouns
    }
  }
`

export default function EconImpactIntro () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}