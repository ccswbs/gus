import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
        <Layout>
			<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
				<h1>Gatsby UG Starter Theme</h1>
				<p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>
				<ul>
					{data.allNodePage.edges.map(edge => (
						<li><Link to={edge.node.fields.slug}>{edge.node.title}</Link></li>
					))}
				</ul>
        </Layout>
	)

export default IndexPage

export const query = graphql`
  query {
	  allNodePage {
		edges {
		  node {
			title
			fields {
				slug
			}
		  }
		}
	  }
	}
`