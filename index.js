const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

const dbUpdater = require('./Database/DatabaseUpdater');

var myArgs = process.argv.slice(2);

if(myArgs[0].length > 0){
    dbUpdater.setPath(myArgs[0]);
    console.log("Reading from path: " + myArgs[0]);
    dbUpdater.update();
}


