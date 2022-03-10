import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from 'components/layout';
import Seo from 'components/seo';
import Breadcrumbs from 'components/shared/breadcrumbs';
import EconImpactBanner from 'components/blocks/economic-impact/banner';
import EconImpactPresMessage from 'components/blocks/economic-impact/pres-message'
import EconImpactNationalImpact from 'components/blocks/economic-impact/national-impact';
import EconImpactProvImpact from 'components/blocks/economic-impact/provincial-impact';
import EconImpactCommunityImpact from 'components/blocks/economic-impact/community-impact';
import EconImpactHumanImpact from 'components/blocks/economic-impact/human-impact';
import "@fontsource/roboto"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/100-italic.css"
import "@fontsource/roboto/400-italic.css"

const render = (title) => (
    <Layout>
        <Helmet />
        <Seo title={title} />
        <EconImpactBanner />
        <Breadcrumbs />
        <EconImpactPresMessage />
        <EconImpactNationalImpact />
        <EconImpactProvImpact />
        <EconImpactCommunityImpact />
        <EconImpactHumanImpact />
    </Layout>
)

const EconomicImpactPage = () => (
    render("Economic Impact Report")
)

export default EconomicImpactPage;


