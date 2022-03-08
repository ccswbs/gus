import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Lead = styled.p`
  color: #000;
`

const render = ({ title, lead, body, author, author_desc, author_pronouns }) => (
    <>
        <h2>{title}</h2>
        <Lead><strong>{lead}</strong></Lead>
        {body.map((paragraph, index) => <p key={`intro-text-${index}`}>{paragraph}</p>)}
        <p className="author mb-5">
            <strong>{author}</strong> {author_pronouns}
            <br /><em>{author_desc}</em>
        </p>
    </>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_intro"}) {
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