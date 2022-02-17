import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from "react-bootstrap"
import Layout from 'components/layout';
import Seo from 'components/seo';
import Breadcrumbs from 'components/shared/breadcrumbs';
import SocioEconomicAnchors from 'components/blocks/socioeconomic/anchors';
import SocioEconomicBanner from 'components/blocks/socioeconomic/banner';
import SocioEconomicIntro from 'components/blocks/socioeconomic/intro';
import SocioEconomicIntroStats from 'components/blocks/socioeconomic/intro-stats';
// import SocioEconomicTotalImpact from 'components/blocks/socioeconomic/total-impact';
// import SocioEconomicProvImpact from 'components/blocks/socioeconomic/prov-impact';
// import SocioEconomicCommunityImpact from 'components/blocks/socioeconomic/community-impact';
// import SocioEconomicHumanImpact from 'components/blocks/socioeconomic/human-impact';

const render = (title) => (
    <Layout>
        <Helmet bodyAttributes={{ class: 'basic-page' }} />
        <Seo title={title} />
        
        <SocioEconomicBanner />
        <Breadcrumbs />

        <Container className="page-container">
            <Row id="content" className="row-with-vspace site-content">
                <Row>
                    <Col md={9} className="mr-4 content-area">
                        <SocioEconomicIntro />
                    </Col>
                    <Col md={3} className="mt-5">
                        <SocioEconomicAnchors />
                    </Col>
                </Row>
                <SocioEconomicIntroStats />
            </Row>

            <Row>
                
                {/* <SocioEconomicTotalImpact />
                <SocioEconomicProvImpact />
                <SocioEconomicCommunityImpact />
                <SocioEconomicHumanImpact /> */}
            </Row>
        </Container>
    </Layout>
)

const SocioEconomicImpactPage = () => (
    render("Socio-Economic Impact Report")
)

export default SocioEconomicImpactPage;


