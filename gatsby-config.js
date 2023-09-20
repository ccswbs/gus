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
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 90,
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
      resolve: `gatsby-source-wordpress`,
      options: {
        catchLinks: false,
        url:
        // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL ||
          `https://live-ug-news.pantheonsite.io/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
          perPage: 20,
          requestConcurrency: 5,
          previewRequestConcurrency: 2,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
        type: {
          Event: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 25 posts in development to make it easy on ourselves (aka. faster).
                  5
                : // and we don't actually need more than 50 in production for this particular site
                  50,
          },
          Comment: {exclude: true},
          Menu: {exclude: true},
          MenuItem: {exclude: true},
          Taxonomy: {exclude: true},
          Category: {exclude: true},
          UserRole: {exclude: true},
          PostFormat: {exclude: true},
          Page: {exclude: true},
          Post: {exclude: true},
          Tag: {exclude: true},
          User: {exclude: true},
        },
      },
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