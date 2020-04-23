import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'
import Degrees from '../components/degrees'
import Units from '../components/units'
import CallToAction from '../components/callToAction'

export default ({data, location}) => {
	// determine source of query
	var pageData;
	var degreesData;
	var specData;
	var unitData;

	if(data.programs.edges[0] !== undefined){
		pageData = data.programs.edges[0].node;
	}

	// set program info
	const title = pageData.name;
	const description = (pageData.description !== undefined 
	&& pageData.description !== null ? pageData.description.processed:``);
	const acronym = (pageData.acronym !== undefined && pageData.acronym !== null ? `(` + pageData.acronym + `)`: ``);

	// set degree info  
	degreesData = pageData.relationships.field_degrees;
	
	// set unit info by pulling specialization data first
	specData = pageData.relationships.field_specializations;

	return (
		<Layout>
		  <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
		  <h1>{title} {acronym}</h1>
		  <div dangerouslySetInnerHTML={{ __html: description }}  />
		  <Degrees degreesData={degreesData} />
		  <Units unitData={specData} />
		  <CallToAction href='#'>Apply</CallToAction>
		</Layout>
	)
}

export const query = graphql`
  query ($id: String!) {
    programs: allTaxonomyTermPrograms(filter: {drupal_id: {eq: $id}}) {
      edges {
        node {
          drupal_id
          drupal_internal__tid
          name
          description {
            processed
          }
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
          }
        }
      }
    }
  }
`