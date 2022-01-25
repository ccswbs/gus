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
    `gatsby-plugin-react-helmet`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
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
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
        // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL ||
          `https://news.uoguelph.ca/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
        type: {
          Event: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                  25
                : // and we don't actually need more than 5000 in production for this particular site
                  50,
          },
          Comment: {limit: 0},
          Menu: {limit: 0},
          Organizer: {limit: 0},
          MenuItem: {limit: 0},
          Taxonomy: {limit: 0},
          Category: {limit: 0},
          UserRole: {limit: 0},
          PostFormat: {limit: 0},
          Page: {limit: 0},
          Post: {limit: 0},
          ContentType: {limit: 0},
          Tag: {limit: 0},
          EventsCategory: {limit: 0},
          Venue: {limit: 0},
          User: {limit: 0},
          MediaItem: {limit: 0},
        },
      },
    }
  ],
  assetPrefix: process.env.ASSET_PREFIX,
}
