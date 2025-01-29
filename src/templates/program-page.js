import React, { lazy, Suspense } from "react"
import Layout from "components/layout"
import { Helmet } from "react-helmet"
import Seo from "components/seo"
import BlockWidget from "components/shared/blockWidget"
import BreadcrumbsStatic from '../components/shared/breadcrumbsStatic';
import CallToAction from "components/shared/callToAction"
import CustomFooter from "components/shared/customFooter"
import Hero from "components/shared/hero"
import ModalVideoStatic from "components/shared/modalVideoStatic"
import Widget from "components/shared/widget"
import { sortLastModifiedDates } from "utils/ug-utils"
import { graphql } from "gatsby"

const Breadcrumbs = lazy(() => import('components/shared/breadcrumbs'));
const Employers = lazy(() => import("components/shared/employers"));
const HeroVideo = lazy(() => import("components/shared/heroVideo"));
const Testimonials = lazy(() => import("components/shared/testimonial"));
const Variants = lazy(() => import("components/shared/variants"));

function renderProgramOverview(overview) {
  if (overview) {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: overview }} />
      </>
    )
  }
  return null
}

function renderProgramVariants(variantDataHeading, variantData) {
  if (variantDataHeading) {
    return (
      <div className="container page-container">
        <div className="row site-content">
          <section className="content-area">
            <h2>{variantDataHeading}</h2>
            {
              <Suspense fallback={<></>}>
                <Variants variantData={variantData} />
              </Suspense>
            }
          </section>
        </div>
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

function retrieveLastModifiedDates(content) {
  let dates = []
  if (content?.length > 0) {
    content.forEach((edge) => {
      dates.push(edge.node.changed)
    })
  }
  return dates
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

const ProgramPage = ({ data, location }) => {
  let progData = data.programs.edges[0]?.node
  let callToActionData = data.ctas?.edges
  let domains = progData?.field_domain_access
  let employerData = data.employers?.edges
  let footerData = data.footer?.edges
  let imageData = data.images?.edges
  let imageTaggedData = data.imagesTagged?.edges
  let testimonialData = data.testimonials?.edges
  let variantData = progData.relationships?.field_program_variants
  let variantDataHeading = prepareVariantHeading(variantData)
  let videoData = data.videos.edges[0]?.node

  // Only pulling one block right now
  let blockData = data.blockAdmissionRequirements;

  const heroImage = imageData?.length > 0 ? imageData : imageTaggedData?.length > 0 ? imageTaggedData : null

  // Open Graph metatags
  const ogDescription = progData.field_metatags?.og_description
  const ogImage = heroImage && heroImage[0]?.node.relationships.field_media_image.publicUrl
  const ogImageAlt = heroImage && heroImage[0]?.node.field_media_image.alt

  // set program details
  const nodeID = progData.drupal_internal__nid
  const title = progData.title
  const acronym = progData.relationships.field_program_acronym?.name
  const overview = progData.field_program_overview?.processed

  // `field_hero_widgets` only allows a single widget (at the moment), and
  // Drupal doesn't return an array, so force it into an array.
  const heroWidgets = progData.relationships?.field_hero_widgets ? [progData.relationships?.field_hero_widgets] : null
  const widgets = progData.relationships?.field_widgets

  // set last modified date
  let allModifiedDates = sortLastModifiedDates([
    progData.changed,
    retrieveLastModifiedDates(callToActionData),
    retrieveLastModifiedDates(testimonialData),
  ])
  let lastModified = allModifiedDates[allModifiedDates.length - 1]

  return (
    <Layout date={lastModified}>
      <Helmet bodyAttributes={{ class: "program" }} />
      <Seo title={title} description={ogDescription} img={ogImage} imgAlt={ogImageAlt} />

      {/**** Header and Title ****/}
      <div className={!heroImage?.length > 0 && !videoData?.length > 0 ? "no-thumb" : null} id="rotator">
        {videoData ? (
          <Suspense fallback={<ModalVideoStatic />}>
            <HeroVideo
              videoURL={videoData.field_media_oembed_video}
              videoWidth={videoData.field_video_width}
              videoHeight={videoData.field_video_height}
              videoTranscript={videoData.relationships.field_media_file?.publicUrl}
            />
          </Suspense>
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

      <Suspense fallback={<BreadcrumbsStatic pageTitle={title} />}>
        <Breadcrumbs nodeID={nodeID} nodeTitle={title} domains={domains} />
      </Suspense>

      {/**** Program Overview ****/}
      {overview && (
        <div className="container page-container">
          <div className="row site-content">
            <section className="content-area">{renderProgramOverview(overview)}</section>
          </div>
        </div>
      )}

      {/**** Variants (e.g., Majors) content ****/}
      {renderProgramVariants(variantDataHeading, variantData)}

      {/**** Widgets content ****/}
      {widgets?.map((widget, index) => (
        <Widget widget={widget} key={index} />
      ))}

      {/**** Program Information Accordion ****/}
      {renderProgramInfoAccordion(
        // careerData,
        employerData
      )}

      {/**** Testimonials ****/}
      {testimonialData && 
        <Suspense fallback={<></>}>
          <Testimonials testimonialData={testimonialData} programAcronym={acronym} headingLevel="h3" />
        </Suspense>
      }

      { /**** Block - Admission Requirements Data ****/}
      {blockData && (
        <div className="container page-container">
          <section className="row row-with-vspace site-content">
            <div className="col-md-12 content-area">
              <BlockWidget key={blockData.drupal_id} blockData={blockData} />
            </div>
          </section>
        </div>
      )}

      {/**** Call to Actions ****/}
      {callToActionData.length !== 0 && (
        <div className="pt-0 container page-container apply-footer">
          <div className="col-md-8 mx-auto">
            <h3 className="mt-0 text-center text-dark">Get Future Ready</h3>
            <div className="row gx-3 mx-5 mb-5">              
              {(() => {
                let isFirstButton = true;
                return callToActionData.map((cta) => {
                  const btnClass = isFirstButton ? 'btn-primary' : 'btn-outline-primary';
                  isFirstButton = false; // Set the flag to false after the first button

                  // Apply mx-auto if there's only one button
                  const colClass = callToActionData.length === 1 ? 'col-md-6 mx-auto' : 'col-md-6';

                  return (
                    <div className={colClass} key={cta.drupal_id}>
                      <CallToAction
                        btnClass={btnClass}
                        href={cta.node.field_call_to_action_link.uri}
                        goalEventCategory={cta?.node.relationships.field_call_to_action_goal?.name}
                        goalEventAction={cta?.node.relationships.field_call_to_action_goal?.field_goal_action}
                      >
                        {cta.node.field_call_to_action_link.title}
                      </CallToAction>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}
      {footerData?.length > 0 && <CustomFooter footerData={footerData[0]} />}
    </Layout>
  )
}

export default ProgramPage

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
