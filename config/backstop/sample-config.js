/*******************************
 SCENARIO-SPECIFIC CONFIGURATION
********************************/
const url = process.env.BACKSTOPJS_URL;
const referenceUrl = process.env.BACKSTOPJS_REF;
const pathsToTest = {
  "Description of path": "/specific/url-alias",
};
/*********************************/

var pathConfig = {};
let scenariosToTest = [];

for (let [key, value] of Object.entries(pathsToTest)) {
  scenariosToTest.push({
    label: key,
    cookiePath: "",
    url: url + value,
    referenceUrl: referenceUrl + value,
    readyEvent: null,
    readySelector: "",
    delay: 1000,
    hideSelectors: ["div[data-netlify-deploy-id]"],
    removeSelectors: [],
    hoverSelector: "",
    clickSelector: "",
    postInteractionWait: 0,
    selectors: ["document"],
    selectorExpansion: true,
    expect: 0,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
  });
}

pathConfig.array = scenariosToTest;
module.exports = pathConfig;
