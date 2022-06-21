import React from "react"
import { Col } from "react-bootstrap"
import PageContainer from 'components/shared/pageContainer';
import EconImpactAnchors from 'components/blocks/economic-impact/anchors';
import EconImpactIntro from 'components/blocks/economic-impact/intro';
import EconImpactIntroStats from 'components/blocks/economic-impact/intro-stats';

const EconImpactPresMessage = () => (
    <>
        <PageContainer.SiteContent>
            <Col md={9} className="pe-4">
                <EconImpactIntro />
            </Col>
            <Col md={3} className="my-5">
                <EconImpactAnchors />
            </Col>
            <EconImpactIntroStats />
        </PageContainer.SiteContent>
        
    </>
)

export default EconImpactPresMessage