import { graphql, Link } from 'gatsby';
import Layout from 'components/layout';
import React from 'react';
import Seo from 'components/seo';

const IndexPage = ({ data }) => {

    const pageTags = [];    
    const pubPages = [];
    const unpubPages = [];
    const pubPrograms = [];
    const unpubPrograms = [];
    const pages = data.allNodePage.edges;
    const programs = data.programs.edges;
    const tags = data.tags.edges;
    
    // Fetch tags used on pages
    for (let i=0; i<tags.length; i++) {
        if (tags[i].node?.relationships?.node__page?.length > 0) {
            pageTags.push(tags[i])            
        }
    }
    // Sort untagged pages into pubbed vs unpubbed
    for (let i=0; i<pages.length; i++) {
        if (pages[i].node.status === true) {
            if (!pages[i].node.field_tags) {
                pubPages.push(pages[i])
            }
        } else {
            if (!pages[i].node.field_tags) {
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
              <h1>University of Guelph Content Hub</h1>
              <p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>              
              <p>Basic pages are listed according to tag. If a page has more than one tag, it will be listed more than once, with untagged pages listed at the end. Programs appear after basic pages in their own section.</p>              
              
              <h2>Basic Pages</h2>
              
              {pageTags.map((tag) => {
                const taggedPages = tag.node.relationships.node__page;
                const taggedPagesPubbed = taggedPages.filter(page => page.status === true);
                taggedPagesPubbed.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                return (taggedPagesPubbed.length > 0 && <>
                  <h3 className="text-dark">{tag.node.name}</h3>
                  {tag.node.description?.processed && <div dangerouslySetInnerHTML={{__html: tag.node.description.processed}}></div>}
                  <p>Total pages: <strong>{taggedPagesPubbed.length}</strong></p>
                    <ul className="three-col-md">
                      {taggedPagesPubbed.map((taggedPage) => (
                          <li><Link to={taggedPage.path.alias}>{taggedPage.title}</Link></li>
                      ))}
                    </ul>
                </>)
              })}
              
              <h3>Untagged Pages</h3>
              <p>Total: <strong>{pubPages.length}</strong></p>
              <ul className="three-col-md">
                  {pubPages.map((page) => (
                      <li key={page.node.drupal_id}><Link to={page.node.path.alias}>{page.node.title}</Link></li>
                  ))}
              </ul>

              <h2>Programs</h2>
              <p>Total: <strong>{pubPrograms.length}</strong></p>
              <ul className="three-col-md">
                  {pubPrograms.map((program) => (
                      <li key={program.node.drupal_id}><Link to={program.node.path.alias}>{program.node.title}</Link></li>
                  ))}
              </ul>
              
              <h2>Unpublished Content</h2>
              <p>Unpublished pages and programs are only visible on preview and test sites.</p>
              
              <h3>Basic Pages</h3>            
              {pageTags.map((tag) => {
                const taggedPages = tag.node.relationships.node__page;
                const taggedPagesUnpubbed = taggedPages.filter(page => page.status === false);
                taggedPagesUnpubbed.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                return (taggedPagesUnpubbed.length > 0 && <>
                  <h4 className="text-dark">{tag.node.name}</h4> 
                  <p>Total: <strong>{taggedPagesUnpubbed.length}</strong></p>
                  <ul className="three-col-md">
                    {taggedPagesUnpubbed.map((taggedPage) => (
                      <li><Link to={taggedPage.path.alias}>{taggedPage.title}</Link></li>
                    ))}
                  </ul>
                </>)
              })}
              
              {unpubPages.length > 0 && <>
              <h4>Untagged Pages</h4>
              <p>Total: <strong>{unpubPages.length}</strong></p>
              <ul className="three-col-md">
                  {unpubPages.map((page) => (
                      <li key={page.node.drupal_id}><Link to={page.node.path.alias}>{page.node.title}</Link></li>
                  ))}
              </ul>
              </>}              
              
              <h3>Programs</h3>
              {unpubPrograms.length > 0 && <>
              <p>Total: <strong>{unpubPrograms.length}</strong></p>
              <ul className="three-col-md">
                  {unpubPrograms.map((program) => (
                      <li key={program.node.drupal_id}><Link to={program.node.path.alias}>{program.node.title}</Link></li>
                  ))}
              </ul>
              </>}
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
      tags: allTaxonomyInterface(sort: {fields: [name], order: ASC}) {
        edges {
          node {
            ... on taxonomy_term__tags {
              name
              description {
                processed
              }
              relationships {
                node__page {
                  status
                  title
                  path {
                    alias
                  }
                }
              }
            }
            ... on taxonomy_term__units {
              name
              description {
                processed
              }
              relationships {
                node__page {
                  status
                  title
                  path {
                    alias
                  }
                }
              }
            }
          }
        }
      }
    }
`
