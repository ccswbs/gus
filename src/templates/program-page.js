import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data, location}) => {
    const program = data.allTaxonomyTermPrograms.edges[0].node;
  
    return (
      <Layout>
        <SEO title={program.name} keywords={[`gatsby`, `application`, `react`]} />
        <h1>{program.name}</h1>
      </Layout>
    )
  }

export const query = graphql`
  query ($alias: String!) {
    allTaxonomyTermPrograms(filter: {path: {alias: {eq: $alias}}}) {
      edges {
        node {
          drupal_internal__tid
          name
          path {
            alias
          }
        }
      }
	  }
	}
`