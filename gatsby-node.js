/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
	  allNodePage {
		edges {
		  node {
			path {
			  alias
			}
		  }
		}
	  }
	}
`
  ).then(result => {
    result.data.allNodePage.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: path.resolve(`./src/templates/basic-page.js`),
        context: {
          alias: node.path.alias,
        },
      })
    })
  })
}