import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Col } from "react-bootstrap"
import styled from "styled-components"

const Heading = styled.h3`
  color: #000;
  font-size: 1.8rem;
`
const Section = styled.div`
  border-left: 1rem solid ${props => (props.borderColour ?? "#000000")};
  padding-left: 2rem;
`
const colourOptions = [ 
  "var(--uog-yellow)", 
  "var(--uog-blue)"
];

const render = ({ title, image, sections }) => (   
  <>
    <h2 className="mb-5" id="provincial-impact">{title}</h2>
    <Col lg={7}>
        {sections.map(({title, body_html}, index) => 
            <div key={`prov-section-${index}`}>
                <Heading className="mt-0">{title}</Heading>
                <Section borderColour={colourOptions[index]} className="px-4 mb-5" dangerouslySetInnerHTML={{__html: body_html}}></Section>
            </div>
        )}
    </Col>
    <Col lg={5}>
        <GatsbyImage image={getImage(image.src)} alt={image.alt} />
    </Col>
  </>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_provincial"}) {
        id
        title
        image {
            src {
              childImageSharp {
                gatsbyImageData
              }
            }
            alt
        }
        sections {
            title
            body_html
        }
    }
  }
`

export default function EconImpactProvincialImpactIntro () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}