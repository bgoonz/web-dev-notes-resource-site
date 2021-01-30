// Copyright 2013 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const {google} = require('googleapis');
const urlshortener = google.urlshortener('v1');
const plus = google.plus('v1');
const nconf = require('nconf');
const path = require('path');

nconf.argv().env().file(path.join(__dirname, 'config.json'));

// PUT your API key here or this example will return errors
// To learn more about API keys, please see:
// https://github.com/google/google-api-nodejs-client#using-api-keys

urlshortener.url.get({
  shortUrl: 'http://goo.gl/xKbRu3',
  auth: nconf.get('api_key'),
});
plus.people.get({userId: '+google', auth: nconf.get('api_key')});
