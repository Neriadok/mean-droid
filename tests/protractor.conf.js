

// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.config = {
    allScriptsTimeout: 30000,
    getPageTimeout:30000,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args:['--no-sandbox']
        }
    },
    directConnect: true,
    baseUrl: 'http://localhost',

    // Specs here are the cucumber feature files
    specs: [
        './features/**/*.feature'
    ],

    // Use a custom framework adapter and set its relative path
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // cucumber command line options
    cucumberOpts: {
        // require step definition files before executing features
        require: [
            './steps/cucumber.hooks.ts',
            './steps/**/*.steps.ts'
        ],
        // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        tags: [],
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        format: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        compiler: []
    },

    // Enable TypeScript for the tests
    onPrepare() {
        require('ts-node').register({
            project: './tests/tsconfig.features.json'
        });
    }
};
