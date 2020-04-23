/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Gatsby UG Starter Template",
    description: "Description of the site",
    author: "Author of site",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-106745064-4",
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby UG Starter Template`,
        short_name: `UG starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#000000`,
        display: `browser`,
        icon: `src/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
       resolve: `gatsby-source-drupal`,
       options: {
         baseUrl: `https://api.` + process.env._GATSBY_SOURCE + process.env._SITE + `.` + process.env._ZONE + `/`,
         apiBase: `jsonapi`, // optional, defaults to `jsonapi`
       },
    },
  ],
  mapping: {
    "node__page.fields.alias": `PathAlias`,
    "taxonomy_term__programs.fields.alias": `PathAlias`,
  },
}
