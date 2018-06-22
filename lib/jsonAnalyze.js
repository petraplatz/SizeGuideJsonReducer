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
const folder = config.JSON.folderpath;



const analyze = (JSONfiles, onComplete) => {

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
            var mysizes = [];

            //sizes
            if (data.headers) {
                mysizes = data.headers;
                var mycod10sizes = [];

                mysizes.forEach(size => {

                    if (size.fitting && size.value) {
                        mycod10sizes.push({
                            "fitting": size.fitting,
                            "size": size.value
                        });
                    }
                });
            }

            public_cod10.push({
                "json": jsonpath,
                "cod10": mycod10[0],
                "sizes": mycod10sizes
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