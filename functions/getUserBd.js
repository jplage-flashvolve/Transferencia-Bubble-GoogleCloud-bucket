const axios = require("axios");

const getUserBd = async () => {

  const filtroGetUser = '[{"key":"enviado_google_boolean","constraint_type":"equals","value":"no"}, {"key": "empresa_option_empresa","constraint_type":"equals","value":"Vale"}]';

  const config = {
    method: 'get',
    url: encodeURI('https://dash.zapbrand.com.br/api/1.1/obj/personalizações?constraints=' + filtroGetUser + '&sort_field=Created Date&descending=true'),
    headers: {
      'Content-type': 'application/json',
    },
    responseType: 'json',
  };

  let urlResponseGetUser = await axios(config).catch(err => {
    console.log(err);
  });

  return urlResponseGetUser.data;
}

module.exports = getUserBd;