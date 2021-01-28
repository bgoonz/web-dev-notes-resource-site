// Copyright 2014 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const {google} = require('googleapis');
const path = require('path');

/**
 * The JWT authorization is ideal for performing server-to-server
 * communication without asking for user consent.
 *
 * Suggested reading for Admin SDK users using service accounts:
 * https://developers.google.com/admin-sdk/directory/v1/guides/delegation
 *
 * See the defaultauth.js sample for an alternate way of fetching compute credentials.
 */
async function runSample() {
  // Create a new JWT client using the key file downloaded from the Google Developer Console
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'jwt.keys.json'),
    scopes: 'https://www.googleapis.com/auth/drive.readonly',
  });
  const client = await auth.getClient();

  // Obtain a new drive client, making sure you pass along the auth client
  const drive = google.drive({
    version: 'v2',
    auth: client,
  });

  // Make an authorized request to list Drive files.
  const res = await drive.files.list();
  console.log(res.data);

  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}

// Exports for unit testing purposes
module.exports = {runSample};
