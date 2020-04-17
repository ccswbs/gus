import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'
import Degrees from '../components/degrees'

export default ({data, location}) => {
  // determine source of query
  var pageData;
  if(data.specializations.edges[0] !== undefined){
    pageData = data.specializations.edges[0].node;
  }else if(data.majors.edges[0] !== undefined){
    pageData = data.majors.edges[0].node;
  }

	var deg;
	var degList;
	if (pageData.relationships.field_degrees !== undefined && pageData.relationships.field_degrees !== null) {
		for (let i = 0; i < pageData.relationships.field_degrees.length; i++) {
			degList += "<li>" + pageData.relationships.field_degrees[i].name + "</li>"
		}
		deg = "<h2>Degrees Offered</h2><ul>" + degList + "</ul>";
	} else {
		deg = "";
	}

  const title = pageData.name;
  const description = (pageData.description !== undefined 
    && pageData.description !== null ? pageData.description.processed:``);
  const acronym = (pageData.acronym !== undefined && pageData.acronym !== null ? `(` + pageData.acronym + `)`: ``);
    
  return (
    <Layout>
      <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
      <h1>{title} {acronym}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }}  />
	  <div dangerouslySetInnerHTML={{__html: deg}}  />
		  
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
        }
      }
    }

	degrees: allTaxonomyTermDegrees (filter: {drupal_id: {eq: $id}}) {
		edges {
		  node {
			drupal_id
			drupal_internal__tid
			name
			field_degree_acronym
			path {
			  alias
			}
		  }
		}
	  }
	}
`