import React from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Breadcrumbs from '../components/breadcrumbs';
import CallToAction from '../components/callToAction';
import Careers from '../components/careers';
import Courses from '../components/courses';
import Degrees from '../components/degrees';
import Employers from '../components/employers';
import CustomFooter from '../components/customFooter';
import NavTabs from '../components/navTabs';
import NavTabHeading from '../components/navTabHeading';
import NavTabContent from '../components/navTabContent';
import NewsGrid from '../components/newsGrid';
import Stats from '../components/stats'
import SVG from 'react-inlinesvg';
import Tags from '../components/tags';
import Testimonials from '../components/testimonial';
import Variants from '../components/variants';
import { contentExists, contentIsNullOrEmpty, sortLastModifiedDates } from '../utils/ug-utils';
import { graphql } from 'gatsby';
import { useIconData } from '../utils/fetch-icon';
import '../styles/program-page.css';

function renderHeaderImage(imageData) {
	if (!contentIsNullOrEmpty(imageData)) {
		let imgData = [];
		for (let i = 0; i < imageData.length; i++) {
			for (let j = 0; j < imageData[i].node.relationships.field_tags.length; j++) {
				if (imageData[i].node.relationships.field_tags[j].name === "img-header") {
					imgData.push(imageData[i]);
				}
			}
		}
		return <Hero imgData={imgData} />
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
		</React.Fragment>
	}

	return null;
}

function renderProgramStats(degreesData, variantData, statsData, imageData) {
	let checkIfContentAvailable = false;

	if (!contentIsNullOrEmpty(statsData) || !contentIsNullOrEmpty(degreesData)) {
		checkIfContentAvailable = true;
	}
	
	if (checkIfContentAvailable === true) {
		return <React.Fragment>
		<div className="full-width-container stats-bg">
			<div className="container page-container">
				<section className="row row-with-vspace site-content">
					<div className="col-md-12 content-area">
						<h2 className="sr-only">Program Statistics</h2>
						<dl className="d-flex flex-wrap flex-fill justify-content-center">
							<Degrees degreesData={degreesData} />
							{CountProgramVariants(variantData)}
							<Stats statsData={statsData} />
						</dl>
					</div>
				</section>
			</div>
		</div>
		</React.Fragment>
	}
	
	return null;
}

function CountProgramVariants(variantData) {
	const specIcon = useIconData();
	let checkIfContentAvailable = false;
	let majors = [];
	let minors = [];
	let certificates = [];
	let assocDiplomas = [];
	
	if (!contentIsNullOrEmpty(variantData)) {
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
		return <React.Fragment>		
			{!contentIsNullOrEmpty(majors) && <>
				<div className="uog-card">
					<dt>{iconURL !== null && <><SVG src={iconURL} /></>} {majors.length}</dt>
					<dd>Specialized Majors</dd>
				</div>
			</>}
			{!contentIsNullOrEmpty(minors) && <>
				<div className="uog-card">
					<dt>{iconURL !== null && <><SVG src={iconURL} /></>} {minors.length}</dt>
					<dd>Specialized Minors</dd>
				</div>
			</>}
			{!contentIsNullOrEmpty(assocDiplomas) && <>
				<div className="uog-card">
					<dt>{iconURL !== null && <><SVG src={iconURL} /></>} {assocDiplomas.length}</dt>
					<dd>Associate Diplomas</dd>
				</div>
			</>}
			{!contentIsNullOrEmpty(certificates) && <>
				<div className="uog-card">
					<dt>{iconURL !== null && <><SVG src={iconURL} /></>} {certificates.length}</dt>
					<dd>Optional Certificates</dd>
				</div>
			</>}
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
	if (!contentIsNullOrEmpty(courseNotes) || !contentIsNullOrEmpty(courseData)) {
		const courseHeading = "Selected Courses";
		const courseID = "pills-courses";
    if (activeTabExists === false) {
      activeTabExists = true;
    } else {
      activeValue = false;
    }
		checkIfContentAvailable = true;
		key++;

		navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
										   active={activeValue} 
										   heading={courseHeading} 
										   controls={courseID} 
							/>);

		navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
										  active={activeValue} 
										  heading={courseHeading} 
										  headingLevel="h3" 
										  id={courseID} 
										  content={<Courses courseData={courseData} courseNotes={courseNotes} headingLevel="h4" />} 
							/>);
	}

	// prep TAB 2 - Variants
	if (variantDataHeading !== '') {
		const variantID = "pills-variants";
    if (activeTabExists === false) {
      activeTabExists = true;
    } else {
      activeValue = false;
    }
		checkIfContentAvailable = true;
		key++;

		navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
										   active={activeValue} 
										   heading={variantDataHeading} 
										   controls={variantID} 
							/>);

		navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
										  active={activeValue} 
										  heading={variantDataHeading} 
										  headingLevel="h3" 
										  id={variantID} 
										  content={<Variants variantData={variantData} />} 
							/>);
	}

	// prep TAB 3 - Careers
	if (!contentIsNullOrEmpty(careerData)) {
    if (activeTabExists === false) {
      activeTabExists = true;
    } else {
      activeValue = false;
    }
		checkIfContentAvailable = true;
		const careersHeading = "Careers";
		const careersID = "pills-careers";
		key++;

		navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
										   active={activeValue} 
										   heading={careersHeading} 
										   controls={careersID} 
							/>);

		navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
										  active={activeValue} 
										  heading={careersHeading} 
										  headingLevel="h3" 
										  id={careersID} 
										  content={<Careers careerData={careerData} numColumns={3} />} 
							/>);
	}
	
	// prep TAB 4 - Employers
	if (!contentIsNullOrEmpty(employerData)) {
    if (activeTabExists === false) {
      activeTabExists = true;
    } else {
      activeValue = false;
    }
		checkIfContentAvailable = true;
		const employerHeading = "Employers";
		const employerID = "pills-employer";
		key++;

		navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + key} 
										   active={activeValue} 
										   heading={employerHeading} 
										   controls={employerID} 
							/>);

		navTabContent.push(<NavTabContent key={`navTabContent-` + key} 
										  active={activeValue} 
										  heading={employerHeading} 
										  headingLevel="h3" 
										  id={employerID} 
										  content={<Employers employerData={employerData} />} 
							/>);
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
// Modified function to remove warning  --> Anonymous arrow functions cause Fast Refresh to not preserve local component state.

										// Please add a name to your function, for example:

										// Before:
										// export default () => {}

										// After:
										// const Named = () => {}
										// export default Named;


										const ProgramPage = ({data, location}) => {
	let callToActionData = [];
	let careerData;
	let courseData;
	let degreesData;
	let employerData;
	let footerData;
	let imageData;
	let progData;
	let newsData;
	let specData;
	let statsData;
	let tagData;
	let testimonialData;
	let variantData;

	// set data
	if (data.careers.edges[0] !== undefined) { careerData = data.careers.edges; }
	if (data.ctas.edges[0] !== undefined) { callToActionData = data.ctas.edges; }
	if (data.employers.edges[0] !== undefined) { employerData = data.employers.edges; }
	if (data.footer.edges[0] !== undefined) { footerData = data.footer.edges; }
	if (data.images.edges !== undefined) { imageData = data.images.edges; }
	if (data.news.edges[0] !== undefined) { newsData = data.news.edges; }
	if (data.programs.edges[0] !== undefined) { progData = data.programs.edges[0].node; }
	if (progData.relationships.field_courses !== undefined) { courseData = progData.relationships.field_courses; }
	if (progData.relationships.field_program_statistics !== undefined) { statsData = progData.relationships.field_program_statistics; }
	if (data.testimonials.edges[0] !== undefined) { testimonialData = data.testimonials.edges; }

	// set program details
	const nodeID = progData.drupal_internal__nid;
	const title = progData.title;
	const acronym = (progData.relationships.field_program_acronym.name !== undefined && progData.relationships.field_program_acronym.name !== null ? progData.relationships.field_program_acronym.name : ``);
	const description = !contentIsNullOrEmpty(progData.field_program_overview) ? progData.field_program_overview.processed : ``;
	const courseNotes = !contentIsNullOrEmpty(progData.field_course_notes) ? progData.field_course_notes.processed : ``;
	 // moved testimonialh=eading definition to inside testimonial call to allow for a more dynamic name
  // const testimonialHeading = (acronym !== `` ? "What Students are saying about the " + acronym + " program" : "What Students are Saying");

	// set last modified date
	let allModifiedDates = sortLastModifiedDates(
		[progData.changed, retrieveLastModifiedDates(callToActionData), retrieveLastModifiedDates(testimonialData)]
		);
	let lastModified = allModifiedDates[allModifiedDates.length - 1];

	// set degree, specialization, variant, and tag info  
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
	  <div className={!contentExists(imageData) && "no-thumb"} id="rotator">
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
                        goalEventCategory={contentExists(cta.node.relationships.field_call_to_action_goal)? cta.node.relationships.field_call_to_action_goal.name: ``} 
                        goalEventAction={contentExists(cta.node.relationships.field_call_to_action_goal)? cta.node.relationships.field_call_to_action_goal.field_goal_action: ``} 
                        classNames='btn btn-uogRed apply' >
                        {cta.node.field_call_to_action_link.title}
                      </CallToAction>
                    ))}
                  </div>
              </section>
          </div>
      </div>
	  
	  <Breadcrumbs nodeID={nodeID} nodeTitle={title} />

      { /**** Program Overview ****/ }
      <div className="container page-container">
        <div className="row row-with-vspace site-content">
          <section className="col-md-9 content-area">
            {renderProgramOverview(description, specData)}
          </section>
        </div>
      </div>
	
      { /**** Program Stats ****/ }
      {renderProgramStats(degreesData, variantData, statsData, imageData)}

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
      <Testimonials testimonialData={testimonialData} programAcronym={acronym} headingLevel='h3' />
      }

      { /*** News ****/}
      {newsData && 
        <NewsGrid newsData={newsData} heading="Program News" headingLevel='h2' />
      }

      { /**** Call to Actions ****/ }
      {callToActionData.length !== 0 &&
        <div className="container page-container apply-footer">
          <section className="row row-with-vspace site-content">
              <div className="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 content-area">
                  <h3><span>Are you ready to</span> Improve Life?</h3>
                  {callToActionData.map((cta, index) => (
                      <CallToAction key={index} href={cta.node.field_call_to_action_link.uri} 
                        goalEventCategory={contentExists(cta.node.relationships.field_call_to_action_goal)? cta.node.relationships.field_call_to_action_goal.name: ``} 
                        goalEventAction={contentExists(cta.node.relationships.field_call_to_action_goal)? cta.node.relationships.field_call_to_action_goal.field_goal_action: ``} 
                        classNames='btn btn-uogRed apply' >
                      {cta.node.field_call_to_action_link.title}
                      </CallToAction>
                    ))}
              </div>
          </section>
        </div>
      }
	  
	  {contentExists(footerData) && footerData.length !== 0 &&
		<CustomFooter footerData={footerData[0]} />
	  }		
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
            relationships {
              field_stat_type {
                name
              }
              field_stat_icon {
                relationships {
                  field_media_image {
                    localFile {
                      publicURL
                    }
                  }
                }
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
            ... on paragraph__call_to_action {
              id
              field_cta_title
              field_cta_description
              field_cta_primary_link {
                title
                uri
              }
            }
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
                  ... on paragraph__call_to_action {
                    id
                    field_cta_title
                    field_cta_description
                    field_cta_primary_link {
                      title
                      uri
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
                  ... on paragraph__media_text {
                    field_media_text_title
                    field_media_text_desc {
                      processed
                    }
                    field_media_text_links {
                      title
                      uri
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
              field_media_text_links {
                title
                uri
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
  images: allMediaImage(filter: {fields: {tags: {in: [$id]}}}) {
    edges {
      node {
        drupal_id
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
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