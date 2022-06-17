import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Col } from "react-bootstrap"
import { OverlayImage, ModalButton, OverlayModal } from "components/shared/overlay"
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
        {sections.map(({title, body_html, video}, index) => 
            <div key={`prov-section-${index}`}>
                <Heading className="mt-0 text-uppercase">{title}</Heading>
                <Section borderColour={colourOptions[index]} className="px-4 mb-5">
                  <div dangerouslySetInnerHTML={{__html: body_html}}></div>
                  { video && 
                    <>
                      <ModalButton id={`modal-${video.id}`} className="btn-outline-info my-4">
                          <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {video.title}</span>
                      </ModalButton>
                      <OverlayModal
                        id={`modal-${video.id}`}
                        videoSrc={video.url}
                        videoTitle={video.title}
                        videoTranscript={video.transcript}
                      />
                      <p>Video supposed to be here</p>
                    </>
                  }
                </Section>
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
    economicImpactYaml(yamlId: {eq: "economic_impact_provincial"}) {
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
  }
`

export default function EconImpactProvincialImpactIntro () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}