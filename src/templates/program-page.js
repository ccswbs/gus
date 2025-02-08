import React, { lazy, Suspense } from "react"
import Layout from "components/layout"
import { Helmet } from "react-helmet"
import Seo from "components/seo"
import BreadcrumbsStatic from '../components/shared/breadcrumbsStatic';
import Hero from "components/shared/hero"
import ModalVideoStatic from "components/shared/modalVideoStatic"
import Widget from "components/shared/widget"
import WidgetContainer from "components/shared/widgetContainer"
import { ParseText } from "utils/ug-utils"
import { graphql, Script } from "gatsby"

const BlockWidget = lazy(() => import("components/shared/blockWidget"));
const Breadcrumbs = lazy(() => import("components/shared/breadcrumbs"));
const CallToAction = lazy(() => import("components/shared/callToAction"));
const CustomFooter = lazy(() => import("components/shared/customFooter"));
const Employers = lazy(() => import("components/shared/employers"));
const HeroVideo = lazy(() => import("components/shared/heroVideo"));
const Testimonials = lazy(() => import("components/shared/testimonial"));
const Variants = lazy(() => import("components/shared/variants"));

const slateFormIDs = {
  "BASc": {id:"78834d6b-07a8-4b3f-95b8-fac032e9be73"},
  "BA": {id: "7f450ae7-c251-488a-a220-71e1545d6755"},
  "BAS": {id: "b6214efd-4c37-4a4a-bf20-0aa313439ec2"},
  "BAG": {id: "77ab0213-494f-40bc-bea0-02f2db4c8bab"},
  "BBRM": {id: "d6c14a8e-a69c-4970-8a5f-e01dc4872dbc"},
  "BComm": {id: "42684f4f-078e-4c53-ae02-86e014274a0c"},
  "BComp": {id: "e1d37493-9b4e-4bdb-b86d-60feed5be8fd"},
  "BCAHW": {id: "3c760ac4-9cde-4a98-bc26-d77e1a6709be"},
  "BEng": {id: "21c3ee6d-104c-45bb-bb01-53e464d1834a"},
  "BOH": {id: "46185678-374d-4dea-805a-32d27b9a5c09"},
  "BSc": {id: "8170d0fc-d8f2-4ee4-84e2-5b4446a9c7fb"},
  "BScAg": {id: "2bf40bb7-b95f-421e-9e61-04ab0aee08bd"},
  "BScEnv": {id: "6a16e4f6-192d-4d2c-8006-55dab0ac99a2"},
}

function renderSlateForm(acronym) {
  if(slateFormIDs[acronym]){
    const slateURL = "https://apply.uoguelph.ca/register/?id=";
    const id = slateFormIDs[acronym].id;

    return(
      <div>
        <h2 className="mt-0" id="subscribe">Sign Up to Learn More</h2>
        <div className="ug-slate" id={`form_${id}`}>Loading...</div>
        <Script async="async" src={`${slateURL}${id}&amp;output=embed&amp;div=form_${id}`}>{/**/}</Script>
      </div>
    )
  }
}

function renderProgramInfoAccordion(employerData) {
  
  // accordion - Employers Item
  const programEmployersItem = () => {
    if (employerData?.length > 0) {
      return (
        <div className="accordion-item">
          <h3 className="accordion-header" id="programEmployers-heading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#programEmployers-employers"
              aria-expanded="false"
              aria-controls="programEmployers-employers"
            >
              Employers
            </button>
          </h3>
          <div
            id="programEmployers-employers"
            className="accordion-collapse collapse"
            aria-labelledby="programEmployers-heading"
          >
            <div className="accordion-body">
              <Suspense fallback={<div>Loading...</div>}>
                <Employers employerData={employerData} />
              </Suspense>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  
  if (employerData?.length > 0) {
    return (
      <div className="container page-container">
        <section className="row row-with-vspace site-content">
          <div className="col-md-12 content-area">
            <div className="accordion" id="ProgramPageAccordion">
              {programEmployersItem()}
            </div>
          </div>
        </section>
      </div>
    )
  }
  return null
}

function prepareVariantHeading(variantData) {
  let labels = []

  // prepare variant data labels
  variantData.forEach((edge) => {
    if (edge.__typename === "paragraph__program_variants" && edge.relationships.field_variant_type !== null) {
      labels.push(edge.relationships.field_variant_type.name)
    }
  })

  const uniqueLabelSet = new Set(labels)
  const uniqueLabels = [...uniqueLabelSet]
  let variantHeading = ""

  for (let i = 0; i < uniqueLabels.length; i++) {
    if (i > 0) {
      if (uniqueLabels.length > 2) {
        variantHeading += ","
      }
      variantHeading += " "
      if (i === uniqueLabels.length - 1) {
        variantHeading += "and "
      }
    }
    variantHeading += uniqueLabels[i]
  }

  return variantHeading
}

function renderCallToActions(data) {
  if (data.length !== 0){
    return (
      <div className="pt-0 container page-container apply-footer">
        <div className="col-md-8 mx-auto">
          <h3 className="mt-0 text-center text-dark">Get Future Ready</h3>
          <div className="row gx-3 mx-5 mb-5">              
            {(() => {
              let isFirstButton = true;
              let isOnlyButton = data.length === 1;
              return data.map((cta) => {
                const btnClass = isFirstButton ? 'btn-primary' : 'btn-outline-primary';
                isFirstButton = false; // Set the flag to false after the first button

                // Apply mx-auto if there's only one button
                const colClass = isOnlyButton ? 'col-md-6 mx-auto' : 'col-md-6';

                return (
                  <div className={colClass} key={cta.drupal_id}>
                    <Suspense fallback={<></>}>
                      <CallToAction
                        btnClass={btnClass}
                        href={cta.node.field_call_to_action_link.uri}
                        goalEventCategory={cta?.node.relationships.field_call_to_action_goal?.name}
                        goalEventAction={cta?.node.relationships.field_call_to_action_goal?.field_goal_action}
                      >
                        {cta.node.field_call_to_action_link.title}
                      </CallToAction>
                    </Suspense>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
  )}

  return <></>
}

const ProgramPage = ({nodeID, title, acronym, overview, seoData, heroData, variants, widgets, sections, footer, domains}) => {
  const hasIntroContent = overview.length > 0 || variants.heading.length > 0;
  const hasHeroContent = heroData.images?.length > 0 || heroData.videos?.length > 0;

  return (
    <Layout>
      <Helmet bodyAttributes={{ class: "program" }} />
      <Seo title={seoData.title} description={seoData.description} img={seoData.img} imgAlt={seoData.imgAlt} />

      {/**** Header and Title ****/}
      <div className={!hasHeroContent ? "no-thumb" : null} id="rotator">
        {heroData.videos ? (
          <Suspense fallback={<ModalVideoStatic />}>
            <HeroVideo
              videoURL={heroData.videos.field_media_oembed_video}
              videoWidth={heroData.videos.field_video_width}
              videoHeight={heroData.videos.field_video_height}
              videoTranscript={heroData.videos.relationships.field_media_file?.publicUrl}
            />
          </Suspense>
        ) : (
          <>
            <Hero imgData={heroData.images} />
            {/**** Hero Widgets content ****/}
            {heroData.widgets && (
              <div className="container hero-widgets-container d-flex flex-column justify-content-center align-items-center">
                {heroData.widgets.map((widget, index) => (
                  <Widget data={widget} key={index} />
                ))}
              </div>
            )}
          </>
        )}
        <div className="container ft-container">
          <h1 className="fancy-title">{title}</h1>
        </div>
      </div>

      <Suspense fallback={<BreadcrumbsStatic pageTitle={title} />}>
        <Breadcrumbs nodeID={nodeID} nodeTitle={title} domains={domains} />
      </Suspense>

      {/**** Program & Variants Overview ****/}
      {hasIntroContent && (
        <div className="container page-container">
          <div className="row site-content">
            <section className="content-area">
              {overview && <ParseText textContent={overview} />}
              {variants.heading && (<>
                  <h2>{variants.heading}</h2>
                  <Suspense fallback={<></>}>
                    <Variants variantData={variants.data} />
                  </Suspense>
                </>)}
            </section>
          </div>
        </div>
      )}

      {/**** Widgets content ****/}
      <WidgetContainer data={widgets} />

      {/**** Program Information Accordion ****/}
      {renderProgramInfoAccordion(sections.employerData)}

      {/**** Testimonials ****/}
      {sections.testimonialData && 
        <Suspense fallback={<></>}>
          <Testimonials data={sections.testimonialData} programAcronym={acronym} headingLevel="h3" />
        </Suspense>
      }

      { /**** Block - Admission Requirements Data ****/}
      {sections.blockData && (
        <div className="container page-container">
          <section className="row row-with-vspace site-content">
            <div className="col-md-12 content-area">
              <Suspense fallback={<></>}>
                <BlockWidget key={sections.blockData.drupal_id} data={sections.blockData} />
              </Suspense>
            </div>
          </section>
        </div>
      )}

      { /**** Slate Form ****/}
      {slateFormIDs[acronym] &&
        <div className="container page-container">
          <section className="row row-with-vspace site-content">
            <div className="col-md-12 content-area">
              {renderSlateForm(acronym)}
            </div>
          </section>
        </div>
      }

      {/**** Call to Actions ****/}
      {renderCallToActions(sections.callToActionData)}

      {footer && 
        <Suspense fallback={<></>}>
          <CustomFooter footerData={footer} />
        </Suspense>
      }
    </Layout>
  )
}

const ProgramPageTemplate = ({data}) => {
  const progData = data.programs.edges[0]?.node;
  const imageData = data.images?.edges;
  const imageTaggedData = data.imagesTagged?.edges
  const variantData = progData.relationships?.field_program_variants;

  // Re: Hero Widgets - `field_hero_widgets` only allows a single widget (at the moment), and
  // Drupal doesn't return an array, so force it into an array.
  const heroData = {
    images: imageData?.length > 0 ? imageData : imageTaggedData?.length > 0 ? imageTaggedData : null,
    widgets: progData.relationships?.field_hero_widgets ? [progData.relationships?.field_hero_widgets] : null,
    videos: data.videos.edges[0]?.node,
  }

  const seoData = {
    title: progData.title,
    description: progData.field_metatags?.og_description,
    img: heroData.images[0]?.node.relationships.field_media_image.publicUrl,
    imgAlt: heroData.images[0]?.node.field_media_image.alt
  };

  const sections = {
    callToActionData: data.ctas?.edges,
    employerData: data.employers?.edges,
    testimonialData: data.testimonials?.edges,
    blockData: data.blockAdmissionRequirements,
  }

  const variants = {
    heading: prepareVariantHeading(variantData),
    data: variantData,
  }

  const footerData = data.footer?.edges;

  return (
      <ProgramPage 
        nodeID={progData.drupal_internal__nid}
        title={progData.title}
        acronym={progData.relationships.field_program_acronym?.name}
        overview={progData.field_program_overview?.processed}
        seoData={seoData}
        heroData={heroData}
        variants={variants}
        widgets={progData.relationships?.field_widgets}
        sections={sections}
        footer={footerData?.length > 0 ? data.footer?.edges[0] : null}
        domains={progData?.field_domain_access}
      />
  );
}

export default ProgramPageTemplate

export const query = graphql`
  query ($id: String) {
    programs: allNodeProgram(filter: { relationships: { field_program_acronym: { id: { eq: $id } } } }) {
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
          relationships {
            field_prog_image {
              field_media_image {
                alt
              }
              relationships {
                field_media_image {
                  publicUrl
                  gatsbyImage(
                    width: 1920
                    cropFocus: CENTER
                    placeholder: BLURRED
                    aspectRatio: 3
                    formats: [AUTO, WEBP]
                  )
                }
              }
            }
            field_program_acronym {
              name
              id
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
    blockAdmissionRequirements: paragraphBlockWidget(field_custom_block: {drupal_internal__target_id: {eq: 65}}) {
      ...BlockWidgetParagraphFragment
    }
    ctas: allNodeCallToAction(filter: { fields: { tags: { in: [$id] } } }) {
      edges {
        node {
          changed
          drupal_id
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
    careers: allNodeCareer(sort: { title: ASC }, filter: { fields: { tags: { in: [$id] } } }) {
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
    employers: allNodeEmployer(sort: { title: ASC }, filter: { fields: { tags: { in: [$id] } } }) {
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
              gatsbyImage(width: 400, height: 400, placeholder: BLURRED, layout: CONSTRAINED, formats: [AUTO, WEBP])
            }
          }
        }
      }
    }
    footer: allNodeCustomFooter(filter: { fields: { tags: { in: [$id] } } }) {
      edges {
        node {
          ...CustomFooterFragment
        }
      }
    }
    images: allMediaImage(
      filter: {
        relationships: {
          node__program: { elemMatch: { relationships: { field_program_acronym: { id: { eq: $id } } } } }
        }
      }
    ) {
      edges {
        node {
          drupal_id
          field_media_image {
            alt
          }
          relationships {
            field_media_image {
              publicUrl
              gatsbyImage(width: 1920, cropFocus: CENTER, placeholder: BLURRED, aspectRatio: 3, formats: [AUTO, WEBP])
            }
          }
        }
      }
    }
    imagesTagged: allMediaImage(filter: { fields: { tags: { in: [$id] } } }) {
      edges {
        node {
          drupal_id
          field_media_image {
            alt
          }
          relationships {
            field_media_image {
              publicUrl
              gatsbyImage(width: 1920, cropFocus: CENTER, placeholder: BLURRED, aspectRatio: 3, formats: [AUTO, WEBP])
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
      filter: {
        relationships: {
          node__program: { elemMatch: { relationships: { field_program_acronym: { id: { eq: $id } } } } }
        }
      }
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
              publicUrl
            }
          }
        }
      }
    }
    testimonials: allNodeTestimonial(sort: { created: ASC }, filter: { fields: { tags: { in: [$id] } } }, limit: 10) {
      edges {
        node {
          ...TestimonialNodeFragment
        }
      }
    }
  }
`
