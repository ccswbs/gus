import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
	<>
		<h2>Degrees</h2>	
		<ul>
			<StaticQuery
				query={degreeQuery}
				render={data => (
					data.allTaxonomyTermDegrees.edges.map(edge => (
						<li>{edge.node.name} ({edge.node.field_degree_acronym})</li>
						)
					)
				)}
			/>
		</ul>
	</>
)

const degreeQuery = graphql`
query MyQuery {
	  allTaxonomyTermDegrees {
		edges {
		  node {
			drupal_internal__tid
			name
			field_degree_acronym
		  }
		}
	  }
	}
`