import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Seo from 'components/seo';
import { Helmet } from 'react-helmet';
import Hero from 'components/shared/hero'; 
import Breadcrumbs from 'components/shared/breadcrumbs';
import Widget from 'components/shared/widget';
import CustomFooter from 'components/shared/customFooter';
import BuildingCapacityNotice from 'components/shared/buildingCapacityNotice';

const Page = ({nodeID, pageAlias, pageTags, pageTitle, ogDescription, ogImage, ogImageAlt, imageData, widgets, heroWidgets, footer, menuName, domains}) => (
    <Layout menuName={menuName}>
        <Helmet bodyAttributes={{ class: 'basic-page' }} />
        <Seo title={pageTitle} description={ogDescription} img={ogImage} imgAlt={ogImageAlt} />
        
        { /**** Header and Title ****/ }
        { (imageData?.length > 0 || heroWidgets?.length > 0) &&
        <div className={imageData?.length > 0 ? "" : "no-thumb"} id="rotator">
            <Hero imgData={imageData} />
            {heroWidgets && (
              <div className="container hero-widgets-container d-flex flex-column justify-content-center align-items-center">
                {heroWidgets.map((widget, index) => (
                  <Widget widget={widget} key={index} />
                ))}
              </div>
            )}
            <div className="container ft-container">
                <h1 className="fancy-title">{pageTitle}</h1>
            </div>
        </div>
        }
        
        <Breadcrumbs menuName={menuName} nodeID={nodeID} nodeTitle={pageTitle} domains={domains} />
        
        { /**** Widgets content ****/}
        <div id="main-column">

        <BuildingCapacityNotice pageTags={pageTags} />
             
          { /**** No banner ****/}  
          { !(imageData?.length > 0 || heroWidgets?.length > 0) && 
              <div className="container page-container">
                <div className="row site-content">
                    <div className="content-area">
                        <h1>{pageTitle}</h1>
                    </div>
                </div>
              </div>
          }

          {widgets?.map((widget) => <Widget widget={widget} key={widget.drupal_id} />)} 
        </div>

        { /**** Custom Footer content ****/}
        {footer?.length > 0 &&
        <CustomFooter footerData={footer[0]} />}
    </Layout>
)

export const query = graphql`
  query ($id: String, $nid: String, $tid: [String]) {
    nodePage(id: {eq: $id}) {
      drupal_id
      drupal_internal__nid
      title
      field_domain_access {
        drupal_internal__target_id
      }
      field_metatags {
        og_description
      }
      path {
        alias
      }
      relationships {
        field_tags {
          __typename
          ... on TaxonomyInterface {
            drupal_id
            id
            name
          }
        }
        field_widgets {
          ...FieldWidgetsFragment
        }
        field_hero_widgets {
          ...FieldWidgetsFragment
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
        pageAlias={data.nodePage.path.alias}
        pageTags={data.nodePage.relationships?.field_tags}
        pageTitle={data.nodePage.title}
        ogDescription={data.nodePage.field_metatags?.og_description}
        ogImage={data.images.edges[0]?.node.relationships.field_media_image.publicUrl}
        ogImageAlt={data.images.edges[0]?.node?.field_media_image.alt}
        imageData={data.images.edges}
        widgets={data.nodePage.relationships.field_widgets}
        heroWidgets={(data.nodePage.relationships?.field_hero_widgets ? [data.nodePage.relationships?.field_hero_widgets] : null)}
        footer={data.footer.edges}
        menuName={data.menu?.menu_name || `main`}
        domains={data.nodePage.field_domain_access}
    ></Page>
)

export default PageTemplate;
