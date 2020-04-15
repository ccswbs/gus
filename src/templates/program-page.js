import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data, location}) => {
    const specialization = data.allTaxonomyTermSpecializations.edges[0].node;
    const specializationAcronym = (specialization.field_specialization_acronym !== null ? `(` + specialization.field_specialization_acronym + `)`: ``);
    const specializationDesc = (specialization.description !== null ? specialization.description.processed : ``);
  
    return (
      <Layout>
        <SEO title={specialization.name} keywords={[`gatsby`, `application`, `react`]} />
        <h1>{specialization.name} {specializationAcronym}</h1>
        <div dangerouslySetInnerHTML={{ __html: specializationDesc }} />
      </Layout>
    )
  }

export const query = graphql`
  query ($alias: String!) {
    allTaxonomyTermSpecializations(filter: {path: {alias: {eq: $alias}}}) {
      edges {
        node {
          drupal_internal__tid
          name
          field_specialization_acronym
          description {
            processed
          }
          path {
            alias
          }
        }
      }
	  }
	}
`