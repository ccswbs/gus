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
    metaConfig['GAtrackingID'] = "";
    metaConfig['IGuser'] = "";
    metaConfig['menus'] = "";
}

module.exports = {
  siteMetadata: {
    title: metaConfig['title'],
    description: metaConfig['description'],
    author: metaConfig['author'],
    menus: metaConfig['menus'],
  },
  plugins: [
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
        baseUrl: process.env.DRUPAL_BASEURL,
        apiBase: process.env.DRUPAL_APIBASE,
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
        fastBuilds: true,
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
      resolve: `gatsby-source-instagram`,
      options: {
        username: metaConfig['IGuser'],        
      },
    },
    {
      resolve: `gatsby-plugin-asset-path`,
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
        host: `https://liveugconthub.uoguelph.dev`,
        policy: [{ userAgent: '*', disallow: '/' }]
      }
    }
  ],
  mapping: {
    "node__article.fields.alias": `PathAlias`,
    "node__page.fields.alias": `PathAlias`,
    "node__program.fields.alias": `PathAlias`,
  },
  assetPrefix: "/assets/",
}
