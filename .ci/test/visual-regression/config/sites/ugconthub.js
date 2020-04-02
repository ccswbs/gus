/*******************************
 SITE-SPECIFIC CONFIGURATION
********************************/
const liveURL = "https://liveugconthub.uoguelph.dev";
const testURL = "https://testugconthubstorage.z13.web.core.windows.net";
const pathsToTest = {
    'Homepage': '/',
}
/*********************************/

var pathConfig = {};
let scenariosToTest = [];

for (let [key, value] of Object.entries(pathsToTest)) {
    scenariosToTest.push({
        label: key,
        cookiePath: "",
        url: testURL + value,
        referenceUrl: liveURL + value,
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