import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Video from "components/shared/video"

const render = ({ title, body, videos }) => (
    <div className="d-flex flex-column bg-light">
        <div className="full-width-container">
            <Container className="page-container my-5">
                <Row className="site-content">
                <h2 id="research-training-innovation">{title}</h2>
                <Col lg={12} className="mb-3">
                  {body.map((paragraph, index) => <p key={`research-text-${index}`}>{paragraph}</p>)}
                </Col>
                {videos.map((video, index) => 
                    <Col lg={6} key={`research-videos-${index}`} className="mb-5">
                        <Video videoID={video.id} videoType={video.type} playerID={`player-${video.id}`} videoTranscript={video.transcript} videoCC={video.captions} />
                    </Col>
                )}
                </Row>
            </Container>
        </div>
    </div>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_research"}) {
      id
      title
      body
      videos {
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

export default function EconImpactResearch () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}