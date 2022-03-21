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
import EconImpactSustainability from 'components/blocks/economic-impact/sustainability';
import EconImpactResearch from 'components/blocks/economic-impact/research';
import EconImpactVolunteerism from 'components/blocks/economic-impact/volunteerism';

const render = (title) => (
    <Layout menuName="grce-main">
        <Helmet />
        <Seo title={title} />
        <EconImpactBanner />
        <Breadcrumbs menuName="grce-main" nodeTitle="Economic Impact Report" />
        <EconImpactPresMessage />
        <EconImpactNationalImpact />
        <EconImpactProvImpact />
        <EconImpactCommunityImpact />
        <EconImpactHumanImpact />
        <EconImpactSustainability />
        <EconImpactResearch />
        <EconImpactVolunteerism />
    </Layout>
)

const EconomicImpactPage = () => (
    render("Economic Impact Report")
)

export default EconomicImpactPage;

