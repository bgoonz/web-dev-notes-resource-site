// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const assert = require('assert');
const {describe, it, afterEach} = require('mocha');
const nock = require('nock');
const proxyquire = require('proxyquire');
const {google} = require('googleapis');

nock.disableNetConnect();

const baseUrl = 'https://analyticsreporting.googleapis.com';

describe('analyticsReporting samples', () => {
  const batchGet = proxyquire('../analyticsReporting/batchGet', {
    '@google-cloud/local-auth': {
      authenticate: async () => {
        const client = new google.auth.OAuth2();
        client.credentials = {access_token: 'not-a-token'};
      },
    },
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should batchGet', async () => {
    const scope = nock(baseUrl).post('/v4/reports:batchGet').reply(200, {});
    const data = await batchGet();
    assert(data);
    scope.done();
  });
});
