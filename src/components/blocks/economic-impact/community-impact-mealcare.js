import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"
import styled from "styled-components"

const SectionTitle = styled.h3`
  font-size: 2.5rem;
  color: #fff;
`

const render = ({ title, body, images }) => (
    <Row className="card border-0">
        {/* <GatsbyImage image={getImage(images.background.src)} alt={images.background.alt} className="card-img" /> */}
        <Row className="bg-dark">
            <Col lg={6} className="px-5">
                <SectionTitle>{title}</SectionTitle>
                {body.map((paragraph, index) => <p className="text-white" key={`mealcare-text-${index}`}>{paragraph}</p>)}
            </Col>
            <Col lg={6} className="d-flex justify-content-center">
                <GatsbyImage image={getImage(images.foreground.src)} alt={images.foreground.alt} className="align-self-end" />
            </Col>
        </Row>
    </Row>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_community_mealcare"}) {
        id
        title
        body
        images {
            foreground {
                src {
                childImageSharp {
                    gatsbyImageData
                }
                }
                alt
            }
            background {
                src {
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                }
                alt
            }
        }
    }
  }
`

export default function EconImpactCommunityImpactMealcare () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}