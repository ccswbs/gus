const arguments = require("minimist")(process.argv.slice(2));
let scenario = arguments.scenario == null ? "default" : arguments.scenario;
let scenarios;

try {

  if (process.env.BACKSTOPJS_URL == null || process.env.BACKSTOPJS_REF == null) {
    console.log("-------------------------------------------------------");
    console.error("ERROR: Environment variables BACKSTOPJS_URL and BACKSTOPJS_REF are null or undefined.\n");
    console.debug("FIX: Ensure the environment variables BACKSTOPJS_URL and BACKSTOPJS_REF are properly set.\n");
    console.debug("- BACKSTOPJS_URL is the URL you are testing.");
    console.debug("- BACKSTOPJS_REF is the URL showing how things should appear (i.e., your reference URL");
    console.log("-------------------------------------------------------");
  } else {
    // Load scenario test configuration
    console.log("-------------------------------------------------------");
    console.log("Scenario: " + scenario);
    console.log("Testing URL: " + process.env.BACKSTOPJS_URL);
    console.log("Reference URL: " + process.env.BACKSTOPJS_REF);
    console.log("-------------------------------------------------------");

    let pathConfig = require("./config/backstop/" + scenario + ".js");
    scenarios = pathConfig.array;

    module.exports = {
      id: scenario,
      viewports: [
        {
          name: "phone",
          width: 320,
          height: 480,
        },
        {
          name: "tablet",
          width: 1024,
          height: 768,
        },
        {
          name: "desktop",
          width: 1920,
          height: 1080,
        },
      ],
      scenarios: scenarios,
      paths: {
        bitmaps_reference: "backstop_data/" + scenario + "/bitmaps_reference",
        bitmaps_test: "backstop_data/" + scenario + "/bitmaps_test",
        html_report: "backstop_data/" + scenario + "/html_report",
        ci_report: "backstop_data/" + scenario + "/ci_report",
      },
      report: ["browser", "CI"],
      debug: false,
      engine: "puppeteer",
      engineOptions: {
        args: ["--no-sandbox"],
      },
      asyncCaptureLimit: 5,
      asyncCompareLimit: 50,
      debug: false,
      debugWindow: false,
    };
    console.log("Success! Your test is running.");
  }
} catch (error) {
  console.error("ERROR: Unable to load configuration '" + scenario + "'.");
  console.debug("Tip 1: Confirm the file /config/scenarios/" + scenario + ".js exists.");
  console.debug("Tip 2: Ensure your environment variables BACKSTOPJS_URL and BACKSTOPJS_REF are properly set.");
  console.debug("Tip 3: Get up and stretch. Then consider the problem again.");
  console.log("-------------------------------------------------------");
}
