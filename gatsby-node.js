/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type taxonomy_term__specializations implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      field_specialization_acronym: String
      name: String
      description: TaxonomyDescription
      relationships: RelationshipMajors
    }
    type taxonomy_term__majors implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      field_degree_format: String
      name: String
      description: TaxonomyDescription
      relationships: RelationshipSpecialization
    }
    type TaxonomyDescription {
      processed: String
      value: String
      format: String
    }
    type RelationshipSpecialization {
      field_specializations: FieldSpecializations
    }
    type RelationshipMajors {
      field_majors: FieldMajors
    }
    type FieldSpecializations {
      name: String
    }
    type FieldMajors {
      name: String
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  
  if (node.internal.type === `node__page`) {
    /* Create page path */
    var slug = createPageAlias(node);

    createNodeField({
      node,
      name: `slug`,
      value: slug,
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

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve('./src/templates/basic-page.js');
  const programTemplate = path.resolve('src/templates/program-page.js');

  const result = await graphql(`
    {
      pages: allNodePage {
        edges {
          node {
            drupal_id
            title
            fields {
              slug
            }
          }
        }
      }
      specializations: allTaxonomyTermSpecializations {
        edges {
          node {
            drupal_id
            drupal_internal__tid
            name
          }
        }
      }
      majors: allTaxonomyTermMajors {
        edges {
          node {
            drupal_id
            drupal_internal__tid
            name
            field_degree_format
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
      pages.forEach(({ node }, index) => {
        const alias = createPageAlias(node);
        createPage({
          path: alias,
          component: pageTemplate,
          context: {
            id: node.drupal_id,
          },
        })
      })
    }

    if(result.data.specializations !== undefined){
      const specializations = result.data.specializations.edges;
      specializations.forEach(({ node }, index) => {
        const alias = createProgramAlias(node);
        createPage({
          path: alias,
          component: programTemplate,
          context: {
            id: node.drupal_id,
          },
        })
      })
    }

    if(result.data.majors !== undefined){
      const majors = result.data.majors.edges;
      majors.forEach(({ node }, index) => {
        const alias = createProgramMajorAlias(node);
        createPage({
          path: alias,
          component: programTemplate,
          context: {
            id: node.drupal_id,
          },
        })
      })
    }

  }
}

function createPageAlias(node){
  var alias = `/` + slugify(node.title);
  return alias;
}

function createProgramAlias(node){
  var alias = `/programs/` + slugify(node.name);
  return alias;
}

function createProgramMajorAlias(node){
  var alias = `/programs/`;

  if(node.relationships.field_specializations !== null){
    // if specialization existis, use name in url alias
    node.relationships.field_specializations.forEach(element => {
      alias += (slugify(element.name));
      if(node.relationships.field_specializations.length > 1){
        alias += `-`;
      }
    });
  }else{
    // else use major name in alias
    alias += (slugify(node.name));
  }
  alias += `/major`;
  if(node.field_degree_format !== `general`){
    alias += (`-` + node.field_degree_format);
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