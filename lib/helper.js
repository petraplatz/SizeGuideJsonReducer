'use strict';
const fs = require('fs'),
    path = require('path');


const isDirectory = function (directorypath) {
    try {
        fs.statSync(directorypath);
        return true;
    } catch (e) {
        return false;
    }

};

const getJSONFiles = function (filePath) {
    return fs.readdirSync(filePath).filter(function (entry) {
        const thisisDirectory = fs.lstatSync(path.join(filePath, entry)).isDirectory();
        const isJSON = path.extname(entry) === '.json';
        return !thisisDirectory && isJSON;
    });
};

const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
    }, {})


/**
 * exports function
 */

const helper = Object.assign({
    getJSONFiles: getJSONFiles,
    isDirectory: isDirectory,
    arrayToObject: arrayToObject
});

module.exports = helper;