// Copyright 2016 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const jobService = google.jobs('v3');

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: [
      'https://www.googleapis.com/auth/jobs',
      'https://www.googleapis.com/auth/cloud-platform',
    ],
  });
  google.options({auth});

  const projectId = await google.auth.getProjectId();
  const res = await jobService.projects.companies.create({
    parent: `project/${projectId}`,
    requestBody: {
      company: {
        displayName: 'ABC co.',
        externalId: '12345',
      },
    },
  });
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
