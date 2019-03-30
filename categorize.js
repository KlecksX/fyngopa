const cv = require('opencv4nodejs');
const fs = require('fs');

let fileNames = fs.readdirSync('./training/all');

console.log(fileNames);

let keyStr = null;
let fileName = fileNames.pop();
let last = null;
let lastAction = null;
const delay = 10;

while (keyStr != " " && fileNames.length > 0) {

    if (keyStr == 'n') {
        console.log(`${fileName} marked as positive.`);
        fs.copyFileSync(`./training/all/${fileName}`, `./training/positive/${fileName}`);
        fs.unlinkSync(`./training/all/${fileName}`);
        lastAction = true;
        last = fileName;
        fileName = fileNames.pop();
    } else if (keyStr == 'm') {
        console.log(`${fileName} marked as negative.`);
        fs.copyFileSync(`./training/all/${fileName}`, `./training/negative/${fileName}`)
        fs.unlinkSync(`./training/all/${fileName}`);
        lastAction = false;
        last = fileName;
        fileName = fileNames.pop();
    } else if (keyStr == 'z' && last != null) {
        fileName = last;
        if(lastAction) {
            fs.copyFileSync(`./training/positive/${fileName}`, `./training/all/${fileName}`);
        } else {
            fs.copyFileSync(`./training/negative/${fileName}`, `./training/all/${fileName}`)
        }
    }

    if(fileName) {
        const img = cv.imread(`./training/all/${fileName}`);
        cv.imshow('Image', img);
    }

    keyStr = String.fromCharCode(cv.waitKey(delay));
}