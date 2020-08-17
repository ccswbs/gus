import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Degrees from '../components/degrees';
import Units from '../components/units';
import Variants from '../components/variants';
import Tags from '../components/tags';
import CallToAction from '../components/callToAction';
import Testimonials from '../components/testimonial';
import Courses from '../components/courses';
import NavTabs from '../components/navTabs';
import NavTabHeading from '../components/navTabHeading';
import NavTabContent from '../components/navTabContent';
import '../styles/program-page.css';

function renderProgramInfo (courseData, courseNotes, variantDataHeading, variantData) {
  let activeTab = false;
  let checkIfContentAvailable = false;
  let navTabHeadings = [];
  let navTabContent = [];
  let key = 0;

  // prep courses tab
  if((courseNotes !== null && courseNotes !== "") || 
      (courseData !== null && courseData !== undefined && courseData.length > 0 )){
    activeTab = true;
    checkIfContentAvailable = true;
    navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
                                        active={activeTab} 
                                        heading="Courses" 
                                        controls="pills-courses" />);

    navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
                                      active={activeTab} 
                                      heading="Courses" 
                                      headingLevel="h3" 
                                      id="pills-courses" 
                                      content={<Courses courseData={courseData} courseNotes={courseNotes} headingLevel="h4" />} />);
    key++;
  }

  // prep variants tab
  if( variantDataHeading !== '') {
    activeTab = (activeTab === false) ? true : false;
    checkIfContentAvailable = true;
    navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
                                      active={activeTab} 
                                      heading={variantDataHeading} 
                                      controls="pills-certificates" />);

    navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
                                      active={activeTab} 
                                      heading={variantDataHeading} 
                                      headingLevel="h3" 
                                      id="pills-certificates" 
                                      content={<Variants variantData={variantData} />} />);
  }

  if(checkIfContentAvailable === true){
    return <React.Fragment>
              <h2>Program Information</h2>
              <NavTabs headings={
                navTabHeadings.map((heading) => {
                  return heading;
                })
              }>
              {navTabContent.map((content) => {
                return content;
              })}
              </NavTabs>
            </React.Fragment>
  }

  return null;
}

function prepareVariantHeading (variantData) {
  let labels = [];

  // prepare variant data labels
  variantData.forEach((edge) => {
    if ((edge.__typename === "paragraph__program_variants") 
    && (edge.relationships.field_variant_type !== null)) {
      labels.push(edge.relationships.field_variant_type.name);
    }
  });

  const uniqueLabelSet = new Set(labels);
  const uniqueLabels = [...uniqueLabelSet];
  var variantHeading = "";

  for (let i=0; i<uniqueLabels.length; i++) {
    if (i > 0) { 
      if (uniqueLabels.length > 2){
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

export default ({data, location}) => {
	var imageData;
	var progData;
	var degreesData;
	var specData;
	var courseData;
	var variantData;
	var tagData;
	var testimonialData;
	var callToActionData = [];

	// set data
	if (data.programs.edges[0] !== undefined) { progData = data.programs.edges[0].node; }
	if (data.testimonials.edges[0] !== undefined) { testimonialData = data.testimonials.edges; }
	if (data.ctas.edges[0] !== undefined) { callToActionData = data.ctas.edges; }
	if (data.images.edges[0] !== undefined) { imageData = data.images.edges[0]; }
	if (data.courses.edges[0] !== undefined) { courseData = data.courses.edges; }

	// set program details
	const headerImage = (imageData !== undefined && imageData !== null ? imageData.node.relationships.field_media_image : null);
	const title = progData.name;
	const description = (progData.description !== undefined 
	&& progData.description !== null ? progData.description.processed:``);
	const acronym = (progData.field_program_acronym !== undefined && progData.field_program_acronym !== null ? progData.field_program_acronym : ``);
	const testimonialHeading = (acronym !== `` ? "What Students are saying about the " + acronym + " program" : "What Students are Saying");
  const lastModified = progData.changed;
  const courseNotes = (progData.field_course_notes !== undefined 
    && progData.field_course_notes !== null ? progData.field_course_notes.processed:``);

	// set degree, unit, variant, tag, and course info  
	degreesData = progData.relationships.field_degrees;
	specData = progData.relationships.field_specializations;
	tagData = progData.relationships.field_tags;
	variantData = progData.relationships.field_program_variants;
	const variantDataHeading = prepareVariantHeading(variantData);

  return (
	<Layout date={lastModified}>
      <Helmet bodyAttributes={{
          class: 'program'
      }}
    />
	<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />

      { /**** Header and Title ****/ }
      <div id="rotator">
        {headerImage && <Img fluid={headerImage.localFile.childImageSharp.fluid} alt={imageData.node.field_media_image.alt} />}
        <div className="container ft-container">
          <h1 className="fancy-title">{title}</h1>
        </div>
      </div>

      { /**** Tags and Call to Action Button ****/ }
      <div className="full-width-container bg-dark">
          <div className="container">
              <section className="row row-with-vspace site-content">
                  <div className="col-md-9 content-area">
                    {tagData && tagData.length > 0 ?  
                      (<Tags tagData={tagData} />)
                      : null
                    }	
                  </div>
                  <div className="col-md-3">
                    {callToActionData.map((cta, index) => (
                      <CallToAction key={index} href={cta.node.field_call_to_action_link.uri} 
                        goalEventCategory={cta.node.relationships.field_call_to_action_goal.name} 
                        goalEventAction={cta.node.relationships.field_call_to_action_goal.field_goal_action} 
                        classNames='btn btn-uogRed apply' >
                      {cta.node.field_call_to_action_link.title}
                      </CallToAction>
                    ))}
                  </div>
              </section>
          </div>
      </div>

    { /**** Program Overview ****/ }
	<div className="container page-container">
        <div className="row row-with-vspace site-content">
          <section className="col-md-9 content-area">
            <h2>Program Overview</h2>
            <div dangerouslySetInnerHTML={{ __html: description }}  />			
            <Degrees degreesData={degreesData} headingLevel='h3' />
            <Units specData={specData} headingLevel='h3' />
          </section>
        </div>
    </div>

      { /**** Program Information Tabs ****/ }
      <div className="container page-container">
        <section className="row row-with-vspace site-content">
          <div className="col-md-12 content-area">
            {renderProgramInfo(courseData, courseNotes, variantDataHeading, variantData)}
          </div>
        </section>
      </div>

      { /**** Testimonials ****/ }
      {testimonialData && 
        <Testimonials testimonialData={testimonialData} heading={testimonialHeading} headingLevel='h3' />
      }

      { /**** Call to Actions ****/ }
      {callToActionData.length !== 0 &&
        <div className="container page-container apply-footer">
          <section className="row row-with-vspace site-content">
              <div className="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 content-area">
                  <h3><span>Are you ready to</span> Improve Life?</h3>
                  {callToActionData.map((cta, index) => (
                      <CallToAction key={index} href={cta.node.field_call_to_action_link.uri} 
                        goalEventCategory={cta.node.relationships.field_call_to_action_goal.name} 
                        goalEventAction={cta.node.relationships.field_call_to_action_goal.field_goal_action} 
                        classNames='btn btn-uogRed apply' >
                      {cta.node.field_call_to_action_link.title}
                      </CallToAction>
                    ))}
              </div>
          </section>
        </div>
      }

		</Layout>
	)
}

export const query = graphql`
  query ($id: String) {
    programs: allTaxonomyTermPrograms(filter: {id: {eq: $id}}) {
      edges {
        node {
          changed
          drupal_id
          drupal_internal__tid
          name
          description {
            processed
          }
          field_program_acronym
          field_course_notes {
            processed
          }
          relationships {
            field_degrees {
              drupal_id
              name
              field_degree_acronym
            }
            field_specializations {
              relationships {
                field_units {
                  drupal_id
                  field_unit_acronym
                  name
                }
              }
            }
            field_program_variants {
              __typename
              ... on paragraph__general_text {
                drupal_id
                field_general_text {
                  value
                }
              }
              ... on paragraph__program_variants {
                drupal_id
                field_variant_title
                field_variant_link {
                  uri
                }
                field_variant_info {
                  value
                }
                relationships {
                  field_variant_type {
                    name
                  }
                }
              }
            }
            field_tags {
              name
            }
          }
        }
      }
    }

    images: allMediaImage(limit: 1, filter: {fields: {tags: {in: [$id] }}}) {
      edges {
        node {
          name
          drupal_id
          field_media_image {
            alt
          }
          relationships {
            field_media_image {
              localFile {
                childImageSharp {
                  fluid {
                      originalImg
                      ...GatsbyImageSharpFluid
                  }
              }
              }
            }
          }
        }
      }
    }

    ctas: allNodeCallToAction(filter: {fields: {tags: {in: [$id] }}}) {
      edges {
        node {
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
    
    testimonials: allNodeTestimonial(sort: {fields: created}, filter: {fields: {tags: {in: [$id] }}}) {
      edges {
        node {
          drupal_id
          body {
              value
              processed
          }
          title
          field_testimonial_person_desc
          field_picture {
              alt
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

            field_picture {
                localFile {
                    url
                    childImageSharp {
                        fluid(maxWidth: 400, maxHeight: 400) {
                            originalImg
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
          }
        }
      }
    }
	
	courses: allNodeCourse(sort: {fields: [field_level], order: ASC} filter: {fields: {tags: {in: [$id] }}}) {
      edges {
        node {
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
		  field_code
          field_course_url {
            uri
          }
          field_credits
          field_level
          title
        }
      }
    }
	
  }
`

