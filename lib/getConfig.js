const fs = require("fs");
const colors = require('colors');

module.exports = () => {
    var config;

    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        success: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    });
    try {


        config = JSON.parse(
            fs.readFileSync('./config.json')
        )
    } catch (e) {
        console.error("Error reading configuration", e);
        return;
    }
    if (!(config.JSON && config.JSON.folderpath)) {
        console.error("Error in JSON configuration",
            "Folder path value must be provided",
            config);
        return;
    }
    console.log("configuration read !");
    return config;
};