
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });
const fs = require('fs');

const scansDAO = require('./Database/DAO/scans');

const pathPerpetual = "C:/PAAA/PERPETUAL/";

// const pathPerpetual = __dirname + "/PAAA/PERPETUAL/";
// const cliProgress = require('cli-progress');
 
// create new container
// const loadBar = new cliProgress.MultiBar({
//     clearOnComplete: false,
//     hideCursor: true
 
// }, cliProgress.Presets.shades_grey);

// let bar = null;

// let currentItem = 0;
// let maxItems = 1;


async function generatePerpetual() {
    console.log("Connecting to database....");
    const scans = await scansDAO.getForPerpetual();
    console.log("Starting files...");

    // maxItems = scans.length;
    // bar = loadBar.create(maxItems, 0);
    scans.forEach(scan => {
        generateFile(scan)
    });
}


function generateFile(scan) {
    const client = 'ala';
    const bundle = scan.bundle;
    const ticket = scan.ticket;
    const operation = scan.operation;
    const empnum = scan.empnum;
    const opcode = scan.opstyseq;

    const finishDate = scan.end_time;
    const date = ((finishDate.getMonth() > 8) ? (finishDate.getMonth() + 1) : ('0' + (finishDate.getMonth() + 1))) + '/' + ((finishDate.getDate() > 9) ? finishDate.getDate() : ('0' + finishDate.getDate())) + '/' + finishDate.getFullYear();
    const time = finishDate.toTimeString().split(' ')[0];

    const sequence = `${client}-${operation}-${ticket}`;
    const fileName = `${sequence}.txt`;


    let fileContent = "sequence	date	time	empnum	bundle	opcode	processed \n";
    fileContent += `${sequence}	${date}	${time}	${empnum}	${bundle}	${operation}	`;
    fs.writeFile(pathPerpetual + '/' + fileName, fileContent, async function (err) {
        if (err) throw err;
        await scansDAO.sent(empnum, ticket);
        console.log(fileName + " - Saved!");

        // currentItem++;
        // bar.update(currentItem, {filename: fileName});
        // currentItem >= maxItems ? bar.stop() : null;
    });
}



generatePerpetual();