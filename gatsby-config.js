/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const adapter = require("gatsby-adapter-netlify").default
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
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: true,
  }),
  assetPrefix: process.env.ASSET_PREFIX,
  siteMetadata: {
    title: metaConfig['title'],
    description: metaConfig['description'],
    author: metaConfig['author'],
    ogImage: metaConfig['ogImage'],
    ogImageAlt: metaConfig['ogImageAlt'],
    menus: metaConfig['menus'],
  },
  plugins: [
    `gatsby-plugin-client-side-redirect`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: metaConfig['GAtrackingID'],
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
    },
    {
      resolve: `gatsby-source-drupal`,
        options: {
        baseUrl: process.env.DRUPAL_BASEURL,
        apiBase: process.env.DRUPAL_APIBASE,
        headers: {
          'api-key': process.env.API_KEY,
        },
        fastBuilds: process.env.FASTBUILDS || true,
        skipFileDownloads: true,
        requestTimeoutMS: 300000,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      }
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // defaults to true - changed to false to mute SVG warnings
        checkSupportedExtensions: false,
      },
    },    
  ],  
}