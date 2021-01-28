// Copyright 2013 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const {google} = require('googleapis');
const blogger = google.blogger('v3');
const nconf = require('nconf');
const path = require('path');

// Ex: node blogger.js --api_key "YOUR API KEY"
nconf.argv().env().file(path.join(__dirname, 'config.json'));

blogger.blogs.get(
  {
    key: nconf.get('api_key'),
    blogId: '3213900',
  },
  (err, res) => {
    if (err) {
      throw err;
    }
    console.log(res.data);
  }
);
