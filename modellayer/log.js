'use strict'
var bunyan = require('bunyan');
var fs = require("fs");
var config = require("config");

const logDir = 'logs';
//const env = process.env.NODE_ENV || 'development';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
var errorFileName = "";
var infoFileName = "";
const tsFormat = "2017-01-01"; // () => (new Date()).toUTCString();
if (config.has('logging.logFolderName')) {
    errorFileName = config.get('logging.logFolderName') + tsFormat + "-" + config.get('logging.infoLogFileName') + ".log";
    infoFileName = config.get('logging.logFolderName') + tsFormat + "-" + config.get('logging.errorLogFileName') + ".log";
}

exports.logger = bunyan.createLogger({
    name: 'myapp',
    streams: [{
            level: 'info',
            path: infoFileName //'./logs/info.log' // log INFO and above to stdout 
        },
        {
            level: 'error',
            type: 'rotating-file',
            path: errorFileName, //'./logs/foo.log',
            period: '1d', // daily rotation 
            count: 3
        }
    ]
});