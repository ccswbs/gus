import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from "react-bootstrap"
import Layout from 'components/layout';
import Seo from 'components/seo';
import Breadcrumbs from 'components/shared/breadcrumbs';
import EconImpactAnchors from 'components/blocks/economic-impact/anchors';
import EconImpactBanner from 'components/blocks/economic-impact/banner';
import EconImpactIntro from 'components/blocks/economic-impact/intro';
import EconImpactIntroStats from 'components/blocks/economic-impact/intro-stats';
import EconImpactNationalImpact from 'components/blocks/economic-impact/national-impact';
// import EconImpactProvImpact from 'components/blocks/economic-impact/prov-impact';
// import EconImpactCommunityImpact from 'components/blocks/economic-impact/community-impact';
// import EconImpactHumanImpact from 'components/blocks/economic-impact/human-impact';

const render = (title) => (
    <Layout>
        <Helmet />
        <Seo title={title} />
        
        <EconImpactBanner />
        <Breadcrumbs />

        <Container className="page-container">
            <Row id="content" className="row-with-vspace site-content">
                <Col md={9} className="pe-4">
                    <EconImpactIntro />
                </Col>
                <Col md={3} className="mt-5">
                    <EconImpactAnchors />
                </Col>
                <EconImpactIntroStats />
            </Row>
        </Container>
        
        <EconImpactNationalImpact />
            {/* <EconImpactProvImpact />
            <EconImpactCommunityImpact />
            <EconImpactHumanImpact /> */}
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


