const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const fetch = require('node-fetch');
const generateRandomString = require("./generateRandomString");

const sendToCloud = async (image, phone) => {
    const FormData = require('form-data');
    const data = new FormData();

    const response = await fetch(image);
    const buffer = await response.buffer();
    const nomeArquivo = `${phone}_${generateRandomString()}`

    fs.writeFileSync(path.join(__dirname, '../assets/upload-image.jpeg'), buffer, () =>
        console.log('finished downloading!'));
    data.append('file', fs.createReadStream(path.join(__dirname, '../assets/upload-image.jpeg')));

    config = {
        method: 'post',
        url: `https://storage.googleapis.com/upload/storage/v1/b/flashvolve/o?=multipart&name=vale/${nomeArquivo}.jpeg`,
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    return await axios(config).then(() => {
        return 'Enviado';
    }).catch(err => {
        console.log(err);
        return 'Invalido';
    });
}

module.exports = sendToCloud;