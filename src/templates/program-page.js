import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Degrees from '../components/degrees'
import Units from '../components/units'
import Variants from '../components/variants'
import Tags from '../components/tags'
import CallToAction from '../components/callToAction'
import Testimonials from '../components/testimonial'
import { Helmet } from 'react-helmet'
import '../styles/program-page.css'


export default ({data, location}) => {
	var progData;
	var degreesData;
	var specData;
	var progvarData;
  var tagData;
  var testimonialData;
  var callToActionData = [];

  // set data
	if(data.programs.edges[0] !== undefined){ progData = data.programs.edges[0].node; }
  if(data.testimonials.edges[0] !== undefined){ testimonialData = data.testimonials.edges; }
  if(data.ctas.edges[0] !== undefined){ callToActionData = data.ctas.edges; }
  
	// set program details
	const title = progData.name;
	const description = (progData.description !== undefined 
	&& progData.description !== null ? progData.description.processed:``);
  const acronym = (progData.field_program_acronym !== undefined && progData.field_program_acronym !== null ? progData.field_program_acronym : ``);
  const testimonialHeading = (acronym !== `` ? "What Students are saying about the " + acronym + " program" : "What Students are Saying");

	// set degree, unit, variant, and tag info  
	degreesData = progData.relationships.field_degrees;
	specData = progData.relationships.field_specializations;
	progvarData = progData.relationships.field_program_variants;
  tagData = progData.relationships.field_tags;

  return (
		<Layout>
      <Helmet bodyAttributes={{
          class: 'program'
      }}
      />
			<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
			<div className="container"><h1>{title} {acronym}</h1></div>
			{tagData && tagData.length > 0 ?  
				(<div id="tags">
					<div className="container"><Tags tagData={tagData} /></div>
				</div>)
				: null
			}			
			<div className="container page-container">
				<h2>Program Overview</h2>
				<div dangerouslySetInnerHTML={{ __html: description }}  />
				<Degrees degreesData={degreesData} />	
				<Variants progvarData={progvarData} />		  
				<Units unitData={specData} />
				{callToActionData.map((cta, index) => (
					<CallToAction key={index} href={cta.node.field_call_to_action_link.uri} 
						goalEventCategory={cta.node.relationships.field_call_to_action_goal.name} 
						goalEventAction={cta.node.relationships.field_call_to_action_goal.field_goal_action} >
					{cta.node.field_call_to_action_link.title}
					</CallToAction>
				))}
			</div>
      {testimonialData && 
            <Testimonials testimonialData={testimonialData} heading={testimonialHeading} />
        }

		</Layout>
	)
}

export const query = graphql`
  query ($id: String) {
    programs: allTaxonomyTermPrograms(filter: {id: {eq: $id}}) {
      edges {
        node {
          drupal_id
          drupal_internal__tid
          name
          description {
            processed
          }
          field_program_acronym
          relationships {
            field_degrees {
              name
              field_degree_acronym
            }
            field_specializations {
              relationships {
                field_units {
                  field_unit_acronym
                  name
                }
              }
            }
            field_program_variants {
              relationships {
                field_variant_name {
                  name
                }
                }
                field_variant_info {
                  value
                }
            }
            field_tags {
              name
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
    
    testimonials: allNodeTestimonial(filter: {fields: {tags: {in: [$id] }}}) {
      edges {
        node {
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
  }
`

