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
         baseUrl: `http://dev-bovey.pantheonsite.io/`,
         apiBase: `jsonapi`, // optional, defaults to `jsonapi`
       },
    },
	//{
    //  resolve: `gatsby-plugin-remote-images`,
    //  options: {
    //    nodeType: 'Page',
    //    imagePath: 'node.field_imageurl.uri',
     // },
	}
  ],
}
