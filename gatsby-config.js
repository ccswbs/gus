/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

/**
 * Set the gatsbySource variable to the pantheon prefex - live, dev, test, or your multidev
 */
//  let gatsbySource = 'live';
// let gatsbySource = 'pantheionsorce prefex';

 let gatsbySource = 'chugstats';

let protocal = (gatsbySource === 'live' || gatsbySource === 'dev' || gatsbySource === 'test') ? "https://api.": "http://";
let sitename = (gatsbySource === 'live' || gatsbySource === 'dev' || gatsbySource === 'test') ? "ugconthub": "-bovey";
let zone = (gatsbySource === 'live' || gatsbySource === 'dev' || gatsbySource === 'test')? "uoguelph.dev": "pantheonsite.io";

let _protocol = process.env._PROTOCOL || protocal
let _site = process.env._SITE || sitename;
let _env  = process.env._GATSBY_SOURCE || gatsbySource;
let _zone = process.env._ZONE || zone;

let metaConfig = require('./config/sites/' + _site + '.js');

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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: metaConfig['GAtrackingID'],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-preact`,
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
         baseUrl: _protocol + _env + _site + `.` + _zone + `/`,
         /** NOTE: do not use this see comment about gatsybSource variable at the top of the file **/
        /** For dev purposes, comment the line above and uncomment the appropriate line below: **/
         //baseUrl: `https://api.devugconthub.uoguelph.dev/`,
         //baseUrl: `https://api.liveugconthub.uoguelph.dev`,
         //baseUrl: `http://multidev-bovey.pantheonsite.io/`,
         apiBase: `jsonapi`, // optional, defaults to `jsonapi`
       },
    },
	{
      resolve: `gatsby-source-drupal-menu-links`,
      options: {
		  baseUrl: _protocol + _env + _site + `.` + _zone,
      /** NOTE: do not use this see comment about gatsybSource variable at the top of the file **/
		  /** For dev purposes, comment the line above and uncomment the appropriate line below: **/
		  //baseUrl: `https://api.devugconthub.uoguelph.dev`,
		  //baseUrl: `https://api.liveugconthub.uoguelph.dev`,
		  //baseUrl: `http://multidev-bovey.pantheonsite.io`,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
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
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-NRSSDKW",
        includeInDevelopment: false,
      },
    },
  ],
  mapping: {
    "node__article.fields.alias": `PathAlias`,
    "node__page.fields.alias": `PathAlias`,
    "node__program.fields.alias": `PathAlias`,
  },
  assetPrefix: "/assets/",
}
