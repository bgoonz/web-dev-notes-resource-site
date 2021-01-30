// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const assert = require('assert');
const nock = require('nock');
const {describe, it, afterEach} = require('mocha');
const proxyquire = require('proxyquire');
const {google} = require('googleapis');

nock.disableNetConnect();

const samples = {
  query: {path: '../webmasters/query'},
};

for (const sample of Object.values(samples)) {
  sample.runSample = proxyquire(sample.path, {
    '@google-cloud/local-auth': {
      authenticate: async () => {
        const client = new google.auth.OAuth2();
        client.credentials = {access_token: 'not-a-token'};
      },
    },
  });
}

describe('webmaster samples', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should query analytics', async () => {
    const siteUrl = 'http://jbeckwith.com';
    const path = `/webmasters/v3/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`;
    const scope = nock('https://www.googleapis.com').post(path).reply(200, {});
    const data = await samples.query.runSample();
    assert(data);
    scope.done();
  });
});
