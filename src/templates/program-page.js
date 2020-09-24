import React from 'react';
import { Helmet } from 'react-helmet';
import SVG from 'react-inlinesvg';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import Degrees from '../components/degrees';
//import Units from '../components/units';
import Variants from '../components/variants';
import Tags from '../components/tags';
import CallToAction from '../components/callToAction';
import Testimonials from '../components/testimonial';
import Courses from '../components/courses';
import NavTabs from '../components/navTabs';
import NavTabHeading from '../components/navTabHeading';
import NavTabContent from '../components/navTabContent';
import ColumnLists from '../components/columnLists';
import { contentIsNullOrEmpty, sortLastModifiedDates } from '../utils/ug-utils';
import { useIconData } from '../utils/fetch-icon';
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

function fetchBackgroundImage(imageData) {
	let checkIfContentAvailable = false;
	
	if (!contentIsNullOrEmpty(imageData)) {
		checkIfContentAvailable = true;
	}
	
	if (checkIfContentAvailable === true) {
		var bgImage;
		for (let i = 0; i < imageData.length; i++) {
			for (let j = 0; j < imageData[i].node.relationships.field_tags.length; j++) {
				if (imageData[i].node.relationships.field_tags[j].name === "img-background") {
					bgImage = imageData[i].node.relationships.field_media_image;
				}
			}
		}
		return bgImage.localFile.childImageSharp.fluid
	}
	
	return null;	
}

function renderProgramOverview(description, specData) {
	let checkIfContentAvailable = false;

	if (!contentIsNullOrEmpty(description) || 
		!contentIsNullOrEmpty(specData)) {
		checkIfContentAvailable = true;
	}

	if (checkIfContentAvailable === true) {
		return <React.Fragment>
			<h2>Program Overview</h2>
			<div dangerouslySetInnerHTML={{ __html: description }}  />
			{/* <Units specData={specData} headingLevel='h3' /> */}
		</React.Fragment>
	}

  return null;
}

function renderProgramStats(degreesData, specData, statsData, imageData) {
	let checkIfContentAvailable = false;
	
	if (!contentIsNullOrEmpty(statsData) || !contentIsNullOrEmpty(degreesData)) {
		checkIfContentAvailable = true;
	}
	
	if (checkIfContentAvailable === true) {
		return <React.Fragment>
		<div className="full-width-container">
			<div className="container page-container">
				<section className="row row-with-vspace site-content">
					<div className="col-md-12 content-area">
						<h2 className="sr-only">Program Statistics</h2>
						<dl className="d-flex flex-wrap flex-fill justify-content-center">
							<Degrees degreesData={degreesData} />
							{CountSpecializedMajors(specData)}
							{/* <Stats statsData={statsData} /> */}
						</dl>
					</div>
				</section>
			</div>
        </div>
		</React.Fragment>
	}
	
	return null;
}

function CountSpecializedMajors(specData) {
	const specIcon = useIconData();
	let checkIfContentAvailable = false;
	
	if (!contentIsNullOrEmpty(specData)) {
		checkIfContentAvailable = true;
	}
	
	if (checkIfContentAvailable === true) {
		var iconURL = ``;		
		if (specIcon !== null && specIcon !== undefined) {
			for (let i=0; i<specIcon.length; i++) {
				for (let j=0; j<specIcon[i].node.relationships.field_tags.length; j++) {
					if (specIcon[i].node.relationships.field_tags[j].name === "icon-majors") {
						iconURL = specIcon[i].node.relationships.field_media_image.localFile.publicURL;
					}
				}
			}
		}
		return <React.Fragment>
			<div className="uog-card">
				<dt>{iconURL !== null && <><SVG src={iconURL} /></>} {specData.length}</dt>
				<dd>Specialized Majors</dd>
			</div>
		</React.Fragment>
	}
	
	return null;
}

function renderProgramInfo (courseData, courseNotes, variantDataHeading, variantData, careerData, employerData) {
  let activeValue = true;
  let activeTabExists = false;
  let checkIfContentAvailable = false;
  let navTabHeadings = [];
  let navTabContent = [];
  let key = 0;

  // prep TAB 1 - Courses
  if(!contentIsNullOrEmpty(courseNotes) || !contentIsNullOrEmpty(courseData)){
    const courseHeading = "Courses";
    const courseID = "pills-courses";
    activeTabExists = true;
    checkIfContentAvailable = true;
    key++;

    navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
                                        active={activeValue} 
                                        heading={courseHeading} 
                                        controls={courseID} />);

    navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
                                      active={activeValue} 
                                      heading={courseHeading} 
                                      headingLevel="h3" 
                                      id={courseID} 
                                      content={<Courses courseData={courseData} courseNotes={courseNotes} headingLevel="h4" />} />);
  }

  // prep TAB 2 - Variants
  if( variantDataHeading !== '') {
    const variantID = "pills-variants";
    activeValue = (activeTabExists === true) ? false : true;
    checkIfContentAvailable = true;
    key++;

    navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
                                      active={activeValue} 
                                      heading={variantDataHeading} 
                                      controls={variantID} />);

    navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
                                      active={activeValue} 
                                      heading={variantDataHeading} 
                                      headingLevel="h3" 
                                      id={variantID} 
                                      content={<Variants variantData={variantData} />} />);
  }

  // prep TAB 3 - Careers
  if(!contentIsNullOrEmpty(careerData)) {
    activeValue = (activeTabExists === true) ? false : true;
    checkIfContentAvailable = true;
    const careersHeading = "Careers";
    const careersID = "pills-careers";
    key++;

    navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
                                      active={activeValue} 
                                      heading={careersHeading} 
                                      controls={careersID} />);

    navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
                                      active={activeValue} 
                                      heading={careersHeading} 
                                      headingLevel="h3" 
                                      id={careersID} 
                                      content={
                                        <ColumnLists numColumns={3}>
                                          {careerData.map (unit => {
                                            return <li key={unit.node.drupal_id}>{unit.node.title}</li>
                                          })}
                                        </ColumnLists>
                                      } />);
  }

  // prep TAB 4 - Employers
  if(!contentIsNullOrEmpty(employerData)) {
    activeValue = (activeTabExists === true) ? false : true;
    checkIfContentAvailable = true;
    const employerHeading = "Employers";
    const employerID = "pills-employer";
    key++;

    navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
                                      active={activeValue} 
                                      heading={employerHeading} 
                                      controls={employerID} />);

    navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
                                      active={activeValue} 
                                      heading={employerHeading} 
                                      headingLevel="h3" 
                                      id={employerID} 
                                      content={
                                        <div className="container">
                                          <div className="row">
                                            {employerData.map (unit => {
                                              let employerImage = unit.node.relationships.field_image;
                                              let employerSummary = unit.node.field_employer_summary;
                                              let employerJobPostingsLink = !contentIsNullOrEmpty(unit.node.field_link) ? unit.node.field_link.uri : null;
                                              return <div className="col-4" key={unit.node.drupal_id}>
                                                        <div className="employer-wrapper">
                                                          {employerImage && <div className="employer-pic">
                                                            <Img fluid={employerImage.localFile.childImageSharp.fluid} imgStyle={{ objectFit: 'contain' }} alt={unit.node.relationships.field_image.alt} />
                                                          </div>}
                                                          <div className="employer-info">
                                                            <h4 className="employer-name">{unit.node.title}</h4>
                                                            {employerSummary && <div dangerouslySetInnerHTML={{__html: employerSummary.processed}} />}
                                                            {employerJobPostingsLink && <p><a href={unit.node.field_link.uri}>Current Job Postings<span className="sr-only"> for {unit.node.title}</span></a></p>}
                                                          </div>
                                                        </div>
                                                      </div>
                                            })}
                                          </div>
                                        </div>
                                      } />);
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

function retrieveLastModifiedDates (content) {
  let dates = [];

  if (!contentIsNullOrEmpty(content)) {  
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
    if ((edge.__typename === "paragraph__program_variants") 
    && (edge.relationships.field_variant_type !== null)) {
      labels.push(edge.relationships.field_variant_type.name);
    }
  });

  const uniqueLabelSet = new Set(labels);
  const uniqueLabels = [...uniqueLabelSet];
  let variantHeading = "";

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
  let callToActionData = [];
  let careerData;
  let courseData;
  let degreesData;
  let employerData;
	let imageData;
  let progData;
  let specData;
  var statsData;
  let tagData;
  let testimonialData;
  let variantData;
  
	// set data
  if (data.programs.edges[0] !== undefined) { progData = data.programs.edges[0].node; }
  if (data.careers.edges[0] !== undefined) { careerData = data.careers.edges; }
  if (data.employers.edges[0] !== undefined) { employerData = data.employers.edges; }
  if (progData.relationships.field_courses !== undefined) { courseData = progData.relationships.field_courses; }
  if (data.ctas.edges[0] !== undefined) { callToActionData = data.ctas.edges; }
  if (data.images.edges !== undefined) { imageData = data.images.edges; }
  if (data.testimonials.edges[0] !== undefined) { testimonialData = data.testimonials.edges; }

	// set program details
	const title = progData.title;
	const acronym = (progData.relationships.field_program_acronym.name !== undefined && progData.relationships.field_program_acronym.name !== null ? progData.relationships.field_program_acronym.name : ``);
	const description = !contentIsNullOrEmpty(progData.field_program_overview) ? progData.field_program_overview.processed : ``;
	const courseNotes = !contentIsNullOrEmpty(progData.field_course_notes) ? progData.field_course_notes.processed : ``;
	const testimonialHeading = (acronym !== `` ? "What Students are saying about the " + acronym + " program" : "What Students are Saying");

  // set last modified date
  let allModifiedDates = sortLastModifiedDates(
    [progData.changed,
    retrieveLastModifiedDates(callToActionData),
		retrieveLastModifiedDates(testimonialData)
    ]);
  let lastModified = allModifiedDates[allModifiedDates.length - 1];

	// set degree, unit, variant, tag, and careers info  
	degreesData = progData.relationships.field_degrees;
  specData = progData.relationships.field_specializations;
  tagData = progData.relationships.field_tags;
	variantData = progData.relationships.field_program_variants;
  let variantDataHeading = prepareVariantHeading(variantData);

  return (
	<Layout date={lastModified}>
      <Helmet bodyAttributes={{
          class: 'program'
      }}
    />
	<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
      { /**** Header and Title ****/ }
      <div id="rotator">
        {/* <FetchImages tags={imageTags} /> */}
        {renderHeaderImage(imageData)}
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
				{renderProgramOverview(description, specData)}
			</section>
		</div>
	</div>
	
	{ /**** Program Stats ****/ }
	{renderProgramStats(degreesData, specData, statsData, imageData)}

  { /**** Program Information Tabs ****/ }
    <div className="container page-container">
      <section className="row row-with-vspace site-content">
        <div className="col-md-12 content-area">
          {renderProgramInfo(courseData, courseNotes, variantDataHeading, variantData, careerData, employerData)}
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
    programs: allNodeProgram(filter: {relationships: {field_program_acronym: {id: {eq: $id}}}}) {
      edges {
        node {
          changed
          drupal_id
          drupal_internal__nid
          title
          field_program_overview {
            processed
          }
          field_course_notes {
            processed
          }
          relationships {
            field_program_acronym {
              name
              id
            }        
            field_degrees {
              drupal_id
              name
              field_degree_acronym
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
            field_specializations {
              name
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
          }
        }
      }
    }
	
    ctas: allNodeCallToAction(filter: {fields: {tags: {in: [$id] }}}) {
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

    images: allMediaImage(filter: {fields: {tags: {in: [$id] }}}) {
      edges {
        node {
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
	
    testimonials: allNodeTestimonial(sort: {fields: created}, filter: {fields: {tags: {in: [$id] }}}) {
      edges {
        node {
          changed
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

    employers: allNodeEmployer(sort: {fields: title}, filter: {fields: {tags: {in: [$id] }}}) {
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

    careers: allNodeCareer(sort: {fields: [title], order: ASC}, filter: {fields: {tags: {in: [$id] }}}) {
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
  }
`