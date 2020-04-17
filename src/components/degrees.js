import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

export default () => (
	<>
		<h2>Degrees</h2>	
		<ul>
			<StaticQuery
				query={degreeQuery}
				render={data => (
					data.allTaxonomyTermDegrees.edges.map(edge => (
						<li><Link to={edge.node.path.alias}>{edge.node.name} ({edge.node.field_degree_acronym})</Link></li>
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
			path {
			  alias
			}
		  }
		}
	  }
	}
`