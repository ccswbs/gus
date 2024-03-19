# UG BackstopJS Visual Regression Test Suite
This sweet suite lets you run local BackstopJS visual regression tests on our frontend development. Use it when testing deployed pull requests.

## Setup

- Run `npm ci` in our main repo directory
- Add the following environment variables:
  - `BACKSTOPJS_URL`: This is the URL you are testing
  - `BACKSTOPJS_REF`: This is the URL showing how things *should* appear. It will be used to generate your reference screenshots before running visual regression tests.

## Run our default visual regression test
1. To set up your initial reference screenshots, run `backstop test --config=./backstop.config.js`
1. If the reference screenshots look good, run `backstop approve --config=./backstop.config.js`
1. To run a visual regression test, run `backstop test --config=./backstop.config.js`

**Tip:** If you want to skip the approval process, you can just run `backstop reference --config=./backstop.config.js --scenario=testScenario` instead of running `test` then `approve`.

## Run a specific test scenario (e.g., just the header)

1. Navigate to `config/backstop` to see a list of scenarios available for testing.
1. Take note of the filename associated with the scenario you wish to test (e.g., `uofg-header`).
1. To generate reference screenshots for that scenario, run `backstop reference --config=./backstop.config.js  --scenario=uofg-header`
1. To run a visual regression test against those screenshots, run `backstop test --config=./backstop.config.js  --scenario=uofg-header`

## Create new scenarios for testing
You can create additional scenarios for testing our frontend development.

1. Navigate to `./config/backstop` 
1. Create a copy of `sample-config.js`.
1. Rename the file using a unique name for the scenario.
1. Fill in the pathsToTest variable with all the URL aliases you wish to test 
1. Update the [BackstopJS scenario properties](https://github.com/garris/BackstopJS?tab=readme-ov-file#scenario-properties) as you see fit (e.g., you can remove dynamic site elements using removeSelectors or hideSelectors.)
1. Test your configuration file by running `backstop reference --config=./backstop.config.js  --scenario=unique-name` and `backstop test --config=./backstop.config.js  --scenario=unique-name`
1. If all works as expected, commit your configuration file to the repository.

## Tips for running backstopJS on a Windows machine
1. Use Windows Subsystem 2
1. Install Google Chrome
1. Precede your backstop commands with `npx`