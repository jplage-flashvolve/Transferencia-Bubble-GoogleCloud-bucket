const axios = require("axios").default;

const Restart = async () => {

    var config = {
        method: 'post',
        url: encodeURI('http://localhost:3000/start'),
        headers: {
            'Content-type': 'application/json',
            'User-Agent': '*'
        },
        json: true
    };

    let urlResponseGetUser = await axios(config).catch(err => {
        console.log(err);
    });

    return urlResponseGetUser;
}

module.exports = Restart