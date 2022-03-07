import React from "react"
import { Container, Row } from "react-bootstrap";
import EconImpactProvincialImpactIntro from "components/blocks/economic-impact/provincial-impact-intro"
import EconImpactProvincialImpactMap from "components/blocks/economic-impact/provincial-impact-map"
import EconImpactProvincialImpactStats from "components/blocks/economic-impact/provincial-impact-stats"
import EconImpactProvincialImpactQuote from "components/blocks/economic-impact/provincial-impact-quote"

const EconImpactProvincialImpact = () => (
    <Container className="page-container">
        <Row className="site-content">
            <EconImpactProvincialImpactIntro />
            <EconImpactProvincialImpactMap />
            <EconImpactProvincialImpactStats />
        </Row>
        <EconImpactProvincialImpactQuote />
    </Container>
)

export default EconImpactProvincialImpact