import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import EconImpactAnchors from 'components/blocks/economic-impact/anchors';
import EconImpactIntro from 'components/blocks/economic-impact/intro';
import EconImpactIntroStats from 'components/blocks/economic-impact/intro-stats';

const EconImpactPresMessage = () => (
    <Container className="page-container">
        <Row className="row-with-vspace site-content">
            <Col md={9} className="pe-4">
                <EconImpactIntro />
            </Col>
            <Col md={3} className="my-5">
                <EconImpactAnchors />
            </Col>
            <EconImpactIntroStats />
        </Row>
    </Container>
)

export default EconImpactPresMessage