import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ title, networks }) => (
  <>
    <h4>{title}</h4>
    <div className="social-wrapper">
        <a className="twitter" href={networks.twitter.url}><i className={networks.twitter.icon} aria-hidden="true"></i></a>
        <a className="facebook" href={networks.facebook.url}><i className={networks.facebook.icon} aria-hidden="true"></i></a>
        <a className="instagram" href={networks.instagram.url}><i className={networks.instagram.icon} aria-hidden="true"></i></a>
        <a className="linkedin" href={networks.linkedin.url}><i className={networks.linkedin.icon} aria-hidden="true"></i></a>
        <a className="youtube" href={networks.youtube.url}><i className={networks.youtube.icon} aria-hidden="true"></i></a>
    </div>
  </>
)

const query = graphql`
  query {
    ugYaml(id: {eq: "ug_connect_social"}) {
      id
      title
      networks {
        twitter { title url icon }
        facebook { title url icon }
        instagram { title url icon }
        linkedin { title url icon }
        youtube { title url icon }
      }
    }
  }
`

export default function UGConnectSocial () {
  return <StaticQuery query={query} render={({ugYaml}) => render(ugYaml)} />
}