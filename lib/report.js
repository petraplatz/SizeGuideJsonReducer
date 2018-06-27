"use strict";
const fs = require("fs"),
	colors = require('colors');


const jsonDataListed = (results, errors, config) => {
	const property = config.JSON.propertyToCheck;
	console.log('\n\n______________JSONS ANALYZED_____________');
	console.log(colors.success(`\rTOTAL Found ${results.length} sizeGuide json\n`));


	var totalObj = JSON.stringify(results);
	var jsonNotWellFormed = JSON.stringify(errors);
	//console.log(totalObj);

	var stringtplList = [];
	var emptyFittingCod10 = [];
	var totEmptyFitting = 0;
	var totFitting = 0;

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

		}

		if (detail.cod10) {
			if (fittingList && Object.keys(fittingList).length) {
				++totFitting;
				fittingList = fittingList.filter(function (item,  pos)  {    
					return  fittingList.indexOf(item)  ==  pos;
				})
				let fittingListData = JSON.stringify(fittingList);
				let singlestringtpl = `${detail.cod10}  --> ${property}: ${fittingListData}\n`;
				stringtplList.push(singlestringtpl);
			} else {
				++totEmptyFitting;
				let singlestringtpl = `${detail.cod10}\n`;
				emptyFittingCod10.push(singlestringtpl);
			}

		}


	});

	// JSON Found with fitting
	fs.writeFile(
		"./json_report.txt",
		stringtplList,
		(err, data) => {
			if (err) return console.log(colors.error("Error writing report: " + err));
			console.log(colors.success(`\nFound ${totFitting} sizeGuide json ${property} data\r`));
			console.log(colors.success('JSON report generated > json_report.txt\n\n'));
		}
	);

	// JSON Found without fitting
	var propertyReportFileName = `./empty-${property}Json_report.txt`;
	fs.writeFile(
		propertyReportFileName,
		emptyFittingCod10,
		(err, data) => {
			if (err) return console.log(colors.error("Error writing report: " + err));
			console.log(colors.success(`\nFound ${totEmptyFitting} sizeGuide json with empty ${property}\r`));
			console.log(colors.success(`JSON report generated > ${propertyReportFileName}\n\n`));
		}
	);



	// ERRORS REPORT
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