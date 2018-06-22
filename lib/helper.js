'use strict';
const fs = require('fs'),
    path = require('path');

const getJSONFiles = function (filePath) {
    return fs.readdirSync(filePath).filter(function (entry) {
        const isDirectory = fs.lstatSync(path.join(filePath, entry)).isDirectory();
        const isJSON = path.extname(entry) === '.json';
        return !isDirectory && isJSON;
    });
};

/**
 * exports function
 */

const helper = Object.assign({
    getJSONFiles: getJSONFiles
});

module.exports = helper;