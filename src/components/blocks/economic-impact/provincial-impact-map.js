import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"
import { FaStar } from 'react-icons/fa';
import styled from "styled-components"

const ListItem = styled.li`
    line-height: 1.35 !important;
`
const UnstyledListItem = styled(ListItem)`
    &:before {
        content: none !important;
    }
`
const IconStyle = styled.span`
  color: ${props => (props.colour ?? "#000000")};
`

const render = ({ image, stations, campuses }) => (
    <Row className="gy-5 mb-5">
        <Col md={9}>
            <GatsbyImage image={getImage(image.src)} alt={image.alt} />
        </Col>
        <Col md={3}>
            <h3 className="h5 mt-0">{stations.section_title}</h3>
            <ul className="lh-1 mb-5">
                {stations.names.map((name, index) => 
                    <ListItem key={`station-${index}`}>{name}</ListItem>
                )}
            </ul>
            <p className="fs-5">{stations.footnote}</p>
            <h3 className="h5">{campuses.section_title}</h3>
            <ul className="list-unstyled ps-2">
                {campuses.locations.map(({name, colour}, index) => 
                    <UnstyledListItem key={`campus-${index}`}>
                        <IconStyle colour={colour}>
                            <FaStar className="pe-2 display-6" aria-hidden="true" />
                        </IconStyle>
                        {name}
                    </UnstyledListItem>
                )}
            </ul>
        </Col>
    </Row>
)

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_provincial_map"}) {
        id
        title
        image {
            src {
                gatsbyImage
            }
            alt
        }
        stations {
            section_title
            names
            footnote
        }
        campuses {
            section_title
            locations {
                name
                colour
            }
        }
    }
  }
`

export default function EconImpactProvincialImpactMap () {
  return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
}