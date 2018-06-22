'use strict';
const fs = require('fs'),
    path = require('path');


const isDirectory = function (directorypath) {
    fs.lstatSync(directorypath).isDirectory();
};

const getJSONFiles = function (filePath) {
    return fs.readdirSync(filePath).filter(function (entry) {
        const thisisDirectory = isDirectory(path.join(filePath, entry));
        const isJSON = path.extname(entry) === '.json';
        return !thisisDirectory && isJSON;
    });
};

/**
 * exports function
 */

const helper = Object.assign({
    getJSONFiles: getJSONFiles,
    isDirectory: isDirectory
});

module.exports = helper;