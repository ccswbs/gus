import { graphql, Link } from "gatsby";
import Layout from "components/layout";
import React from "react";
import Seo from "components/seo";

const IndexPage = ({ data }) => {
  const tags = data.tags.edges;
  let pubPages = data.pubPages.edges;
  let unpubPages = data.unpubPages.edges;
  let pubPrograms = data.pubPrograms.edges;
  let unpubPrograms = data.unpubPrograms.edges;
  let pageTags;

  // Fetch tags used on pages
  pageTags = tags.filter((tag) => tag.node?.relationships?.node__page?.length > 0);

  // BUG FIX: remove stray content with null aliases
  pubPages = pubPages.filter((page) => page.node.path.alias != null);
  unpubPages = unpubPages.filter((page) => page.node.path.alias != null);
  pubPrograms = pubPrograms.filter((program) => program.node.path.alias != null);
  unpubPrograms = unpubPrograms.filter((program) => program.node.path.alias != null);

  // Collect untagged pages
  let pubPagesUntagged = pubPages.filter((page) => page.node?.relationships?.field_editorial_access?.length === 0);
  let unpubPagesUntagged = unpubPages.filter((page) => page.node?.relationships?.field_editorial_access?.length === 0);

  return (
    <Layout>
      <Seo title="Content Hub Webpage Inventory" />
      <div className="container page-container">
        <div className="site-content">
          <div className="content-area">
            <h1>Content Hub Webpage Inventory</h1>
            <p>Use this page to quickly find and preview your Content Hub webpages.</p>
            <p>
              Pages are organized into 2 main sections: <a href="#published">Published</a> and{" "}
              <a href="#unpublished">Unpublished</a>. Under these sections, pages are divided up even further by their
              Editorial Access group (ie. "Admissions", "College of Arts (COA)", "OVC", and so on). If a page belongs to more than one Editorial Access group, it will be
              listed multiple times. Pages without an Editorial Access group will appear at the end. <strong>Note that if you do not set an Editorial Access group when creating your content, it can be updated by any user with the editor or publisher role.</strong>
            </p>

            <h2>Want to quickly find your page?</h2>
            <p>
              "Control+F" (or "Command+F" on a Mac) is the keyboard shortcut for the Find command. While on this
              webpage, press the Ctrl key and the F key at the same time to bring up a search box in the top right
              corner of the screen.
            </p>

            <h2 id="published">Published Content</h2>
            <h3>Basic Pages ({pubPages.length} total)</h3>

            {pageTags.map((tag) => {
              const taggedPages = tag.node.relationships.node__page;
              const taggedPagesPubbed = taggedPages.filter(
                (page) => page.moderation_state === "published" && page.path.alias != null
              );
              taggedPagesPubbed.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));
              return (
                taggedPagesPubbed.length > 0 && (
                  <React.Fragment key={`tagged-fragment-${tag.node.name}`}>
                    <h4 className="text-dark">{tag.node.name}</h4>
                    {tag.node.description?.processed && (
                      <div dangerouslySetInnerHTML={{ __html: tag.node.description.processed }}></div>
                    )}
                    <p>
                      Total pages: <strong>{taggedPagesPubbed.length}</strong>
                    </p>
                    <ul className="three-col-md">
                      {taggedPagesPubbed.map((taggedPage, index) => (
                        <li key={`tagged-${index}`}>
                          <Link to={taggedPage.path.alias.toLowerCase()}>{taggedPage.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                )
              );
            })}

            <h4>Pages without an Editorial Access group</h4>
            <p>
              Total: <strong>{pubPagesUntagged.length}</strong>
            </p>
            <ul className="three-col-md">
              {pubPagesUntagged.map((page) => (
                <li key={page.node.drupal_id}>
                  <Link to={page.node.path.alias.toLowerCase()}>{page.node.title}</Link>
                </li>
              ))}
            </ul>

            <h3>Programs built using the Program content type ({pubPrograms.length} total)</h3>
            <p>
              <strong>Note:</strong> these are not basic pages and their appearance is ultimately controlled by the hardcoded Program template.
            </p>
            <ul className="three-col-md">
              {pubPrograms.map((program) => (
                <li key={program.node.drupal_id}>
                  <Link to={program.node.path.alias.toLowerCase()}>{program.node.title}</Link>
                </li>
              ))}
            </ul>

            <h2 id="unpublished">Unpublished Content</h2>
            <p>Unpublished pages and programs are only visible on preview and test sites.</p>

            {unpubPages.length > 0 && <h3>Basic Pages ({unpubPages.length} total)</h3>}
            {pageTags.map((tag) => {
              const taggedPages = tag.node.relationships.node__page;
              const taggedPagesUnpubbed = taggedPages.filter(
                (page) => page.moderation_state === "draft" && page.path.alias != null
              );
              taggedPagesUnpubbed.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));
              return (
                taggedPagesUnpubbed.length > 0 && (
                  <React.Fragment key={`tagged-fragment-${tag.node.name}`}>
                    <h4 className="text-dark">{tag.node.name}</h4>
                    <p>
                      Total: <strong>{taggedPagesUnpubbed.length}</strong>
                    </p>
                    <ul className="three-col-md">
                      {taggedPagesUnpubbed.map((page, index) => (
                        <li key={`tagged-${index}`}>
                          <Link to={page.path.alias.toLowerCase()}>{page.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                )
              );
            })}

            {unpubPagesUntagged.length > 0 && (
              <>
                <h4>Pages without an Editorial Access group</h4>
                <p>
                  Total: <strong>{unpubPagesUntagged.length}</strong>
                </p>
                <ul className="three-col-md">
                  {unpubPagesUntagged.map((page) => (
                    <li key={page.node.drupal_id}>
                      <Link to={page.node.path.alias.toLowerCase()}>{page.node.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {unpubPrograms.length > 0 && (
              <>
                <h3>Programs built using the Program content type ({unpubPrograms.length} total)</h3>
                <p>
                  <strong>Note:</strong> these are not basic pages and their appearance is ultimately controlled by the hardcoded Program template.
                </p>
                <ul className="three-col-md">
                  {unpubPrograms.map((program) => (
                    <li key={program.node.drupal_id}>
                      <Link to={program.node.path.alias.toLowerCase()}>{program.node.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    pubPages: allNodePage(
      filter: { moderation_state: { eq: "published" }, path: { alias: { ne: null } } }
      sort: { title: ASC }
    ) {
      edges {
        node {
          title
          drupal_id
          id
          path {
            alias
          }
          relationships {
            field_editorial_access {
              __typename
              ... on TaxonomyInterface {
                drupal_id
                id
                name
              }
            }
          }
        }
      }
    }
    unpubPages: allNodePage(
      filter: { moderation_state: { eq: "draft" }, path: { alias: { ne: null } } }
      sort: { title: ASC }
    ) {
      edges {
        node {
          title
          drupal_id
          id
          path {
            alias
          }
          relationships {
            field_editorial_access {
              __typename
              ... on TaxonomyInterface {
                drupal_id
                id
                name
              }
            }
          }
        }
      }
    }
    pubPrograms: allNodeProgram(
      filter: { moderation_state: { eq: "published" }, path: { alias: { ne: null } } }
      sort: { title: ASC }
    ) {
      edges {
        node {
          drupal_id
          drupal_internal__nid
          title
          path {
            alias
          }
        }
      }
    }
    unpubPrograms: allNodeProgram(
      filter: { moderation_state: { eq: "draft" }, path: { alias: { ne: null } } }
      sort: { title: ASC }
    ) {
      edges {
        node {
          drupal_id
          drupal_internal__nid
          title
          path {
            alias
          }
        }
      }
    }
    tags: allTaxonomyInterface(sort: { name: ASC }) {
      edges {
        node {
          ... on taxonomy_term__editorial_access {
            name
            description {
              processed
            }
            relationships {
              node__page {
                moderation_state
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
`;
