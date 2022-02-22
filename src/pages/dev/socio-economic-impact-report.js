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
import SocioEconomicTotalImpact from 'components/blocks/socioeconomic/total-impact';
// import SocioEconomicProvImpact from 'components/blocks/socioeconomic/prov-impact';
// import SocioEconomicCommunityImpact from 'components/blocks/socioeconomic/community-impact';
// import SocioEconomicHumanImpact from 'components/blocks/socioeconomic/human-impact';

const render = (title) => (
    <Layout>
        <Helmet />
        <Seo title={title} />
        
        <SocioEconomicBanner />
        <Breadcrumbs />

        <Container className="page-container">
            <Row id="content" className="row-with-vspace site-content">
                <Row>
                    <Col md={9} className="content-area">
                        <SocioEconomicIntro />
                    </Col>
                    <Col md={3} className="mt-5">
                        <SocioEconomicAnchors />
                    </Col>
                </Row>
                <SocioEconomicIntroStats />
            </Row>
        </Container>
        <Container fluid={true} className="page-container">
            <div className="site-content">
                <SocioEconomicTotalImpact />
                {/* <SocioEconomicProvImpact />
                <SocioEconomicCommunityImpact />
                <SocioEconomicHumanImpact /> */}
            </div>
        </Container>
    </Layout>
)

// export const query = graphql`
//   query SocioEconomicImpactQuery {
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

const SocioEconomicImpactPage = () => (
    render("Socio-Economic Impact Report")
)

// const SocioEconomicImpactPage = ({data}) => (
//     <SocioEconomicImpactPageRender nodeID={data.nodePage.drupal_internal__nid}
//           pageTitle={data.nodePage.title} 
//           ogDescription={data.nodePage.field_metatags?.og_description}
//           ogImage={data.images.edges[0]?.node.relationships.field_media_image.localFile.publicURL}
//           ogImageAlt={data.images.edges[0]?.node?.field_media_image.alt}
//           imageData={data.images.edges}
//           widgets={data.nodePage.relationships.field_widgets}
//           menuName={data.menu?.menu_name || `main`}
//     />
// )

export default SocioEconomicImpactPage;


