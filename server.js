const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
const app = express().use(body_parser.json());
const FormData = require('form-data');


const getUserBd = require("./functions/getUserBd.js");
const timeOut = require("./functions/timeOut.js");
const Restart = require("./functions/Restart.js");
const sendToCloud = require("./functions/sendToCloud.js");

app.listen(process.env.PORT || 3000, () => console.log("webhook is listening"));

app.post("/start", async (_req, res) => {
    const userNow = await getUserBd(); // Adriano
    //console.log(userNow);

    if (userNow.response.count != 0) {
        //const dadosUser = Object.entries(dadoDb);
        const image = userNow.response.results[0].cloudinary_text; // Essas linhas
        const phone = userNow.response.results[0].whatsapp_text; // Essas linhas

        await Promise.all([timeOut(1000)])
            .then(async result => {

                const enviarImagem = await sendToCloud(image, phone);
                if (enviarImagem == 'Enviado') {
                    const dataUpdate = new FormData();
                    dataUpdate.append('enviado_google_boolean', 'true');

                    const config = {
                        method: 'patch',
                        url: `https://dash.zapbrand.com.br/api/1.1/obj/personalizações/${userNow.response.results[0]._id}`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: dataUpdate
                    };

                    axios(config)
                        .then(function () {
                            console.log("Banco atualizado");
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    setTimeout(function () {
                        Restart();
                    }, 1000);

                } else {
                    console.log("Erro");
                }
                console.log(`Start - ${phone} ${result}`);
            }).catch(err => {
                console.log(err);
            });
    } else {
        console.log('Acabou');
    }

    res.send('ok');

});