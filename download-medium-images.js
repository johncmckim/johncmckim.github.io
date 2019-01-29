
const http = require('http');
const fs = require('fs');
const path = require('path');
const findInFiles = require('find-in-files');
const axios = require('axios');

const IMG_REGEX = /https:\/\/cdn-images-1.medium.com\/max\/(\d+)\/(.+)(.png|.jpeg|.jpg|.gif)/;
const MEDIUM_DIR = path.join(__dirname, 'static', 'medium');

const getImgParts = (url) => {
    const match = IMG_REGEX.exec(url);
    const size = match[1];
    const name = match[2];
    const extension = match[3];

    const fileName = `${size}-${name}${extension}`;

    return {
        fileName,
        size,
        name,
        extension,
    };
};

const downloadFile = async (url, imgParts) => {
    const fileName = path.join(MEDIUM_DIR, imgParts.fileName);

    // await fs.promises.mkdir(path.dirname(fileName), { recursive: true });

    const writer = fs.createWriteStream(fileName)

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    });
};

const replaceInFile = async (fileName, url, imgParts) => {
    const data = await fs.promises.readFile(fileName, 'utf8');

    const result = data.replace(url, `/static/medium/${imgParts.fileName}`);

    return fs.promises.writeFile(fileName, result, 'utf8');
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
                // console.log(matches);
                // return Promise.resolve();
                const fileDownloads = matches.map(url => {
                    const imgParts = getImgParts(url);
                    
                    return downloadFile(url, imgParts)
                        .then(() => replaceInFile(f, url, imgParts));
                });
                return Promise.all(fileDownloads);
            });

            return Promise.all(allDownloads);
        })
        .catch((e) => {
            console.log(e);
        });
};

run();