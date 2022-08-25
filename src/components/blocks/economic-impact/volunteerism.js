import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Row, Col } from "react-bootstrap"
import styled from "styled-components"

const NewsHeading = styled.h4`
  color: #000;
  font-size: 1.8rem;
`

const render = ({ title, body, news, image }) => (
    <Container className="page-container mt-5">
        <Row className="site-content">
          <h2 id="volunteerism">{title}</h2>
          <Col lg={6} className="mb-5">
              {body.map((paragraph, index) => <p key={`volunteerism-text-${index}`}>{paragraph}</p>)}
              <h3>{news.heading}</h3>
              {news.articles.map(({ title, lead, url }, index) => 
                <div key={`volunteerism-news-${index}`}>
                    <NewsHeading>{title}</NewsHeading>
                    <p>{lead}</p>
                    <a href={url} className="btn btn-info">Read Full Article<span className="visually-hidden">: {title}</span></a>
                </div>
                )}
          </Col>
          <Col lg={6}>
              <figure>
                <GatsbyImage image={getImage(image.src)} alt={image.alt} />
                <figcaption>{image.caption}</figcaption>
            </figure>
          </Col>
        </Row>
    </Container>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_volunteerism"}) {
      id
      title
      body
      news {
          heading
          articles {
              title
              lead
              url
          }
      }
      image {
        src {
          childImageSharp {
            gatsbyImageData
          }
        }
        alt
        caption
      }
    }
  }
`

export default function EconImpactVolunteerism () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}