"use strict";
const fs = require("fs"),
	colors = require('colors');


const jsonDataListed = (results, errors, config) => {

	console.log('\n\n______________JSONS ANALYZED_____________');
	console.log(colors.success(`\nFound ${results.length} sizeGuide json\n`));


	var totalObj = JSON.stringify(results);
	var jsonNotWellFormed = JSON.stringify(errors);
	//console.log(totalObj);

	var stringtplList = [];

	results.forEach(detail => {

		let fittingList = [];
		let sizes = detail.sizes;

		if (sizes) {
			sizes.forEach(size => {
				//console.log(JSON.stringify(size));
				if (size.fitting) {
					fittingList.push(size.fitting);
					//console.log(JSON.stringify(size.fitting));
				}
			});
			JSON.stringify(fittingList);
		}
		if (detail.cod10) {
			let fittingListData = fittingList ? JSON.stringify(fittingList) : "empty fitting";
			let singlestringtpl = `cod10: ${detail.cod10}  --> fittings: ${fittingListData} \n`;
			stringtplList.push(singlestringtpl);

		}


	});

	fs.writeFile(
		"./json_report.txt",
		stringtplList,
		(err, data) => {
			if (err) return console.log(colors.error("Error writing report: " + err));
			console.log(colors.success('\nJSON report generated > json_report.txt'));
		}
	);

	var stringtplerrorList = [];
	var tot = 0;
	errors.forEach(detail => {
		++tot;
		stringtplerrorList.push(detail.json);
	});

	fs.writeFile(
		"./json_errors.txt",
		stringtplerrorList,
		(err, data) => {
			if (err) return console.log(colors.error("Error writing report: " + err));
			console.log(colors.error(`\nFOUND ${tot} JSON NOT WELL FORMED please, check the report > json_errors.txt`));
		}
	);


};


module.exports = {
	jsonDataListed
};