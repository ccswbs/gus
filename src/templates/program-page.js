import React from "react"
import Layout from "components/layout"
import { Helmet } from "react-helmet"
import Seo from "components/seo"
import Hero from "components/shared/hero"
import BlockWidget from "components/shared/blockWidget"
import Breadcrumbs from "components/shared/breadcrumbs"
import CallToAction from "components/shared/callToAction"
// import Careers from 'components/shared/careers';
import CustomFooter from "components/shared/customFooter"
import Employers from "components/shared/employers"
import HeroVideo from "components/shared/heroVideo"
import Testimonials from "components/shared/testimonial"
import Variants from "components/shared/variants"
import Widget from "components/shared/widget"
//import { Row, Col } from "react-bootstrap"
//import { StaticImage } from "gatsby-plugin-image"
import { sortLastModifiedDates } from "utils/ug-utils"
import { graphql } from "gatsby"

function renderProgramOverview(overview) {
  if (overview) {
    return (
      <>
        {/* <h2>Program Overview</h2> */}
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
            {<Variants variantData={variantData} />}
          </section>
        </div>
      </div>
    )
  }
}

/*
function renderTalkToStudent() {
  return (
    <Row className="my-sm-5">
      <Col md={6}>
        <StaticImage src="../images/unibuddy.webp" alt="Collage of smiling students with callouts" />
      </Col>
      <Col md={6} className="mt-5 ps-5">
        <h3>Talk to a Current Student</h3>
        <p>
          {" "}
          Don’t just take it from us – hear from one of our many students on their experiences with Guelph, integrating
          into U of G life, and much more. Start chatting with{" "}
          <a href="https://admission.uoguelph.ca/chat-with-domestic-student">students from Canada</a> or{" "}
          <a href="https://admission.uoguelph.ca/international/chat/">international students</a>
        </p>
      </Col>
    </Row>
  )
}
*/

/* 4 cards - Admission Requirements, Scholarships, Tour our Campus, Have Questions */
function renderAdmissionRequirements() {
  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 my-5">
        <div className="card border-0 mb-4 col">
          <div className="card-body p-4 uog-blue-muted uog-border-black">
            <h3 className="card-title text-dark mt-0">Admission Requirements</h3>
            <p>
              Explore admission requirements for Canadian, international, transfer, and mature students. Start your
              journey today!
            </p>
            <p>
              <a href="https://www.uoguelph.ca/admission/undergraduate/">View Admission Requirements</a>
            </p>
          </div>
        </div>

        <div className="card border-0 mb-4 col">
          <div className="card-body p-4 uog-blue-muted uog-border-red">
            <h3 className="card-title text-dark mt-0">Scholarships & Bursaries</h3>
            <p>
              We offer a wide range of financial aid programs to assist with funding your education at the University of
              Guelph.
            </p>
            <p>
              <a href="https://www.uoguelph.ca/registrar/studentfinance/aid/index">
                Explore Scholarships & Financial Aid
              </a>
            </p>
          </div>
        </div>

        <div className="card border-0 mb-4 col">
          <div className="card-body p-4 uog-blue-muted uog-border-yellow">
            <h3 className="card-title text-dark mt-0">Tour Our Campus</h3>
            <p>
              Through virtual tours, presentations, webinars and in-person tours, get familiar with the University of
              Guelph campus.
            </p>
            <p>
              <a href="https://www.uoguelph.ca/admission/undergraduate/tours/">Book a Tour</a>
            </p>
          </div>
        </div>

        <div className="card border-0 mb-4 col">
          <div className="card-body p-4 uog-blue-muted uog-border-blue">
            <h3 className="card-title text-dark mt-0">Have Questions?</h3>
            <p>
              Learn more about how to connect, discover, and engage with programs, facilities and life at the University
              of Guelph.
            </p>
            <p>
              <a href="https://www.uoguelph.ca/admission/undergraduate/contact/">Request More Info</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// function renderProgramInfoAccordion  (careerData, employerData) {
function renderProgramInfoAccordion(employerData) {
  // accordion - Careers Item
  // const programCareersItem = () => {
  //     if (careerData?.length>0) {
  //       return (
  //         <div className="accordion-item">
  //           <h3 className="accordion-header" id="programCareers-heading">
  //             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#programCareers-careers" aria-expanded="false" aria-controls="programCareers-careers">
  //               Careers
  //             </button>
  //           </h3>
  //           <div id="programCareers-careers" className="accordion-collapse collapse" aria-labelledby="programCareers-heading">
  //             <div className="accordion-body">
  //             <Careers careerData={careerData} numColumns={3}/>
  //             </div>
  //           </div>
  //         </div>
  //       )
  //     }
  //     return null;
  // }

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
              <Employers employerData={employerData} />
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  // if ( careerData?.length>0 ||employerData?.length > 0) {
  if (employerData?.length > 0) {
    return (
      <div className="container page-container">
        <section className="row row-with-vspace site-content">
          <div className="col-md-12 content-area">
            <div className="accordion" id="ProgramPageAccordion">
              {/* {programCareersItem()} */}
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
  // let careerData = data.careers?.edges;
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
  let blockData = data.block75;

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
          <HeroVideo
            videoURL={videoData.field_media_oembed_video}
            videoWidth={videoData.field_video_width}
            videoHeight={videoData.field_video_height}
            videoTranscript={videoData.relationships.field_media_file?.publicUrl}
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

      { /**** Block Data - International Webinars (ID 75) ****/}
      {blockData && (
        <div className="container page-container">
          <section className="row row-with-vspace site-content">
            <div className="col-md-12 content-area">
              <BlockWidget key={blockData.drupal_id} blockData={blockData} />
            </div>
          </section>
        </div>
      )}

      {/**** Testimonials ****/}
      {testimonialData && <Testimonials testimonialData={testimonialData} programAcronym={acronym} headingLevel="h3" />}

      {/**** Admission Requirements ****/}
      {
        <div className="container page-container">
          <section className="row row-with-vspace site-content">
            <div className="col-md-12 content-area">
              {renderAdmissionRequirements()}
              {/****renderTalkToStudent()****/}
            </div>
          </section>
        </div>
      }

      {/**** Call to Actions ****/}
      {callToActionData.length !== 0 && (
        <div className="container page-container apply-footer">
          <section className="row row-with-vspace site-content">
            <div className="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 content-area">
              <h3 className="text-dark text-center">Are you ready to Improve Life?</h3>
              {callToActionData.map((cta, index) => (
                <CallToAction
                  key={index}
                  href={cta.node.field_call_to_action_link.uri}
                  goalEventCategory={cta?.node.relationships.field_call_to_action_goal?.name}
                  goalEventAction={cta?.node.relationships.field_call_to_action_goal?.field_goal_action}
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
    block75: paragraphBlockWidget(field_custom_block: {drupal_internal__target_id: {eq: 75}}) {
      ...BlockWidgetParagraphFragment
    }
    ctas: allNodeCallToAction(filter: { fields: { tags: { in: [$id] } } }) {
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
