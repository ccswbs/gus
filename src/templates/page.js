import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Seo from 'components/seo';
import { Helmet } from 'react-helmet';
import Hero from 'components/shared/hero'; 
import Breadcrumbs from 'components/shared/breadcrumbs';
import Widget from 'components/shared/widget';
import CustomFooter from 'components/shared/customFooter';

const SortWidgets = (widgets) => {
  const sortedWidgets = [];
  let currentContainer = null;
  let containerHolder = [];

  widgets?.forEach((widget) => {
    let newContainer = "container";

    if ( widget?.__typename === "paragraph__yaml_widget" ||
      widget?.__typename === "paragraph__image_overlay" ||
      widget?.__typename === "paragraph__modal_video_widget" ||
      widget?.__typename === "paragraph__story_widget" ||
      widget?.__typename === "paragraph__statistic_widget" ||
      widget?.__typename === "paragraph__testimonial_slider" ) {
        newContainer = "container-fluid";
    }

    if (currentContainer !== newContainer) {
      if (currentContainer !== null) {
        sortedWidgets.push({container: currentContainer, containerHolder: containerHolder.slice()});
        containerHolder = [];
      }
      currentContainer = newContainer;
    }
    containerHolder.push(widget);
  });

  if (containerHolder.length > 0) {
    sortedWidgets.push({container: currentContainer, containerHolder});
  }
  return sortedWidgets;
}

const Page = ({nodeID, pageTitle, ogDescription, ogImage, ogImageAlt, imageData, widgets, heroWidgets, footer, menuName, domains}) => {
  const sortedWidgets = SortWidgets(widgets);
  return (
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

          {sortedWidgets.map((widgetGroup, index) => (
            widgetGroup.container === "container" ?           
              <div className="container page-container" key={index}>
                <div className="row site-content">
                  <div className="content-area">
                    {widgetGroup.containerHolder.map((widget) => <Widget widget={widget} key={widget.drupal_id} />)}
                  </div> 
                </div>
              </div> : 
              <div key={index}>
                {widgetGroup.containerHolder.map((widget) => <Widget widget={widget} key={widget.drupal_id} />)}
              </div>
          ))}

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

const PageTemplate = ({data}) => (
    <Page nodeID={data.nodePage.drupal_internal__nid}
        pageTitle={data.nodePage.title} 
        ogDescription={data.nodePage.field_metatags?.og_description}
        ogImage={data.images.edges[0]?.node.relationships.field_media_image.publicUrl}
        ogImageAlt={data.images.edges[0]?.node?.field_media_image.alt}
        imageData={data.images.edges}
        widgets={data.nodePage.relationships.field_widgets}
        heroWidgets={(data.nodePage.relationships?.field_hero_widgets ? [data.nodePage.relationships?.field_hero_widgets] : null)}
        footer={data.footer.edges}
        menuName={(data.nodePage.relationships?.field_primary_navigation?.field_menu_machine_name === "no-menu")? null: data.nodePage.relationships?.field_primary_navigation?.field_menu_machine_name ?? data.menu?.menu_name}
        domains={data.nodePage.field_domain_access}
    ></Page>
)

export default PageTemplate;
