"use strict";

const getConfig = require("../lib/getConfig"),
    helper = require("../lib/helper"),
    fs = require('fs'),
    path = require('path'),
    report = require("../lib/report"),
    colors = require('colors');

// configuration   
const config = getConfig();
if (!config) return;
const folder = config.JSON.originfolderpath;


const searchData = (data, property, mysizes) => {
    if (typeof (data) == 'object') {
        Object.entries(data).forEach(
            ([key, value]) => {
                //console.log(`${typeof(value[property])} <-- property typeof`);

                if ((typeof (value[property])) == "undefined") {
                    if (typeof (value) == "object") {
                        searchData(value, property, mysizes);
                    }
                } else {
                    //console.log(`${property} <-- property`);
                    if (value[property] != "") {
                        //console.log(`${property} found !!! ------------ ${value[property]} <--`);
                        mysizes.push(value);
                    }
                }

            });
    }
}

const checkDataBlock = (isBlockActive, data, block) => {
    const property = config.JSON.propertyToCheck;
    //sizes inside block
    if (isBlockActive && data) {
        console.log(`...running check property: ${property} on block ${block}\n`);
        var mysizes = [];
        searchData(data, property, mysizes);

        var mycod10sizes = [];
        if (typeof (mysizes) != "undefined") {
            mysizes.forEach(size => {

                if (size[property] && size.value) {
                    mycod10sizes.push({
                        [property]: size[property],
                        "size": size.value
                    });
                }
            });
        }
        return mycod10sizes;
    } else {
        console.log(`no block activated in configuration ?\n`);
    }
}

const analyze = (JSONfiles) => {

    console.log("\n\n Fetching json from", folder);

    var public_cod10 = [];
    var error_cod10 = [];
    const regex = "[0-9]{8}[A-Za-z]{2}";
    var tester = new RegExp(regex);

    JSONfiles.forEach(jsonpath => {
        //measurements_12165374DX.json
        var data;
        var mycod10 = tester.exec(jsonpath);

        var jsonfile = fs.readFileSync(folder + "\\" + jsonpath);

        try {
            data = JSON.parse(jsonfile);
            //console.log(jsonContent);
            var dataSizes = [];

            const activeblocks = config.JSON.blocks;
            Object.entries(activeblocks).forEach(
                ([key, value]) => {
                    if (value) {
                        console.log(" ----------------------- COD10: " + mycod10);
                        dataSizes = checkDataBlock(value, data[key], key);
                    }
                }
            );

            // each block each array ?
            public_cod10.push({
                "json": jsonpath,
                "cod10": mycod10[0],
                "sizes": dataSizes
            });

        } catch (e) {
            console.log(colors.error('\n\n cod10: ' + mycod10[0] + '  Shit Found in this  json ' + jsonpath + ' !\n'));
            console.log(colors.warn('\n_______________ERROR_STACK______________\n'));
            console.log(colors.warn(e));
            error_cod10.push({
                "json": jsonpath
            });
            console.log(colors.warn('\n________________________________________'));
        }
    });

    report.jsonDataListed(public_cod10, error_cod10, config);

};



module.exports = {
    analyze
};