import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"
// import { FaCircle } from 'react-icons/fa';
// import styled from "styled-components"

// const Circle = styled.i`
//   color: ${props => (props.colour ?? "#000000")};
// `
const colourOptions = [ 
  "var(--uog-blue)", 
  "var(--uog-red)",
  "#000"
];

const render = ({ image, stations, campuses }) => (
    <Row>
        <Col md={9}>
            <GatsbyImage image={getImage(image.src)} alt={image.alt} />
        </Col>
        <Col md={3}>
            <h3 className="h5 mt-0">{stations.section_title}</h3>
            <ol className="lh-1">
                {stations.names.map((name, index) => 
                    <li key={`station-${index}`}>{name}</li>
                )}
            </ol>
            <h3 className="h5">{campuses.section_title}</h3>
            <ul className="list-unstyled">
                {campuses.names.map((name, index) => 
                    <li key={`campus-${index}`}>
                        {/* <Circle class="fa-solid fa-circle ml-3" colour={colourOptions[index]} aria-hidden="true"> </Circle> */}
                        {/* <FaCircle /> */}
                        {name}
                    </li>
                )}
            </ul>
        </Col>
    </Row>
)

const query = graphql`
  query {
    economicImpactYaml(id: {eq: "economic_impact_provincial_map"}) {
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
        stations {
            section_title
            names
        }
        campuses {
            section_title
            names
        }
    }
  }
`

export default function EconImpactProvincialImpactMap () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}