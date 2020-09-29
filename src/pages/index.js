import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'
import Instagram from '../components/instag'

const IndexPage = ({ data }) => (
        <Layout>
			<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
			<div className="container page-container">
				<h1>Gatsby UG Starter Theme</h1>
				<p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>
				<h2>Pages</h2>
				<ul>
					{data.allNodePage.edges.map((edge, index) => (
						<li key={index}><Link to={edge.node.fields.alias.value}>{edge.node.title}</Link></li>
					))}
				</ul>

				<h2>Programs</h2>
				<ul>
					{data.programs.edges.map((edge, index) => (
						<li key={index}><Link to={edge.node.fields.alias.value}>{edge.node.title}</Link></li>
					))}
				</ul>
				<h2>Instagram</h2>
				<Instagram />
			</div>
        </Layout>
	)

export default IndexPage

export const query = graphql`
  query {
	  allNodePage {
		edges {
		  node {
			title
			drupal_id
			fields {
				alias {
					value
				}
			}
		  }
		}
	  }
	programs: allNodeProgram {
		edges {
		  node {
			drupal_id
			drupal_internal__nid
			title
			fields {
				alias {
					value
				}
			}
		  }
		}
	  }
	}
`