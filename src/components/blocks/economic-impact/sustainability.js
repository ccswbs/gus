import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Video from "components/shared/video"
import styled from "styled-components"

const NewsHeading = styled.h4`
  color: #000;
  font-size: 1.8rem;
`

const render = ({ title, body, examples, news, video }) => (
    <Container className="page-container mt-5">
        <Row className="site-content">
          <Row className="content-area">
            <h2 id="sustainability">{title}</h2>
            <Col lg={6} className="mb-5 pe-4">
                {body.map((paragraph, index) => <p key={`sustainability-text-${index}`}>{paragraph}</p>)}
                <h3>Examples:</h3>
                <ul>
                  {examples.map(({title, url}, index) => <li key={`sustainability-example-${index}`}><a href={url}>{title}</a></li>)}
                </ul>

                <h3>{news.heading}</h3>
                {news.articles.map(({ title, lead, url }, index) => 
                  <div key={`sustainability-news-${index}`}>
                      <NewsHeading>{title}</NewsHeading>
                      <p>{lead}</p>
                      <a href={url} className="btn btn-info">Read Full Article<span className="visually-hidden">: {title}</span></a>
                  </div>
                  )}
            </Col>
            
            <Col lg={6} className="mb-5">
              <Video videoID={video.id} videoType={video.type} playerID={`player-${video.id}`} videoTranscript={video.transcript} videoCC={video.captions} />
            </Col>
          </Row>
        </Row>
    </Container>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_sustainability"}) {
      id
      title
      body
      examples {
        title
        url
      }
      news {
          heading
          articles {
              title
              lead
              url
          }
      }
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

export default function EconImpactSustainability () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}