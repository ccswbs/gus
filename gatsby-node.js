/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  
  const typeDefs = `
	union relatedTaxonomyUnion =
	  taxonomy_term__tags
	  | taxonomy_term__specializations
	  | taxonomy_term__programs
	  | taxonomy_term__degrees
	  | taxonomy_term__units

	union relatedParagraphUnion = 
	  paragraph__program_variants
	  | paragraph__general_text

	interface TaxonomyInterface @nodeInterface {
	  id: ID!
	  drupal_id: String
	  name: String
	}
	type BodyField {
      processed: String
      value: String
      format: String
      summary: String
    }
    type BodyFieldWithSummary {
      processed: String
      value: String
      format: String
      summary: String
    }
	type FieldsPathAlias {
      alias: PathAlias
    }
    type PathAlias implements Node {
      value: String
    }
	type node__page implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      body: BodyFieldWithSummary
      relationships: node__pageRelationships
      fields: FieldsPathAlias
    }
    type node__pageRelationships implements Node {
      field_tags: [relatedTaxonomyUnion] @link(from: "field_tags___NODE")
    }
	type node__program implements Node & TaxonomyInterface {
	  drupal_id: String
	  drupal_internal__nid: Int
	  title: String

	  fields: FieldsPathAlias
	}
	`
}
exports.onCreateNode = ({ node, createNodeId, actions }) => {
  const { createNodeField } = actions

  // Handle nodes that point to multiple tag vocabularies
  if (node.internal.type === `node__call_to_action` ||
      node.internal.type === `node__testimonial` ||
      node.internal.type === `media__image` || 
      node.internal.type === `node__course`) {
    createNodeField({
      node,
      name: `tags`,
      value: node.relationships.field_tags___NODE,
    })
  }

  // Handle nodes that require page aliases
  if (node.internal.type === `node__page` || 
      node.internal.type === `node__program`) {
        
    /* Create page path */
    const aliasID = createNodeId(`alias-${node.drupal_id}`);

    // add  mapped alias node as a field
    createNodeField({
      node,
      name: "alias",
      value: aliasID,
    })

    /* Set content field for search */
    /*    - return body of content */
    if (typeof node.body !== 'undefined' && node.body !== null) {
        content = `${node.body.processed}`
    }
    /*    - return description of taxonomy */
    else if (typeof node.description !== 'undefined' && node.description !== null) {
        content = `${node.description.processed}`
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
  }
}

exports.createPages = async ({ graphql, actions, createContentDigest, createNodeId, reporter }) => {
  const pageTemplate = path.resolve('./src/templates/basic-page.js');
  const programTemplate = path.resolve('src/templates/program-page.js');
  const helpers = Object.assign({}, actions, {
    createContentDigest,
    createNodeId,
  })

  const result = await graphql(`
    {
      pages: allNodePage {
        edges {
          node {
            id
            drupal_id
            title
          }
        }
      }
      programs: allNodeProgram {
        edges {
          node {
            title
            id
            drupal_id
            relationships {
              field_specializations {
                name
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query')
  }

  if (result.data !== undefined){
    if(result.data.pages !== undefined){
      const pages = result.data.pages.edges;
      processPages(pages, createPageAlias, pageTemplate, helpers);
    }

    if(result.data.programs !== undefined){
      const programs = result.data.programs.edges;
      processPages(programs, createProgramAlias, programTemplate, helpers);
    }
  }
}

function processPages(dataType, functionToRetrieveAlias, template, helpers){
  dataType.forEach(({ node }, index) => {
    const alias = functionToRetrieveAlias(node);
    createNodeAlias(node, alias, helpers);

    helpers.createPage({
      path: alias,
      component: template,
      context: {
        id: node.id,
      },
    })
  })
}

function createNodeAlias(node, alias, helpers){
  const aliasID = helpers.createNodeId(`alias-${node.drupal_id}`);
  const aliasData = {
    key: aliasID,
    value: alias,
  }
  const aliasContent = JSON.stringify(aliasData);
  const aliasMeta = {
    id: aliasID,
    parent: null,
    children: [],
    internal: {
      type: `PathAlias`,
      mediaType: `text/html`,
      content: aliasContent,
      contentDigest: helpers.createContentDigest(aliasData)
    }
  }

  const aliasNode = Object.assign({}, aliasData, aliasMeta);
  helpers.createNode(aliasNode);
}

function createPageAlias(node){
  var alias = `/` + slugify(node.title);
  return alias;
}

/****** 
* Creates Program alias path using pattern of `/programs/specialization-name`
* If no specialization is available, uses pattern of `/programs/program-name`
********/
function createProgramAlias(node){
  var alias = `/programs/`;
  var specializations = node.relationships.field_specializations;

  // if specialization exists, add `specialization-name` to alias
  if ((specializations !== null) && (specializations.length !== 0)) {
    for(let i=0;i<specializations.length;i++){
      alias += (slugify(specializations[i].name));
      if ((specializations.length > 1) && (i < (specializations.length - 1))) {
        alias += `-`;
      }
    }
    alias += (`/`);
  }

  // add `program-name` to alias
  alias += (slugify(node.title));
  return alias;
}

// Source: https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}