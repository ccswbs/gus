import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'
import Degrees from '../components/degrees'
import CallToAction from '../components/callToAction'
import Testimonials from '../components/testimonial'

export default ({data, location}) => {
  // determine source of query
  var pageData;
	var degreesData;

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

  //<h2>profile title: {data.profiles.nodes[0].title} </h2>
      //<h2>profile title: {data.profiles.nodes[1].title} </h2>
	return (
		<Layout>
		  <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
		  <h1>{title} {acronym}</h1>
		  <div dangerouslySetInnerHTML={{ __html: description }}  />
		  <Degrees degreesData={degreesData} />
      <CallToAction href='#'>Apply</CallToAction>
      <h2>Testimonials</h2>
      <Testimonials testimonialData={data.profiles.nodes} />
      
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
          }
        }
      }
    }
    
    profiles: allNodeStudentProfile(filter: {relationships: {field_program: {drupal_id: {eq: $id}}}})  {
      nodes {
          body {
              value
              processed
          }
          title
          field_picture {
              alt
          }
          relationships {
              field_picture {
        
                  localFile {
                      url
                      childImageSharp {
                          fluid(maxWidth: 400, maxHeight: 250) {
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
`