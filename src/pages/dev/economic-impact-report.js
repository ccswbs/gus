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
// import EconImpactHumanImpact from 'components/blocks/economic-impact/human-impact';

import "styles/economic-impact/economic-impact.css"

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
        {/* <EconImpactHumanImpact /> */}
    </Layout>
)

// export const query = graphql`
//   query EconomicImpactQuery {
//     nodePage(drupal_internal__nid: {eq: FILL-IN-ID}) {
//         drupal_id
//         drupal_internal__nid
//         title
//         field_metatags {
//             og_description
//         }
//         path {
//             alias
//         }
//         relationships {
//             field_widgets {
//                 ...FieldWidgetsFragment
//             }

//             field_tags {
//                 __typename
//                 ... on TaxonomyInterface {
//                     name
//                 }
//             }
//         }
//     }

//     images: allMediaImage(filter: {relationships: {node__page: {elemMatch: {drupal_internal__nid: {eq: FILL-IN-ID}}}}}) {
//         edges {
//             node {
//                 drupal_id
//                 ...HeroImageFragment
//             }
//         }
//     }

//     menu: menuLinkContentMenuLinkContent(link: {uri: {eq: "FILL-IN-ID"}}) {
//         link {
//             uri
//             url
//         }
//         drupal_parent_menu_item
//         drupal_id
//         menu_name
//     }
// }
// `

const EconomicImpactPage = () => (
    render("Economic Impact Report")
)

// const EconomicImpactPage = ({data}) => (
//     <EconomicImpactPageRender nodeID={data.nodePage.drupal_internal__nid}
//           pageTitle={data.nodePage.title} 
//           ogDescription={data.nodePage.field_metatags?.og_description}
//           ogImage={data.images.edges[0]?.node.relationships.field_media_image.localFile.publicURL}
//           ogImageAlt={data.images.edges[0]?.node?.field_media_image.alt}
//           imageData={data.images.edges}
//           widgets={data.nodePage.relationships.field_widgets}
//           menuName={data.menu?.menu_name || `main`}
//     />
// )

export default EconomicImpactPage;


