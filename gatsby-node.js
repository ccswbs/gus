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

    type taxonomy_term__programs implements Node & TaxonomyInterface {
      drupal_id: String
      drupal_internal__tid: Int
      name: String
      field_program_acronym: String
      relationships: taxonomy_term__programsRelationships
      fields: FieldsPathAlias
    }
    type taxonomy_term__programsRelationships {
      field_degrees: [taxonomy_term__degrees]
      field_specializations: [taxonomy_term__specializations]
      field_program_variants: [relatedParagraphUnion] @link(from: "field_program_variants___NODE")
      field_tags: [taxonomy_term__tags]
    }
    type paragraph__general_text implements Node {
      drupal_id: String
      field_general_text: BodyField
    }
    type paragraph__program_variants implements Node {
      drupal_id: String
      field_variant_title: String
      field_variant_link: FieldLink
      field_variant_info: BodyField
      relationships: paragraph__program_variantsRelationships
    }
    type paragraph__program_variantsRelationships {
      field_variant_name: taxonomy_term__program_variant_type
      field_variant_type: taxonomy_term__program_variant_type
    }
    type taxonomy_term__program_variant_type implements Node {
      name: String
    }

    type taxonomy_term__tags implements Node & TaxonomyInterface {
      drupal_id: String
      drupal_internal__tid: Int
      name: String
      description: TaxonomyDescription
    }
    type taxonomy_term__specializations implements Node & TaxonomyInterface {
      drupal_id: String
      drupal_internal__tid: Int
      field_specialization_acronym: String
      name: String
      relationships: taxonomy_term__specializationsRelationships
      description: TaxonomyDescription
    }
    type taxonomy_term__specializationsRelationships {
      field_units: [taxonomy_term__units]
    }
    type taxonomy_term__degrees implements Node & TaxonomyInterface {
      drupal_id: String
      drupal_internal__tid: Int
      field_degree_acronym: String
      name: String
      description: TaxonomyDescription
    }
    type taxonomy_term__units implements Node & TaxonomyInterface {
      drupal_id: String
      drupal_internal__tid: Int
      field_unit_acronym: String
      name: String
      description: TaxonomyDescription
    }
    type taxonomy_term__goals implements Node & TaxonomyInterface {
      drupal_id: String
      drupal_internal__tid: Int
      name: String
      field_goal_action: String
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

    type node__career implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      title: String
      changed: Date
      body: BodyFieldWithSummary
      relationships: node__careerRelationships
      fields: node__careerFields
    }
    type node__careerRelationships implements Node {
      field_tags: [relatedTaxonomyUnion] @link(from: "field_tags___NODE")
    }
    type node__careerFields implements Node {
      tags: [String]
    }

    type node__program_description implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      title: String
      body: BodyFieldWithSummary
      relationships: node__program_descriptionRelationships
      changed: Date
      sticky: Boolean
    }
    type node__program_descriptionRelationships implements Node {
      field_tags: [taxonomy_term__programs]
    }

    type node__program_course_notes implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      title: String
      body: BodyField
      relationships: node__program_course_notesRelationships
      changed: Date
      sticky: Boolean
    }
    type node__program_course_notesRelationships implements Node {
      field_tags: [taxonomy_term__programs]
    }

    type node__testimonial implements Node {
        drupal_id: String
        drupal_internal__tid: Int
        title: String
        body: BodyFieldWithSummary
        field_testimonial_person_desc: String
        field_picture: PictureField
        relationships: node__testimonialRelationships
        fields: node__testimonialFields
    }
    type node__testimonialRelationships {
      field_picture: file__file @link(from: "field_picture___NODE")
      field_tags: [relatedTaxonomyUnion] @link(from: "field_tags___NODE")
    }
    type node__testimonialFields implements Node {
      tags: [String]
    }

    type node__call_to_action implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      title: String
      field_call_to_action_link: FieldLink
      relationships: node__call_to_actionRelationships
      fields: node__call_to_actionFields
    }
    type node__call_to_actionRelationships implements Node {
      field_call_to_action_goal: taxonomy_term__goals
      field_tags: [relatedTaxonomyUnion] @link(from: "field_tags___NODE")
    }
    type node__call_to_actionFields implements Node {
      tags: [String]
    }

    type node__course implements Node {
      drupal_id: String
      drupal_internal__tid: Int
      title: String
      field_code: String
      field_course_url: node__courseField_course_url
      field_credits: String
      field_level: Int
      relationships: node__courseRelationships
      fields: node__courseFields
    }
    type node__courseField_course_url implements Node {
      uri: String
      title: String
    }
    type node__courseRelationships implements Node {
      field_tags: [relatedTaxonomyUnion] @link(from: "field_tags___NODE")
    }
    type node__courseFields implements Node {
      tags: [String]
    }

    type media__image implements Node {
      drupal_id: String
      name: String
      field_media_image: PictureField
      fields: media__imageFields
      relationships: media__imageRelationships
    }
    type media__imageRelationships implements Node {
      field_media_image: file__file @link(from: "field_media_image___NODE")
      field_tags: [relatedTaxonomyUnion] @link(from: "field_tags___NODE")
    }
    type media__imageFields implements Node {
      tags: [String]
    }
    type PictureField implements Node {
      alt: String
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
    type BodyFieldWithSummary {
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
    type FieldLink {
      title: String
      uri: String
    }
    type InstaNode implements Node {
      original: String
      caption: String
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, createNodeId, actions }) => {
  const { createNodeField } = actions

  // Handle nodes that point to multiple tag vocabularies
  if (node.internal.type === `node__call_to_action` ||
      node.internal.type === `node__testimonial` ||
      node.internal.type === `media__image` || 
      node.internal.type === `node__course` || 
      node.internal.type === `node__career`) {
    createNodeField({
      node,
      name: `tags`,
      value: node.relationships.field_tags___NODE,
    })
  }

  // Handle nodes that require page aliases
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
      programs: allTaxonomyTermPrograms {
        edges {
          node {
            name
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
  alias += (slugify(node.name));
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