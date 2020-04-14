/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `node__page` || node.internal.type === `taxonomy_term__program`) {
        /* Create page path */
        const alias = `${node.path.alias}`
        createNodeField({
            node,
            name: `alias`,
            value: alias,
        })
        /* Set content field for search */
        /*    - return body of topic content */
        if (typeof node.body !== 'undefined' && node.body !== null) {
            content = `${node.body.value}`
        }
        /*    - return description of annual_report taxonomy */
        else if (typeof node.description !== 'undefined' && node.description !== null) {
            content = `${node.description.value}`
        }
        /*    - set default content */
        else {
            content = ''
        }
        createNodeField({
            node,
            name: `content`,
            value: content,
        })
        //console.log(content)
    }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const programTemplate = path.resolve('src/templates/program-page.js');
  
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
    programs: allTaxonomyTermPrograms {
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

    result.data.programs.edges.forEach(({ node }) => {
      createPage({
          path: node.path.alias,
          component: programTemplate,
          context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              alias: node.path.alias,
          },
      })
    })
  })
}