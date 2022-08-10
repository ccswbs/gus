import React from 'react';
import Layout from 'components/layout';
import { Helmet } from 'react-helmet';
import Seo from 'components/seo';
import Hero from 'components/shared/hero';
import Breadcrumbs from 'components/shared/breadcrumbs';
import CallToAction from 'components/shared/callToAction';
import Careers from 'components/shared/careers';
import Courses from 'components/shared/courses';
import CustomFooter from 'components/shared/customFooter';
import Degrees from 'components/shared/degrees';
import Employers from 'components/shared/employers';
import HeroVideo from 'components/shared/heroVideo';
import NewsGrid from 'components/shared/newsGrid';
import Stats from 'components/shared/stats'
import Testimonials from 'components/shared/testimonial';
import Variants from 'components/shared/variants';
import Widget from 'components/shared/widget';
import { sortLastModifiedDates } from 'utils/ug-utils';
import { graphql } from 'gatsby';

function renderProgramOverview(overview) {
    if (overview) {
        return <><h2>Program Overview</h2><div dangerouslySetInnerHTML={{ __html: overview }} /></>
    }
    return null;
}

function renderProgramStats(degreesData, variantData, statsData) {

    if (statsData?.length>0 || degreesData?.length>0) {
        return (
        <div className="full-width-container stats-bg">
            <div className="container page-container">
                <section className="row row-with-vspace site-content">
                    <div className="col-md-12 content-area">
                        <h2 className="visually-hidden">Program Statistics</h2>
                        <dl className="d-flex flex-wrap flex-fill justify-content-center">
                            <Degrees degreesData={degreesData} />
                            {CountProgramVariants(variantData)}
                            <Stats statsData={statsData} />
                        </dl>
                    </div>
                </section>
            </div>
        </div>)
    }
    return null;
}

function CountProgramVariants(variantData) {

    let majors = [];
    let minors = [];
    let certificates = [];
    let assocDiplomas = [];

    if (variantData?.length > 0) {
        variantData.forEach((edge) => {
            if ((edge.__typename === "paragraph__program_variants") && (edge.relationships.field_variant_type !== null)) {
                switch(edge.relationships.field_variant_type.name) {
                    case "Associate Diplomas":
                        assocDiplomas.push(edge.relationships.field_variant_type.name);
                    break;
                    case "Certificates":
                        certificates.push(edge.relationships.field_variant_type.name);
                    break;
                    case "Minors":
                        minors.push(edge.relationships.field_variant_type.name);
                    break;
                    default:
                        majors.push(edge.relationships.field_variant_type.name);
                }
            }
        });
        return <>
            {majors?.length>0 && <>
                <div className="uog-card">
                    <dt><span className="fa-icon-colour"><i className="fa-solid fa-file-certificate" aria-hidden="true">  </i></span> {majors.length}</dt>
                    <dd>Specialized Majors</dd>
                </div>
            </>}
            {minors?.length>0 && <>
                <div className="uog-card">
                    <dt><span className="fa-icon-colour"><i className="fa-solid fa-file-certificate" aria-hidden="true">  </i></span> {minors.length}</dt>
                    <dd>Specialized Minors</dd>
                </div>
            </>}
            {assocDiplomas?.length>0 && <>
                <div className="uog-card">
                    <dt><span className="fa-icon-colour"><i className="fa-solid fa-file-certificate" aria-hidden="true">  </i></span> {assocDiplomas.length}</dt>
                    <dd>Associate Diplomas</dd>
                </div>
            </>}
            {certificates?.length>0 && <>
                <div className="uog-card">
                    <dt><span className="fa-icon-colour"><i className="fa-solid fa-file-certificate" aria-hidden="true">  </i></span> {certificates.length}</dt>
                    <dd>Optional Certificates</dd>
                </div>
            </>}
        </>
    }
    return null;
}

function renderProgramInfoAccordion  (courseData, courseNotes, variantDataHeading, variantData, careerData, employerData) {

    // accordion - Courses Item
    const programCourseItem = () => {
        if (courseNotes || courseData?.length>0) {
          return (
            <div className="accordion-item">
              <h3 className="accordion-header" id="selectedCourses-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#selectedCourses-courses" aria-expanded="false" aria-controls="selectedCourses-courses">
                  Selected Courses
                </button>
              </h3>
              <div id="selectedCourses-courses" className="accordion-collapse collapse" aria-labelledby="selectedCourses-heading">
                <div className="accordion-body">
                {<Courses courseData={courseData} courseNotes={courseNotes} headingLevel="h4" />}
                </div>
              </div>
            </div>
          )
        }
        return null;
    }

    // accordion - Variants Item
    const programVariantItem = () => {
        if(variantDataHeading) {
          return (
            <div className="accordion-item">
              <h3 className="accordion-header" id="programVariants-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#programVariants-variants" aria-expanded="false" aria-controls="programVariants-variants">
                  {variantDataHeading}
                </button>
              </h3>
              <div id="programVariants-variants" className="accordion-collapse collapse" aria-labelledby="programVariants-heading">
                <div className="accordion-body">
                  {<Variants variantData={variantData} />}
                </div>
              </div>
            </div>
          )
        }
        return null;
    }

    // accordion - Careers Item
    const programCareersItem = () => {
        if (careerData?.length>0) {
          return (
            <div className="accordion-item">
              <h3 className="accordion-header" id="programCareers-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#programCareers-careers" aria-expanded="false" aria-controls="programCareers-careers">
                  Careers
                </button>
              </h3>
              <div id="programCareers-careers" className="accordion-collapse collapse" aria-labelledby="programCareers-heading">
                <div className="accordion-body">
                <Careers careerData={careerData} numColumns={3}/>
                </div>
              </div>
            </div>
          )
        }
        return null;
    }

    // accordion - Employers Item
    const programEmployersItem = () => {
        if (employerData?.length > 0) {
          return (
            <div className="accordion-item">
              <h3 className="accordion-header" id="programEmployers-heading">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#programEmployers-employers" aria-expanded="false" aria-controls="programEmployers-employers">
                  Employers
                </button>
              </h3>
              <div id="programEmployers-employers" className="accordion-collapse collapse" aria-labelledby="programEmployers-heading">
                <div className="accordion-body">
                <Employers employerData={employerData} />
                </div>
              </div>
            </div>
          )
        }
        return null;
    }
    if (courseNotes || courseData?.length>0 || variantDataHeading || careerData?.length>0 ||employerData?.length > 0) {
      return (
            <div className="container page-container">
              <section className="row row-with-vspace site-content">
                  <div className="col-md-12 content-area">
                  <h2>Program Information</h2>
                    <div className="accordion" id="ProgramPageAccordion">
                      {programCourseItem()}
                      {programVariantItem()}
                      {programCareersItem()}
                      {programEmployersItem()}
                    </div>
                  </div>
              </section>
            </div>
        )
    }
    return null;
}

function retrieveLastModifiedDates (content) {
    let dates = [];
    if (content?.length > 0) {
        content.forEach((edge) => {
            dates.push(edge.node.changed);
        })
    }
    return dates;
}

function prepareVariantHeading (variantData) {
    let labels = [];

    // prepare variant data labels
    variantData.forEach((edge) => {
        if ((edge.__typename === "paragraph__program_variants") && (edge.relationships.field_variant_type !== null)) {
            labels.push(edge.relationships.field_variant_type.name);
        }
    });

    const uniqueLabelSet = new Set(labels);
    const uniqueLabels = [...uniqueLabelSet];
    let variantHeading = "";

    for (let i=0; i<uniqueLabels.length; i++) {
        if (i > 0) {
            if (uniqueLabels.length > 2) {
                variantHeading += ",";
            }
            variantHeading += " ";
            if (i === (uniqueLabels.length - 1)) {
                variantHeading += "and ";
            }
        }
        variantHeading += uniqueLabels[i];
    }

  return variantHeading;
}

const ProgramPage = ({data, location}) => {

    let progData = data.programs.edges[0]?.node;
    let callToActionData = data.ctas?.edges;
    let careerData = data.careers?.edges;
    let courseData = progData.relationships?.field_courses;
    let degreesData = progData.relationships?.field_degrees;
    let domains = progData?.field_domain_access;
    let employerData = data.employers?.edges;
    let footerData = data.footer?.edges;
    let imageData =  data.images?.edges;
    let imageTaggedData = data.imagesTagged?.edges;
    let newsData = data.news?.edges;
    let statsData = progData.relationships?.field_program_statistics;
    let testimonialData = data.testimonials?.edges;
    let variantData = progData.relationships?.field_program_variants;
    let variantDataHeading = prepareVariantHeading(variantData);
    let videoData = data.videos.edges[0]?.node;

    const heroImage = (imageData?.length>0 ? imageData : (imageTaggedData?.length>0 ? imageTaggedData : null));

    // Open Graph metatags
    const ogDescription = progData.field_metatags?.og_description;
    const ogImage = heroImage && heroImage[0]?.node.relationships.field_media_image.localFile.publicURL;
    const ogImageAlt = heroImage && heroImage[0]?.node.field_media_image.alt;

    // set program details
    const nodeID = progData.drupal_internal__nid;
    const title = progData.title;
    const acronym = (progData.relationships.field_program_acronym?.name);
    const overview = progData.field_program_overview?.processed;

    // `field_hero_widgets` only allows a single widget (at the moment), and
    // Drupal doesn't return an array, so force it into an array.
    const heroWidgets = (progData.relationships?.field_hero_widgets ? [progData.relationships?.field_hero_widgets] : null);

    const widgets = progData.relationships?.field_widgets;
    const courseNotes = progData.field_course_notes?.processed;

    // set last modified date
    let allModifiedDates = sortLastModifiedDates(
        [progData.changed, retrieveLastModifiedDates(callToActionData), retrieveLastModifiedDates(testimonialData)]
        );
    let lastModified = allModifiedDates[allModifiedDates.length - 1];

    return (
      <Layout date={lastModified} menuName="main">
        <Helmet bodyAttributes={{ class: "program" }} />
        <Seo
          title={title}
          description={ogDescription}
          img={ogImage}
          imgAlt={ogImageAlt}
        />

        {/**** Header and Title ****/}
        <div
          className={
            !heroImage?.length > 0 && !videoData?.length > 0 ? "no-thumb" : null
          }
          id="rotator"
        >
          {videoData ? (
            <HeroVideo
              videoURL={videoData.field_media_oembed_video}
              videoWidth={videoData.field_video_width}
              videoHeight={videoData.field_video_height}
              videoTranscript={
                videoData.relationships.field_media_file?.localFile.publicURL
              }
            />
          ) : (
            <>
              <Hero imgData={heroImage} />
              {/**** Hero Widgets content ****/}
              {heroWidgets && (
                <div className="container hero-widgets-container d-flex flex-column justify-content-center align-items-center">
                  {heroWidgets.map((widget, index) => (
                    <Widget widget={widget} key={index} />
                  ))}
                </div>
              )}
            </>
          )}
          <div className="container ft-container">
            <h1 className="fancy-title">{title}</h1>
          </div>
        </div>

        <Breadcrumbs nodeID={nodeID} nodeTitle={title} domains={domains} />

        { /**** Program Overview ****/ }
        {overview && 
          <div className="container page-container">
            <div className="row site-content">        
              <section className="content-area">
                    {renderProgramOverview(overview)}
              </section>
            </div>
          </div>
        }

        { /**** Widgets content ****/} 
        {widgets?.map((widget, index) => <Widget widget={widget} key={index} />)} 

        { /**** Program Stats ****/ }
        {renderProgramStats(degreesData, variantData, statsData)}

        {/**** Program Information Accordion ****/}
        {renderProgramInfoAccordion(
          courseData,
          courseNotes,
          variantDataHeading,
          variantData,
          careerData,
          employerData
        )}

        {/**** Testimonials ****/}
        {testimonialData && (
          <Testimonials
            testimonialData={testimonialData}
            programAcronym={acronym}
            headingLevel="h3"
          />
        )}

        {/*** News ****/}
        {newsData && (
          <NewsGrid
            newsData={newsData}
            heading="Program News"
            headingLevel="h2"
          />
        )}

        {/**** Call to Actions ****/}
        {callToActionData.length !== 0 && (
          <div className="container page-container apply-footer">
            <section className="row row-with-vspace site-content">
              <div className="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 content-area">
                <h3 className="text-dark text-center">
                  Are you ready to Improve Life?
                </h3>
                {callToActionData.map((cta, index) => (
                  <CallToAction
                    key={index}
                    href={cta.node.field_call_to_action_link.uri}
                    goalEventCategory={
                      cta?.node.relationships.field_call_to_action_goal?.name
                    }
                    goalEventAction={
                      cta?.node.relationships.field_call_to_action_goal
                        ?.field_goal_action
                    }
                  >
                    {cta.node.field_call_to_action_link.title}
                  </CallToAction>
                ))}
              </div>
            </section>
          </div>
        )}
        {footerData?.length > 0 && <CustomFooter footerData={footerData[0]} />}
      </Layout>
    )
}

export default ProgramPage;

export const query = graphql`query ($id: String) {
  programs: allNodeProgram(
    filter: {relationships: {field_program_acronym: {id: {eq: $id}}}}
  ) {
    edges {
      node {
        changed
        drupal_id
        drupal_internal__nid
        title
        field_domain_access {
          drupal_internal__target_id
        }
        field_metatags {
          og_description
        }
        field_program_overview {
          processed
        }
        field_course_notes {
          processed
        }
        relationships {
          field_prog_image {
            field_media_image {
              alt
            }
            relationships {
              field_media_image {
                localFile {
                  publicURL
                  childImageSharp {
                      gatsbyImageData(
                  transformOptions: {cropFocus: CENTER}
                  placeholder: BLURRED
                  aspectRatio: 3
                )
                   }
                }
              }
            }
          }
          field_program_acronym {
            name
            id
          }
          field_courses {
            changed
            field_credits
            field_level
            field_code
            title
            field_course_url {
              uri
            }
          }
          field_degrees {
            drupal_id
            name
            field_degree_acronym
          }
          field_specializations {
            name
          }
          field_program_statistics {
            drupal_id
            field_stat_range
            field_stat_value
            field_stat_value_end
            field_font_awesome_icon
            relationships {
              field_stat_type {
                name
              }
            }
          }
          field_tags {
            name
          }
          field_program_variants {
            __typename
            ... on paragraph__general_text {
              drupal_id
              field_general_text {
                processed
              }
            }
            ... on paragraph__program_variants {
              drupal_id
              field_variant_title
              field_variant_link {
                uri
              }
              field_variant_info {
                processed
              }
              relationships {
                field_variant_type {
                  name
                }
              }
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
    }
  }
  ctas: allNodeCallToAction(filter: {fields: {tags: {in: [$id]}}}) {
    edges {
      node {
        changed
        field_call_to_action_link {
          title
          uri
        }
        relationships {
          field_call_to_action_goal {
            name
            field_goal_action
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
    }
  }
  careers: allNodeCareer(
    sort: {fields: [title], order: ASC}
    filter: {fields: {tags: {in: [$id]}}}
  ) {
    edges {
      node {
        title
        drupal_id
        changed
        body {
          processed
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
        }
      }
    }
  }
  employers: allNodeEmployer(
    sort: {fields: title}
    filter: {fields: {tags: {in: [$id]}}}
  ) {
    edges {
      node {
        drupal_id
        field_employer_summary {
          processed
        }
        title
        field_image {
          alt
        }
        field_link {
          uri
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
          field_image {
            localFile {
              url
              childImageSharp {
                gatsbyImageData(
                  width: 400
                  height: 400
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
  footer: allNodeCustomFooter(filter: {fields: {tags: {in: [$id]}}}) {
    edges {
      node {
        drupal_id
        body {
          processed
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
          field_footer_logo {
            field_media_image {
              alt
            }
            relationships {
              field_media_image {
                localFile {
                  publicURL
                  childImageSharp {
                    gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
                  }
                }
              }
            }
          }
          field_widgets {
            __typename
            ... on paragraph__lead_paragraph {
              id
              field_lead_paratext {
                value
              }
            }
            ... on paragraph__links_widget {
              drupal_id
              field_link_items_title
              field_link_items_description
              relationships {
                field_link_items {
                  drupal_id
                  field_link_description
                  field_link_url {
                    title
                    uri
                  }
                  relationships {
                    field_link_image {
                      relationships {
                        field_media_image {
                          localFile {
                            publicURL
                            childImageSharp {
                              resize(width: 400, height: 300, cropFocus: CENTER) {
                                src
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on paragraph__section {
              drupal_id
              field_section_title
              field_section_classes
              relationships {
                field_section_content {
                  __typename
                  ... on paragraph__links_widget {
                    drupal_id
                    field_link_items_title
                    field_link_items_description
                    relationships {
                      field_link_items {
                        drupal_id
                        field_link_description
                        field_link_url {
                          title
                          uri
                        }
                        relationships {
                          field_link_image {
                            relationships {
                              field_media_image {
                                localFile {
                                  publicURL
                                  childImageSharp {
                                    resize(width: 400, height: 300, cropFocus: CENTER) {
                                      src
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  ... on paragraph__media_text {
                    field_media_text_title
                    field_media_text_desc {
                      processed
                    }
                    relationships {
                      field_media_text_media {
                        ... on media__image {
                          name
                          field_media_image {
                            alt
                          }
                          relationships {
                            field_media_image {
                              localFile {
                                publicURL
                                childImageSharp {
                                  gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
                                }
                              }
                            }
                          }
                        }
                        ... on media__remote_video {
                          drupal_id
                          name
                          field_media_oembed_video
                          relationships {
                            field_media_file {
                              localFile {
                                publicURL
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on paragraph__media_text {
              field_media_text_title
              field_media_text_desc {
                processed
              }
              relationships {
                field_media_text_media {
                  ... on media__image {
                    name
                    field_media_image {
                      alt
                    }
                    relationships {
                      field_media_image {
                        localFile {
                          publicURL
                          childImageSharp {
                            gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
                          }
                        }
                      }
                    }
                  }
                  ... on media__remote_video {
                    drupal_id
                    name
                    field_media_oembed_video
                    relationships {
                      field_media_file {
                        localFile {
                          publicURL
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  images: allMediaImage(filter: {relationships: {node__program: {elemMatch: {relationships: {field_program_acronym: {id: {eq: $id}}}} }}}) {
    edges {
      node {
        drupal_id
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
              publicURL
              childImageSharp {
                 gatsbyImageData(
                  transformOptions: {cropFocus: CENTER}
                  placeholder: BLURRED
                  aspectRatio: 3
                )
              }
              extension
            }
          }
        }
      }
    }
  }
  imagesTagged: allMediaImage(filter: {fields: {tags: {in: [$id]}}}) {
    edges {
      node {
        drupal_id
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
              publicURL
              childImageSharp {
                 gatsbyImageData(
                  transformOptions: {cropFocus: CENTER}
                  placeholder: BLURRED
                  aspectRatio: 3
                )
              }
              extension
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
  videos: allMediaRemoteVideo(
      filter: {relationships: {node__program: {elemMatch: {relationships: {field_program_acronym: {id: {eq: $id}}}}}}}
    ) {
      edges {
        node {
          drupal_id
          field_media_oembed_video
          field_video_width
          field_video_height
          name
          relationships {
            field_media_file {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }
  news: allNodeArticle(
    limit: 4
    sort: {fields: created}
    filter: {fields: {tags: {in: [$id]}}}
  ) {
    edges {
      node {
        title
        drupal_id
        changed
        created
        fields {
          alias {
            value
          }
        }
        body {
          processed
        }
        relationships {
          field_hero_image {
            field_media_image {
              alt
            }
            relationships {
              field_media_image {
                localFile {
                  url
                  childImageSharp {
                    gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
                  }
                }
              }
            }
          }
          field_news_category {
            drupal_id
            id
            name
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
    }
  }
  testimonials: allNodeTestimonial(
    sort: {fields: created}
    filter: {fields: {tags: {in: [$id]}}}
  ) {
    edges {
      node {
        changed
        drupal_id
        body {
          processed
        }
        title
        field_testimonial_person_desc
        field_home_profile {
          title
          uri
        }
        relationships {
          field_hero_image {
            field_media_image {
              alt
            }
            relationships {
              field_media_image {
                localFile {
                  url
                  childImageSharp {
                    gatsbyImageData(
                      width: 400
                      height: 400
                      placeholder: BLURRED
                      layout: CONSTRAINED
                    )
                  }
                }
              }
            }
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
    }
  }
}
`
