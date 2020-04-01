let arguments = require('minimist')(process.argv.slice(2));
let siteName = arguments.sitename;
let scenarios;

try{
    // Load site testing configuration
    console.log("##[DEBUG] Attempting to load test configuration file at config/sites/" + siteName + ".js.");
    let pathConfig = require('./config/sites/' + siteName + '.js');
    scenarios = pathConfig.array;
    console.log("##[DEBUG] Test configuration successfully loaded.");
}
catch(error) {
    console.log("##[WARNING] Test configuration file not found at config/sites/" + siteName + ".js. Attempting to test homepage only.");

    let testURL = (arguments.testURL == null) ? "" : arguments.testURL;
    let liveURL = (arguments.liveURL == null) ? "" : arguments.liveURL;

    if ((testURL == "")||(liveURL == "")){
        console.log("##[ERROR] Missing arguments for --testURL or --liveURL. Unable to run tests.")
        console.log("##[DEBUG] To Fix: Try adding a site configuration file at config/sites/" + siteName + ".js.");

        scenarios = [
            {
                label: 'Homepage',
                url: liveURL,
                referenceUrl: testURL,
            }
        ]
    }else{
        scenarios = [
            {
                label: 'Homepage',
                cookiePath: "",
                url: liveURL,
                referenceUrl: testURL,
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
            }
        ];
    }
}

module.exports = {
    id: siteName,
    viewports: [{
            name: 'phone',
            width: 320,
            height: 480
        },
        {
            name: "desktop",
            width: 1920,
            height: 1080
        }
    ],
    scenarios: scenarios,
    paths: {
        bitmaps_reference: 'backstop_data/' + siteName + '/bitmaps_reference',
        bitmaps_test: 'backstop_data/' + siteName + '/bitmaps_test',
        html_report: 'backstop_data/' + siteName + '/html_report',
        ci_report: 'backstop_data/' + siteName + '/ci_report'
    },
    ci: {
        testReportFileName: siteName,
        testSuiteName: siteName,
    },
    report: ['CI'],
    debug: false,
    engine: 'puppeteer',
    engineOptions: {
        args: ['--no-sandbox']
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false
};