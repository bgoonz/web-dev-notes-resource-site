// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

// [START main_body]
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

/**
 * Lists the names and IDs of up to 10 files.
 */
async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  });
  google.options({auth});

  const service = google.drive('v3');
  const res = await service.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
  } else {
    console.log('Files:');
    for (const file of files) {
      console.log(`${file.name} (${file.id})`);
    }
  }
}
if (module === require.main) {
  runSample().catch(console.error);
}
// [END main_body]
module.exports = runSample;
