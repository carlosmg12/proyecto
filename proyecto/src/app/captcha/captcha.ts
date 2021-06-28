const request = require('request');

const options = {
    method: 'GET',
    url: 'https://password-and-captcha-generator.p.rapidapi.com/generateCaptcha',
    qs: {text: '123abc', width: '160', height: '60'},
    headers: {
      'x-rapidapi-key': 'aad053e113msh55c78729032bf7ep1079a2jsn36b97b5f14f7',
      'x-rapidapi-host': 'password-and-captcha-generator.p.rapidapi.com',
      useQueryString: true
    }
  };
  
  request(options, function (error:any, response:any, body:any) {
      if (error) throw new Error(error);
  
      console.log(body);
  });