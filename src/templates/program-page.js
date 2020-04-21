import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'
import Degrees from '../components/degrees'

export default ({data, location}) => {
	// determine source of query
	var pageData;
	var degreesData;

	if (data.specializations.edges[0] !== undefined) {
		pageData = data.specializations.edges[0].node;
	} else if (data.majors.edges[0] !== undefined) {
		pageData = data.majors.edges[0].node;
	}

	// set program info
	const title = pageData.name;
	const description = (pageData.description !== undefined 
	&& pageData.description !== null ? pageData.description.processed:``);
	const acronym = (pageData.acronym !== undefined && pageData.acronym !== null ? `(` + pageData.acronym + `)`: ``);

	// set degree info  
	degreesData = pageData.relationships.field_degrees;

	return (
		<Layout>
		  <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
		  <h1>{title} {acronym}</h1>
		  <div dangerouslySetInnerHTML={{ __html: description }}  />
		  <Degrees degreesData={degreesData} />  
		</Layout>
	)
}

export const query = graphql`
  query ($id: String!) {
    specializations: allTaxonomyTermSpecializations(filter: {drupal_id: {eq: $id}}) {
      edges {
        node {
          drupal_id
          drupal_internal__tid
          name
          acronym: field_specialization_acronym
          description {
            processed
          }
          relationships {
            field_degrees {
              name
              field_degree_acronym
            }
          }
        }
      }
    }

    majors: allTaxonomyTermMajors(filter: {drupal_id: {eq: $id}}) {
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
          }
        }
      }
    }
  }
`