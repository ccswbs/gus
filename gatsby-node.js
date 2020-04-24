/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type node__page implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      body: BodyField
      fields: FieldsPathAlias
    }
    type taxonomy_term__programs implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      name: String
      description: TaxonomyDescription
      relationships: RelationshipsPrograms
      fields: FieldsPathAlias
    }
    type taxonomy_term__specializations implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      field_specialization_acronym: String
      name: String
      description: TaxonomyDescription
    }
    type taxonomy_term__degrees implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      field_degree_acronym: String
      name: String
      description: TaxonomyDescription
    }
    type taxonomy_term__program_varient_type implements Node {
      name: String
    }
    type RelationshipsPrograms {
      field_specializations: [taxonomy_term__specializations]
      field_degrees: [taxonomy_term__degrees]
      field_program_variant: taxonomy_term__program_varient_type
      field_program_areas_of_emphasis: [taxonomy_term__programs]
    }
    type FieldsPathAlias {
      alias: PathAlias
    }
    type PathAlias implements Node {
      value: String
    }
    type BodyField {
      processed: String
      value: String
      format: String
      summary: String
    }
    type TaxonomyDescription {
      processed: String
      value: String
      format: String
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, createNodeId, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `node__page` || 
      node.internal.type === `taxonomy_term__programs`) {
        
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
            drupal_id
            title
          }
        }
      }
      programs: allTaxonomyTermPrograms {
        edges {
          node {
            name
            drupal_id
            relationships {
              field_program_variant {
                name
              }
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
        id: node.drupal_id,
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
* Creates Program alias path using pattern of `/programs/specialization-name/variant-type`
* If no specialization is available, uses pattern of `/programs/program-name`
********/
function createProgramAlias(node){
  var alias = `/programs/`;
  var specializations = node.relationships.field_specializations;
  var variants = node.relationships.field_program_variant;

  // if specialization exists, add `specialization-name/variant-type` to alias
  if(specializations.length > 0){
    specializations.forEach(element => {
      alias += (slugify(element.name));
      if(specializations.length > 1){
        alias += `-`;
      }
    });
    if(variants !== null){
      alias += (`-` + slugify(variants.name));
    }

  }else{
    // otherwise, add `program-name` to alias
    alias += (slugify(node.name));
  }

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