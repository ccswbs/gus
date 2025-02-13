import React, { lazy, Suspense } from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Seo from 'components/seo';
import { Helmet } from 'react-helmet';
import BreadcrumbsStatic from '../components/shared/breadcrumbsStatic';
import Hero from 'components/shared/hero'; 
import Widget from '../components/shared/widget';
import WidgetContainer from 'components/shared/widgetContainer';
import CustomFooter from 'components/shared/customFooter';

const Breadcrumbs = lazy(() => import('components/shared/breadcrumbs'));

const Page = ({nodeID, pageTitle, seoData, heroData, widgets, footer, menuData, domains}) => {
  const hasHeroContent = heroData.imageData?.length > 0 || heroData.heroWidgets?.length > 0;

  return (
    <Layout menuName={menuData.menuName}>
        <Helmet bodyAttributes={{ class: 'basic-page' }} />
        <Seo title={pageTitle} description={seoData.description} img={seoData.img} imgAlt={seoData.imgAlt} />

        { /**** Header and Title ****/ }
        { hasHeroContent &&
          <div className={heroData.imageData?.length > 0 ? "" : "no-thumb"} id="rotator">
              <Hero imgData={heroData.imageData} />
              {heroData.heroWidgets && (
                <div className="container hero-widgets-container d-flex flex-column justify-content-center align-items-center">
                  {heroData.heroWidgets.map((widget, index) => (
                    <Widget data={widget} key={index} />
                  ))}
                </div>
              )}
              <div className="container ft-container">
                  <h1 className="fancy-title">{pageTitle}</h1>
              </div>
          </div>
        }
        
        <Suspense fallback={<BreadcrumbsStatic pageTitle={pageTitle} />}>
          <Breadcrumbs menuName={menuData.menuName} nodeID={nodeID} nodeTitle={pageTitle} domains={domains} />
        </Suspense>
        
        { /**** Widgets content ****/}
        <div id="main-column">
            
          { /**** No banner ****/}  
          { !hasHeroContent && 
              <div className="container page-container">
                <div className="row site-content">
                    <div className="content-area">
                        <h1>{pageTitle}</h1>
                    </div>
                </div>
              </div>
          }

          <WidgetContainer data={widgets} />

        </div>

        { /**** Custom Footer content ****/}
        {footer?.length > 0 &&
        <CustomFooter footerData={footer[0]} />}
    </Layout>
  );
}

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
        field_primary_navigation {
          field_menu_machine_name
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
      enabled
      menu_name
    }
}
`

const PageTemplate = ({data}) => {
    const seoData = {
        title: data.nodePage.title,
        description: data.nodePage.field_metatags?.og_description,
        img: data.images.edges[0]?.node?.relationships?.field_media_image?.publicUrl,
        imgAlt: data.images.edges[0]?.node?.field_media_image?.alt
    };

    const heroData = {
        imageData: data.images.edges,
        heroWidgets: data.nodePage.relationships?.field_hero_widgets ? [data.nodePage.relationships.field_hero_widgets] : null
    };

    const footerData = data.footer.edges;

    const primaryNav = data.nodePage.relationships?.field_primary_navigation?.field_menu_machine_name;
    const menuName = primaryNav === "no-menu" ? null : primaryNav ?? data.menu?.menu_name;

    const menuData = {
        menuName: menuName
    };

    const domainData = data.nodePage.field_domain_access;

    return (
        <Page 
            nodeID={data.nodePage.drupal_internal__nid}
            pageTitle={data.nodePage.title}
            seoData={seoData}
            heroData={heroData}
            widgets={data.nodePage.relationships.field_widgets}
            footer={footerData}
            menuData={menuData}
            domains={domainData}
        />
    );
}

export default PageTemplate;
