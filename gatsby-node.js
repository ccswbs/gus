/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `node__page` || node.internal.type === `taxonomy_term__specializations`) {
    /* Create page path */
    const alias = `${node.path.alias}`    
    createNodeField({
      node,
      name: `alias`,
      value: alias,
    })
    /* Set content field for search */
    /*    - return body of content */
    if (typeof node.body !== 'undefined' && node.body !== null) {
        content = `${node.body.value}`
    }
    /*    - return description of taxonomy */
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
  const pageTemplate = path.resolve('./src/templates/basic-page.js');
  const programTemplate = path.resolve('src/templates/program-page.js');
  
  return graphql(`
    {
	  pages: allNodePage {
		  edges {
		    node {
		    	path {
			      alias
			    }
		    }
		  }
    }
    specializations: allTaxonomyTermSpecializations {
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
    result.data.pages.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: pageTemplate,
        context: {
          alias: node.path.alias,
        },
      })
    })

    result.data.specializations.edges.forEach(({ node }) => {
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