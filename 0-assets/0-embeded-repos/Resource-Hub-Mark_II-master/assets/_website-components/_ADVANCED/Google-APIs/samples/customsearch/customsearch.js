// Copyright 2012 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

// Example:  node customsearch.js example_term

const {google} = require('googleapis');
const customsearch = google.customsearch('v1');

// Ex: node customsearch.js
//      "Google Node.js"
//      "API KEY"
//      "CUSTOM ENGINE ID"

async function runSample(options) {
  console.log(options);
  const res = await customsearch.cse.list({
    cx: options.cx,
    q: options.q,
    auth: options.apiKey,
  });
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  // You can get a custom search engine id at
  // https://www.google.com/cse/create/new
  const options = {
    q: process.argv[2],
    apiKey: process.argv[3],
    cx: process.argv[4],
  };
  runSample(options).catch(console.error);
}

module.exports = {
  runSample,
};
