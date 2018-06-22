"use strict";

const getConfig = require('../lib/getConfig'),
    jsonExtracted = require("../lib/jsonAnalyze"),
    helper = require("../lib/helper"),
    colors = require('colors');

const config = getConfig();
if (!config) return;

if (config.JSON && config.JSON.folderpath)
    if (((typeof config.JSON.folderpath != "undefined") &&
            (typeof config.JSON.folderpath.valueOf() == "string")) &&
        (config.JSON.folderpath.length > 0)) {
        // folder configurato
        const folder = config.JSON.folderpath;

        if (helper.isDirectory(folder));

        console.log(colors.success(`\n Found a JSON ${folder}  configured !`));

        var JSONfiles = helper.getJSONFiles(folder);

        // Go
        jsonExtracted.analyze(JSONfiles);
    } else {
        //fs.mkdirSync(directory);
        console.log(colors.error(`\n config.json > checking folder path: ${folder}`));
        console.log(colors.error(`\nATTENTION! Folder path is not valid or is not configurated in config.json!`));
    }
}