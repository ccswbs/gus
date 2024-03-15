/*******************************
 SCENARIO-SPECIFIC CONFIGURATION
********************************/
const url = process.env.BACKSTOPJS_URL;
const referenceUrl = process.env.BACKSTOPJS_REF;
const pathsToTest = {
    'Description of path': '/specific/url-alias',
}
/*********************************/

var pathConfig = {};
let scenariosToTest = [];

for (let [key, value] of Object.entries(pathsToTest)) {
    scenariosToTest.push({
        label: key,
        cookiePath: "",
        url: url + value,
        referenceUrl: referenceUrl + value,
        readySelector: "",
        hideSelectors: [],
        removeSelectors: [],
        hoverSelector: "",
        clickSelector: "",
        postInteractionWait: 0,
        selectorExpansion: true,
        selectors: [
            'document',
        ],
        readyEvent: null,
        delay: 1000,
        misMatchThreshold: 0.1,
        requireSameDimensions: true
    })
}

pathConfig.array = scenariosToTest;
module.exports = pathConfig;