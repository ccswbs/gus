import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'
import Degrees from '../components/degrees'
import Units from '../components/units'
import Variants from '../components/variants'
import Tags from '../components/tags'
import CallToAction from '../components/callToAction'

export default ({data, location}) => {
	// determine source of query
	var pageData;
	var degreesData;
	var specData;
	var progvarData;
	var tagData;

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
	
	// set program variant data
	progvarData = pageData.relationships.field_program_variants;
	
	// set tag info
	tagData = pageData.relationships.field_tags;

	return (
		<Layout>
			<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
			<div className="container"><h1>{title} {acronym}</h1></div>
			{tagData.length > 0 ?  
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
				<CallToAction href='#'>Apply</CallToAction>
			</div>
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
  }
`