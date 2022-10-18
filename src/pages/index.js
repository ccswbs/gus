import { graphql, Link } from 'gatsby';
import Layout from 'components/layout';
import React from 'react';
import Seo from 'components/seo';

const IndexPage = ({ data }) => {

    const pageTags = [];    
    const pubPages = [];
    const pubPagesTagged = [];
    const unpubPages = [];
    const unpubPagesTagged = [];
    const pubPrograms = [];
    const unpubPrograms = [];
    const pages = data.allNodePage.edges;
    const programs = data.programs.edges;
    const tags = data.tags.edges;
    
    // Fetch tags used on pages
    for (let i=0; i<tags.length; i++) {
        if (tags[i].node.relationships.node__page?.length > 0) {
            pageTags.push(tags[i])            
        }
    }
    // Sort pages into pubbed vs unpubbed and tagged vs not
    for (let i=0; i<pages.length; i++) {
        if (pages[i].node.status === true) {
            if (pages[i].node.field_tags) {
                pubPagesTagged.push(pages[i])
            } else {
                pubPages.push(pages[i])
            }
        } else {
            if (pages[i].node.field_tags) {
                unpubPagesTagged.push(pages[i])
            } else {
                unpubPages.push(pages[i])
            }
        }
    }
    // Sort programs into pubbed vs unpubbed
    for (let i=0; i<programs.length; i++) {
        if (programs[i].node.status === true) {
            pubPrograms.push(programs[i])
        } else {
            unpubPrograms.push(programs[i])
        }
    }
    
    return (
    <Layout menuName="main">
        <Seo title="Home" />
        <div className="container page-container">
          <div className="site-content">
            <div className="content-area">
              <h1>Gatsby UG Starter Theme</h1>
              <p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>
              
              {pageTags.map((tag) => {
                const taggedPages = tag.node.relationships.node__page;
                taggedPages.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                return (<>
                  <h2>{tag.node.name}</h2>
                    <ul className="two-col-md">
                      {taggedPages.map((taggedPage) => (
                          taggedPage.status && <li><Link to={taggedPage.path.alias}>{taggedPage.title}</Link></li>
                      ))}
                    </ul>
                </>)
              })}
              
              <h2>Untagged Pages</h2>
              <ul className="two-col-md">
                  {pubPages.map((page) => (
                      <li key={page.node.drupal_id}><Link to={page.node.path.alias}>{page.node.title}</Link></li>
                  ))}
              </ul>

              <h2>Programs</h2>
              <ul className="two-col-md">
                  {pubPrograms.map((program) => (
                      <li key={program.node.drupal_id}><Link to={program.node.path.alias}>{program.node.title}</Link></li>
                  ))}
              </ul>
              
              <h2>Unpublished Content</h2>
              
              {pageTags.map((tag) => (
                <><h3>{tag.node.name}</h3>
                <ul className="two-col-md">
                  {tag.node.relationships.node__page.map((taggedPage) => (
                      !taggedPage.status && <li><Link to={taggedPage.path.alias}>{taggedPage.title}</Link></li>
                  ))}
                </ul></>
              ))}
              
              <h3>Untagged Pages</h3>
              <ul className="two-col-md">
                  {unpubPages.map((page) => (
                      <li key={page.node.drupal_id}><Link to={page.node.path.alias}>{page.node.title}</Link></li>
                  ))}
              </ul>
              <h3>Programs</h3>
              <ul className="two-col-md">
                  {unpubPrograms.map((program) => (
                      <li key={program.node.drupal_id}><Link to={program.node.path.alias}>{program.node.title}</Link></li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
    </Layout>
    )
}

export default IndexPage

export const query = graphql`
    query {
      allNodePage(sort: {fields: [title], order: ASC}) {
        edges {
          node {
            title
            drupal_id
            path {
              alias
            }
            relationships {
              field_tags {
                __typename
                ... on TaxonomyInterface {
                  drupal_id
                  id
                  name
                }
              }
            }
            status
          }
        }
      }
      programs: allNodeProgram(sort: {fields: [title], order: ASC}) {
        edges {
          node {
            drupal_id
            drupal_internal__nid
            title
            path {
              alias
            }
            status
          }
        }
      }
      tags: allTaxonomyTermTags(sort: {fields: [name], order: ASC}) {
        edges {
          node {
            name
            relationships {
              node__page {
                title
                path {
                  alias
                }
                status
              }
            }
          }
        }
      }
    }
`
