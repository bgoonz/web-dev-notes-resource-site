// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.



'use strict';

const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const blogger = google.blogger('v3');

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: 'https://www.googleapis.com/auth/blogger',
  });
  google.options({auth});

  const res = await blogger.posts.insert({
    blogId: '4340475495955554224',
    requestBody: {
      title: 'Hello from the googleapis npm module!',
      content:
        'Visit https://github.com/google/google-api-nodejs-client to learn more!',
    },
  });
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
