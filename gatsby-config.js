/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

let metaConfig = require('./config/sites/ugconthub.js');

if ((metaConfig === null) || (metaConfig === undefined)) {
    metaConfig['title'] = "Gatsby UG Starter Template";
    metaConfig['description'] = "Description of the site";
    metaConfig['author'] = "Author of site";
    metaConfig['ogImage'] = "",
    metaConfig['ogImageAlt'] = "",
    metaConfig['GAtrackingID'] = "";
    metaConfig['menus'] = "";
}

module.exports = {
  siteMetadata: {
    title: metaConfig['title'],
    description: metaConfig['description'],
    author: metaConfig['author'],
    ogImage: metaConfig['ogImage'],
    ogImageAlt: metaConfig['ogImageAlt'],
    menus: metaConfig['menus'],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-preact`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: metaConfig['GAtrackingID'],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // defaults to true - changed to false to mute SVG warnings
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 90,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
      },
    },

    {
      resolve: `gatsby-source-drupal`,
        options: {
        baseUrl: process.env.DRUPAL_BASEURL,
        apiBase: process.env.DRUPAL_APIBASE,
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
      },
    },
    {
      resolve: `gatsby-source-drupal-menu-links`,
      options: {
        baseUrl: process.env.DRUPAL_BASEURL,
        apiBase: process.env.DRUPAL_APIBASE,
        menus: metaConfig['menus'], // Which menus to fetch, there are the menu IDs.
      },
    },    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },    
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        url: `https://dev-ug-news.pantheonsite.io/graphql`,
      },
    },    
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-NRSSDKW",
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://livechugendpoint.azureedge.net/`,
        sitemap: null,
        policy: [{ userAgent: '*', allow: ['/*.jpg', '/*.gif', '/*.png'], disallow: '/' }]
      }
    }
  ],
  assetPrefix: process.env.ASSET_PREFIX,
}
