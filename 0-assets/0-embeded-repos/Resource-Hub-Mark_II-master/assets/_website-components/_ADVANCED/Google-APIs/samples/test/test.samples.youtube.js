// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const assert = require('assert');
const {describe, it, afterEach} = require('mocha');
const nock = require('nock');
const path = require('path');
const proxyquire = require('proxyquire');
const {google} = require('googleapis');

nock.disableNetConnect();

const samples = {
  upload: {path: '../youtube/upload'},
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

const someFile = path.join(__dirname, '../../test/fixtures/public.pem');

describe('YouTube samples', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should upload a video', async () => {
    const scope = nock('https://www.googleapis.com')
      .post(
        '/upload/youtube/v3/videos?part=id%2Csnippet%2Cstatus&notifySubscribers=false&uploadType=multipart'
      )
      .reply(200, {kind: 'youtube#video'});
    const data = await samples.upload.runSample(someFile);
    assert(data);
    assert.strictEqual(data.kind, 'youtube#video');
    scope.done();
  });
});
