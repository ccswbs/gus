import React from "react"
import { StaticQuery, graphql } from "gatsby"
import ModalVideo from "components/shared/modalVideo"

const render = ({ title, body_html, video }) => (   
  <>
    <h3 className="mt-0 text-dark text-uppercase">{title}</h3>
    <div className="border-5 border-start px-4 mb-5">
        <div dangerouslySetInnerHTML={{__html: body_html}}></div>
        {video && 
          <ModalVideo 
            id={video.id} 
            src={video.url} 
            title={video.title} 
            transcript={video.transcript} 
            modalButton = {
                <button type="button" className="btn btn-outline-info my-4">
                    <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                </button>
            }
        />}
    </div>
  </>
)

const query = graphql`
  query {
    blockContentYamlBlock(yamlId: {eq: "economic_impact_provincial_onehealth"}) {
      id
      title
      body_html
      video {
        id
        type
        title
        url
        transcript
        captions
      }
    }
  }
`

export default function EconImpactProvincialImpactOnehealth () {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}