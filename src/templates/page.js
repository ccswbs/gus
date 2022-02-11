import React from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import Seo from '../components/seo';
import Hero from '../components/hero'; 
import Breadcrumbs from '../components/breadcrumbs';
import Widgets from '../components/widgets';
import { graphql } from 'gatsby';
import { contentExists } from '../utils/ug-utils';

const Page = ({data}) => {

    const pageData = data.pages.edges[0].node;
    const nodeID = pageData.drupal_internal__nid;
    const title = pageData.title;
    const imageData = data.images.edges;
    const ogDescription = (contentExists(pageData.field_metatags) ? pageData.field_metatags.og_description : null);
    const ogImage = (contentExists(imageData) ? imageData[0].node.relationships.field_media_image.localFile.publicURL : null);
    const ogImageAlt = (contentExists(imageData) ? imageData[0].node.field_media_image.alt : null);
    
    const menuName = (contentExists(data.menus.edges) ? data.menus.edges[0].node.menu_name : `main`);

    /****
    WidgetData contains all widgets (paragraphs) that are available - when adding a new widget, validate that the correct items are selected using a comparison to __typename.  
    This will be paragraph__WIDGETNAME - you can pass the widgetsData variable through to your component. 
    ****/
    
    const widgetsData = (contentExists(pageData.relationships.field_widgets) ? pageData.relationships.field_widgets : null);

    return (
        <Layout menuName={menuName}>
            <Helmet bodyAttributes={{
                class: 'basic-page'
            }}
            />
            
            <Seo title={title} description={ogDescription} img={ogImage} imgAlt={ogImageAlt} />
            
            { /**** Header and Title ****/ }
            <div className={!contentExists(imageData) && "no-thumb"} id="rotator">
                <Hero imgData={imageData} />
                <div className="container ft-container">
                    <h1 className="fancy-title">{title}</h1>
                </div>
            </div>
            
            <Breadcrumbs menuName={menuName} nodeID={nodeID} nodeTitle={title} />
            
            { /**** Body content ****/ }
            <div className="container page-container">
                { /**** Widgets content ****/}      
                <div id="content" className="row row-with-vspace site-content">
                    <section className="col-md-12 content-area">
                        <Widgets pageData={widgetsData} />
                    </section>
                </div>
            </div>
        </Layout>
    )
    
}

// const PageTemplate = ({data}) => (
//     <Page id={data.nodePage.id}
//           pageTitle={data.nodePage.title}
//           siteTitle={data.site.siteMetadata.title}
//           image={data.nodePage.relationships.field_hero_image?.relationships.field_media_image.localFile}
//           widgets={data.nodePage.relationships.field_widgets}
//           updated={data.nodePage.changed}
//           source={`${data.sitePlugin.pluginOptions.baseUrl}.${data.nodePage.fields.slug}`}
//     ></Page>
//   )

//   export default PageTemplate

export default Page;

export const query = graphql`query ($id: String, $nid: String) {
  pages: allNodePage(filter: {id: {eq: $id}}) {
    edges {
      node {
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
            __typename
            ... on paragraph__call_to_action {
                ...CallToActionParagraphFragment
            }
            ... on paragraph__general_text {
                ...GeneralTextParagraphFragment
            }
            ... on paragraph__accordion_section {
                ...AccordionSectionParagraphFragment
            }
            ... on paragraph__lead_paragraph {
                ...LeadParagraphFragment
            }
            ... on paragraph__section_tabs {
                ...SectionTabsParagraphFragment
            }
            ... on paragraph__links_widget {
                ...LinksWidgetParagraphFragment
            }
            ... on paragraph__section {
                ...SectionParagraphFragment
            }
            ... on paragraph__media_text {
              ...MediaTextParagraphFragment
            }
            ... on paragraph__stats_widget {
                ...StatsWidgetParagraphFragment
            }
          }
          field_tags {
            __typename
            ... on TaxonomyInterface {
              name
            }
          }
        }
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
  menus: allMenuLinkContentMenuLinkContent(filter: {link: {uri: {eq: $nid}}}) {
    edges {
      node {
        link {
          uri
          url
        }
        drupal_parent_menu_item
        drupal_id
        menu_name
      }
    }
  }

}
`

