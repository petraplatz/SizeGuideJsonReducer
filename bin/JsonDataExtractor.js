"use strict";

const getConfig = require('../lib/getConfig'),
    jsonAnalyzer = require("../lib/jsonAnalyze"),
    helper = require("../lib/helper"),
    colors = require('colors');

const config = getConfig();
if (!config) return;

if (config.JSON && config.JSON.originfolderpath) {
    if (((typeof config.JSON.originfolderpath != "undefined") &&
            (typeof config.JSON.originfolderpath.valueOf() == "string")) &&
        (config.JSON.originfolderpath.length > 0)) {
        // folder configuration
        const folder = config.JSON.originfolderpath;

        if (helper.isDirectory(folder)) {

            console.log(colors.success(`\n Found a JSON ${folder}  configured !`));

            var JSONfiles = helper.getJSONFiles(folder);

            // Go
            jsonAnalyzer.analyze(JSONfiles);
        } else {
            //fs.mkdirSync(directory);
            console.log(colors.error(`\n config.json > checking folder path: "${folder}"`));
            console.log(colors.error(`\n ATTENTION! Folder path is not valid or is not configurated in config.json!`));
        }
    }
}