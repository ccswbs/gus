import React from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import Seo from '../components/seo';
import Hero from '../components/hero'; 
import Breadcrumbs from '../components/breadcrumbs';
import CustomFooter from '../components/customFooter';
import Widget from '../components/widget';
import { graphql } from 'gatsby';
import { contentExists } from '../utils/ug-utils';

const Page = ({nodeID, pageTitle, ogDescription, ogImage, ogImageAlt, imageData, widgets, footer, menuName}) => (
    <Layout menuName={menuName}>
        <Helmet bodyAttributes={{ class: 'basic-page' }} />
        <Seo title={pageTitle} description={ogDescription} img={ogImage} imgAlt={ogImageAlt} />
        
        { /**** Header and Title ****/ }
        <div className={!contentExists(imageData) && "no-thumb"} id="rotator">
            <Hero imgData={imageData} />
            <div className="container ft-container">
                <h1 className="fancy-title">{pageTitle}</h1>
            </div>
        </div>
        
        <Breadcrumbs menuName={menuName} nodeID={nodeID} nodeTitle={pageTitle} />
        
        { /**** Body content ****/ }
        <div className="container page-container">
            { /**** Widgets content ****/}      
            <div id="content" className="row row-with-vspace site-content">
                <section className="col-md-12 content-area">
                    {widgets.map((widget, index) => <Widget widget={widget} key={index} />)} 
                </section>
            </div>
        </div>
        {contentExists(footer) && footer.length !== 0 &&
        <CustomFooter footerData={footer[0]} />}
    </Layout>
)

export const query = graphql`
  query ($id: String, $nid: String, $tid: [String]) {
    nodePage(id: {eq: $id}) {
      drupal_id
      drupal_internal__nid
      title
      field_metatags {
        og_description
      }
      path {
        alias
      }
      relationships {
        field_widgets {
          ...FieldWidgetsFragment
        }
        field_tags {
          __typename
          ... on TaxonomyInterface {
            drupal_id
            id
            name
          }
        }
      }
    }

    footer: allNodeCustomFooter (filter: {fields: {tags: {in: $tid}}}){
      edges {
        node {
          ...CustomFooterFragment
        }
      }
    }

    images: allMediaImage(filter: {relationships: {node__page: {elemMatch: {id: {eq: $id}}}}}) {
      edges {
        node {
          drupal_id
          ...HeroImageFragment
        }
      }
    }

    menu: menuLinkContentMenuLinkContent(link: {uri: {eq: $nid}}) {
      link {
        uri
        url
      }
      drupal_parent_menu_item
      drupal_id
      menu_name
    }
}
`

const PageTemplate = ({data}) => (
    <Page nodeID={data.nodePage.drupal_internal__nid}
        pageTitle={data.nodePage.title} 
        ogDescription={data.nodePage.field_metatags?.og_description}
        ogImage={data.images.edges[0]?.node.relationships.field_media_image.localFile.publicURL}
        ogImageAlt={data.images.edges[0]?.node?.field_media_image.alt}
        imageData={data.images.edges}
        widgets={data.nodePage.relationships.field_widgets}
        footer={data.footer.edges}
        menuName={data.menu?.menu_name || `main`}
    ></Page>
)

export default PageTemplate;
