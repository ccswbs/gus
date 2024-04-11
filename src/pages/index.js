import { graphql, Link } from 'gatsby';
import Layout from 'components/layout';
import React from 'react';
import Seo from 'components/seo';

// Check if path alias from Drupal exists. If not, find and use the alias created by Gatsby
function createLink(gatsbyID, gatsbyPageData, nodeAlias, nodeTitle) {
    let linkPath = nodeAlias;
    if (!linkPath) {
        const pagePath = gatsbyPageData.find(path => gatsbyID === path.node.pageContext.id);
        linkPath = pagePath ? pagePath.node.path : null;
    }
    return linkPath ? <Link to={linkPath}>{nodeTitle}</Link> : null;
}

const IndexPage = ({ data }) => {

    const count = data.allSitePage.totalCount;
    const gatsbyPageData = data.allSitePage.edges;

    const pageTags = [];    
    const pubPages = [];
    const unpubPages = [];
    const pubPrograms = [];
    const unpubPrograms = [];
    const pages = data.allNodePage.edges;
    const programs = data.programs.edges;
    const tags = data.tags.edges;

    let pubPagesUntagged = [];
    let unpubPagesUntagged = [];
    
    let accordionData = data.accordion;
    
    // Fetch tags used on pages
    for (let i=0; i<tags.length; i++) {
        if (tags[i].node?.relationships?.node__page?.length > 0) {
            pageTags.push(tags[i])            
        }
    }
    // Sort pages into pubbed vs unpubbed
    for (let i=0; i<pages.length; i++) {
        if (pages[i].node.status === true) {
            pubPages.push(pages[i])
        } else {
            unpubPages.push(pages[i])
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
    // Collect untagged pages
    pubPagesUntagged = pubPages.filter(page => page.node.relationships.field_tags.length === 0);
    unpubPagesUntagged = unpubPages.filter(page => page.node.relationships.field_tags.length === 0);

    
    return (
    <Layout>
        <Seo title="Content Hub Webpage Inventory" />
        <div className="container page-container">
          <div className="site-content">
            <div className="content-area">
              <h1>Content Hub Webpage Inventory</h1>
              <p>Use this page to quickly find and preview your Content Hub webpages.</p>              
              <p>Pages are organized into 2 main sections: <a href="#published">Published</a> and <a href="#unpublished">Unpublished</a>. Under these sections, pages are divided up even further by their tags (ie. "Admission", "Convocation", "OAC", and so on). If a page has more than one tag, it will be listed more than once, with untagged pages listed at the end.</p>
              <p>When you create a new page, please be sure to tag it with the correct tag(s). It's possible to have more than one tag on a single page if that page either belongs to two different units or belongs to a micro-site. What does this mean? Check out the Tagging Scenarios below:</p>
              <h2>Tagging Scenarios</h2>
              {accordionData &&
                <div className="accordion mb-5" id={"accordion" + accordionData.id}>
                { accordionData.accordion.map( (item, index) =>
                    <div className="accordion-item" key={"item" + index}>
                        <h3 className="accordion-header" id={"heading" + index}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#part" + index} aria-expanded="false" aria-controls={"part" + index}>
                                {item.title !== "" ? item.title : "Read More"}
                            </button>
                        </h3>
                        <div id={"part" + index} className="accordion-collapse collapse" aria-labelledby={"heading" + index}>            
                            <div className="accordion-body" dangerouslySetInnerHTML={{__html: item.content}} />
                        </div>
                    </div>
                )}
                </div>
              }

              <p> If you are new to the Content Hub and your tags are not yet in our system, please contact the CCS team to have them added. Once it's added, you can create more pages and assign that tag without the help of CCS.</p>
              <h2>Want to quickly find your page?</h2>
              <p>"Control+F" (or "Command+F" on a Mac) is the keyboard shortcut for the Find command. While on this webpage, press the Ctrl key and the F key at the same time to bring up a search box in the top right corner of the screen.</p>
                <p>There are {count} webpages in the Content Hub at this time.</p>
              
              <h2 id="published">Published Content</h2>
              <h3>Basic Pages</h3>
              
              {pageTags.map((tag) => {
                const taggedPages = tag.node.relationships.node__page;
                const taggedPagesPubbed = taggedPages.filter(page => page.status === true);
                taggedPagesPubbed.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                return (taggedPagesPubbed.length > 0 && 
                  <React.Fragment key={`tagged-fragment-${tag.node.name}`}>
                    <h4 className="text-dark">{tag.node.name}</h4>
                    {tag.node.description?.processed && <div dangerouslySetInnerHTML={{__html: tag.node.description.processed}}></div>}
                    <p>Total pages: <strong>{taggedPagesPubbed.length}</strong></p>
                      <ul className="three-col-md">
                        {taggedPagesPubbed.map((taggedPage, index) => (
                            <li key={`tagged-${index}`}>{createLink(taggedPage.id, gatsbyPageData, taggedPage.path.alias, taggedPage.title)}</li>
                        ))}
                      </ul>
                  </React.Fragment>)
              })}
              
              <h4>Untagged Pages</h4>
              <p>Total: <strong>{pubPagesUntagged.length}</strong></p>
              <ul className="three-col-md">
                  {pubPagesUntagged.map((page) => (
                      <li key={page.node.drupal_id}>{createLink(page.node.id, gatsbyPageData, page.node.path.alias, page.node.title)}</li>
                  ))}
              </ul>

              <h3>Programs</h3>
              <p>Total: <strong>{pubPrograms.length}</strong></p>
              <ul className="three-col-md">
                  {pubPrograms.map((program) => (
                      <li key={program.node.drupal_id}><Link to={program.node.path.alias}>{program.node.title}</Link></li>
                  ))}
              </ul>
              
              <h2 id="unpublished">Unpublished Content</h2>
              <p>Unpublished pages and programs are only visible on preview and test sites.</p>
              
              {unpubPages.length > 0 && <h3>Basic Pages</h3>}
              {pageTags.map((tag) => {
                const taggedPages = tag.node.relationships.node__page;
                const taggedPagesUnpubbed = taggedPages.filter(page => page.status === false);
                taggedPagesUnpubbed.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                return (taggedPagesUnpubbed.length > 0 && 
                  <React.Fragment key={`tagged-fragment-${tag.node.name}`}>
                  <h4 className="text-dark">{tag.node.name}</h4> 
                  <p>Total: <strong>{taggedPagesUnpubbed.length}</strong></p>
                  <ul className="three-col-md">
                    {taggedPagesUnpubbed.map((taggedPage, index) => (
                      <li key={`tagged-${index}`}>{createLink(taggedPage.id, gatsbyPageData, taggedPage.path.alias, taggedPage.title)}</li>
                    ))}
                  </ul>
                </React.Fragment>)
              })}
              
              {unpubPagesUntagged.length > 0 && <>
                <h4>Untagged Pages</h4>
                <p>Total: <strong>{unpubPagesUntagged.length}</strong></p>
                <ul className="three-col-md">
                    {unpubPagesUntagged.map((page) => (
                      <li key={page.node.drupal_id}>{createLink(page.node.id, gatsbyPageData, page.node.path.alias, page.node.title)}</li>
                    ))}
                </ul>
            </>}
             
                            
              {unpubPrograms.length > 0 && <>
                <h3>Programs</h3>
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

export const query = graphql`{
  accordion: homeYaml(yamlId: {eq: "home_accordion"}) {
    id
    accordion {
      title
      content
    }
  }
  allSitePage {
    totalCount
    edges {
      node {
        pageContext
        path
      }
    }
  }
  allNodePage(sort: {title: ASC}) {
    edges {
      node {
        title
        drupal_id
        id
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
  programs: allNodeProgram(sort: {title: ASC}) {
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
  tags: allTaxonomyInterface(sort: {name: ASC}) {
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
}`
