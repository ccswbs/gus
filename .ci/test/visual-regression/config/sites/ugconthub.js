/*******************************
 SITE-SPECIFIC CONFIGURATION
********************************/
const liveURL = "https://liveugconthubstorage.z13.web.core.windows.net";
const testURL = "https://testugconthubstorage.z13.web.core.windows.net";
const pathsToTest = {
    'Homepage': '/',
    'Choose U of G': '/choose-u-of-g',
    'Landing Page - A Place to Grow':'/topics/a-place-to-grow',
    'Basic Page - Study STEM': '/study-stem',
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
        removeSelectors: [
            ".ug-instagram",
        ],
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