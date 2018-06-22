"use strict";

const getConfig = require('../lib/getConfig'),
    jsonExtracted = require("../lib/jsonAnalyze"),
    helper = require("../lib/helper"),
    colors = require('colors');

const config = getConfig();
if (!config) return;


const folder = config.JSON.folderpath;

console.log(colors.success(`\n Found a JSON ${folder}  configured !`));

var JSONfiles = helper.getJSONFiles(folder);

// Go
jsonExtracted.analyze(JSONfiles);