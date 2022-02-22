import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ id, title, icon, link }) => (
  <>
    <div className="card icon bg-dark text-white">
        <a href={link.url}>
            <div className="card-body">
                <i className={icon} aria-hidden="true"></i>
                <p>{title}</p>
            </div>
        </a>
    </div>
  </>
)

const query = graphql`
  query {
    ugYaml(id: {eq: "ug_factbook"}) {
      id
      title
      link {
        url
      }
    }
  }
`

export default function UGFactbook () {
  return <StaticQuery query={query} render={({ugYaml}) => render(ugYaml)} />
}