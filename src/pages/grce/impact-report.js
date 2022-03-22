import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
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

const render = ({ title, description, image, menu }) => (
    <Layout menuName="grce-main">
        <Helmet />
        <Seo title={title} description={description} img={getSrc(image.src)} imgAlt={image.alt} />
        <EconImpactBanner />
        <Breadcrumbs menuName={menu} nodeTitle={title} />
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

const query = graphql`
  query {
    economicImpactYaml(yamlId: {eq: "economic_impact_seo"}) {
      id
      title
      description
      image {
        src {
          childImageSharp {
            gatsbyImageData
          }
        }
        alt
      }
      menu
    }
  }
`

export default function EconomicImpactPage () {
    return <StaticQuery query={query} render={({economicImpactYaml}) => render(economicImpactYaml)} />
  }