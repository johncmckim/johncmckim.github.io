
const http = require('http');
const fs = require('fs');
const path = require('path');
const findInFiles = require('find-in-files');

const IMG_REGEX = /https:\/\/cdn-images-1.medium.com\/max\/(\d+)\/(.+)(.png|.jpeg|.jpg)/;
const MEDIUM_DIR = 

const downloadFile = (url) => {
    const match = IMG_REGEX.exec(url);
    const size = match[1];
    const name = match[2];
    const extension = match[3];

    const fileName = `${size}/${name}${extension}`;

    console.log(fileName);

    return Promise.resolve();
    const file = fs.createWriteStream(filePath);

    const request = http.get(url, (response) => {
        response.pipe(file);
    });
};

const run = () => {
    const matchOptions = {
        term: IMG_REGEX,
        flags: 'ig',
    };

    findInFiles
        .find(matchOptions, '_posts', '.md$')
        .then((results) => {
            const files = Object.keys(results);

            const allDownloads = files.map((f) => {
                const matches = results[f].matches;
                const fileDownloads = matches.map(m => downloadFile(m));
                return Promise.all(fileDownloads);
            })

            return Promise.all(allDownloads);
        });
};

run();