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
import { contentIsNullOrEmpty, sortLastModifiedDates } from '../utils/ug-utils';
import FetchImages from '../utils/fetch-images';
import '../styles/program-page.css';

function renderHeaderImage(imageData) {
	let checkIfContentAvailable = false;
	
	if (!contentIsNullOrEmpty(imageData)) {
		checkIfContentAvailable = true;
	}
	
	if (checkIfContentAvailable === true) {
		var headerImage;
		var altText;
		for (let i = 0; i < imageData.length; i++) {
			altText = imageData[i].node.field_media_image.alt;
			for (let j = 0; j < imageData[i].node.relationships.field_tags.length; j++) {
				if (imageData[i].node.relationships.field_tags[j].name === "img-header") {
					headerImage = imageData[i].node.relationships.field_media_image;
				}
			}
		}
		return <React.Fragment>{headerImage && <Img fluid={headerImage.localFile.childImageSharp.fluid} alt={altText} />}</React.Fragment>
	}
	
	return null;
}

function renderProgramOverview(description, degreesData, specData) {
	let checkIfContentAvailable = false;

	if (!contentIsNullOrEmpty(description) || 
		!contentIsNullOrEmpty(degreesData) || 
		!contentIsNullOrEmpty(specData)) {
		checkIfContentAvailable = true;
	}

	if (checkIfContentAvailable === true) {
		return <React.Fragment>
			<h2>Program Overview</h2>
			<div dangerouslySetInnerHTML={{ __html: description }}  />
			<Degrees degreesData={degreesData} headingLevel='h3' />
			<Units specData={specData} headingLevel='h3' />
		</React.Fragment>
	}

  return null;
}

function renderProgramInfo (courseData, courseNotes, variantDataHeading, variantData) {
  let activeTab = false;
  let checkIfContentAvailable = false;
  let navTabHeadings = [];
  let navTabContent = [];
  let key = 0;

  // prep courses tab
  if ((courseNotes !== null && courseNotes !== "") || 
      (courseData !== null && courseData !== undefined && courseData.length > 0 )) {
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
  if (variantDataHeading !== '') {
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

  if (checkIfContentAvailable === true) {
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

function retrieveLastModifiedDates (content) {
  let dates = [];

/*   if (!contentIsNullOrEmpty(content)) {  
    content.forEach((edge) => {
        dates.push(edge.node.changed);
    })
  } */
  
  if (!contentIsNullOrEmpty(content)) { 
	dates.push(content.changed);
  }

  return dates;
}

// combine multiple body values and place sticky values at the top
function combineAndSortBodyFields (content) {
  let stickyContent = [];
  let allContent = [];

  if(contentIsNullOrEmpty(content)) { return ""; }

  content.forEach((edge) => {
    if (!contentIsNullOrEmpty(edge.node.body.processed)){
      if(edge.node.sticky === true) {
        stickyContent.push(edge.node.body.processed);
      } else {
        allContent.push(edge.node.body.processed);
      }
    }
  })

  allContent.unshift(stickyContent);

  return allContent.join("");
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
	//var imageData;
	var progData;
	var progDescData;
	var degreesData;
	var specData;
	var courseNotesData;
	var courseData;
	var variantData;
	var tagData;
	var testimonialData;
	var callToActionData = [];
	var imageTags = [];

	// set data
	if (data.programs.edges[0] !== undefined) { progData = data.programs.edges[0].node; }
	if (progData.relationships.field_program_overview !== undefined) { progDescData = progData.relationships.field_program_overview; }
	if (progData.relationships.field_course_notes !== undefined) { courseNotesData = progData.relationships.field_course_notes; }
	if (progData.relationships.field_testimonials !== undefined) { testimonialData = progData.relationships.field_testimonials; }
	if (progData.relationships.field_call_to_action !== undefined) { callToActionData = progData.relationships.field_call_to_action; }
	//if (data.images.edges[0] !== undefined) { imageData = data.images.edges[0]; }
	if (progData.relationships.field_courses !== undefined) { courseData = progData.relationships.field_courses; }
	
	// set program details
	//const headerImage = (imageData !== undefined && imageData !== null ? imageData.node.relationships.field_media_image : null);
	//const imageData = useImageData();
	const title = progData.title;
	const acronym = (progData.relationships.field_program_acronym.name !== undefined && progData.relationships.field_program_acronym.name !== null ? progData.relationships.field_program_acronym.name : ``);
  //const description = combineAndSortBodyFields(progDescData);
	const description = progDescData.body.processed;
  //const courseNotes = combineAndSortBodyFields(courseNotesData);
	const courseNotes = courseNotesData.body.processed;
	const testimonialHeading = (acronym !== `` ? "What Students are saying about the " + acronym + " program" : "What Students are Saying");
	
	imageTags = (acronym !== `` ? [acronym,"img-header"] : null);

  // set last modified date
  let allModifiedDates = sortLastModifiedDates([
                          progData.changed,
                          retrieveLastModifiedDates(progDescData)]);
                          //retrieveLastModifiedDates(courseNotesData),
                          //retrieveLastModifiedDates(courseData)]);
  let lastModified = allModifiedDates[allModifiedDates.length - 1];

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
		<FetchImages tags={imageTags} />
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
                      <CallToAction key={index} href={cta.field_call_to_action_link.uri} 
                        goalEventCategory={cta.relationships.field_call_to_action_goal.name} 
                        goalEventAction={cta.relationships.field_call_to_action_goal.field_goal_action} 
                        classNames='btn btn-uogRed apply' >
                        {cta.field_call_to_action_link.title}
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
				{renderProgramOverview(description, degreesData, specData)}
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
                      <CallToAction key={index} href={cta.field_call_to_action_link.uri} 
                        goalEventCategory={cta.relationships.field_call_to_action_goal.name} 
                        goalEventAction={cta.relationships.field_call_to_action_goal.field_goal_action} 
                        classNames='btn btn-uogRed apply' >
                      {cta.field_call_to_action_link.title}
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
    programs: allNodeProgram(filter: {id: {eq: $id}}) {
      edges {
        node {
          changed
          drupal_id
          drupal_internal__nid
          title
          relationships {
            field_program_acronym {
              name
            }
            field_program_overview {
              title
              drupal_id
              body {
                processed
              }
              changed
              sticky
            }
            field_degrees {
              drupal_id
              name
              field_degree_acronym
            }
            field_course_notes {
              id
              body {
                processed
              }
              changed
              sticky
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
            field_tags {
              name
            }
            field_testimonials {
              drupal_id
              body {
                processed
              }
              title
              field_testimonial_person_desc
              field_picture {
                alt
              }
              relationships {
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
            field_call_to_action {
              field_call_to_action_link {
                title
                uri
              }
              relationships {
                field_call_to_action_goal {
                  name
                  field_goal_action
                }
              }
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
          }
        }
      }
    }
  }
`

