// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const assert = require('assert');
const fs = require('fs');
const nock = require('nock');
const path = require('path');
const {describe, it, afterEach} = require('mocha');

nock.disableNetConnect();

const samples = {
  jwt: require('../jwt'),
  accessToken: require('../accessTokenAuth'),
};

describe('Auth samples', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should support JWT', async () => {
    const scope = nock('https://www.googleapis.com')
      .get('/drive/v2/files')
      .reply(200, {})
      .post('/oauth2/v4/token')
      .reply(200, {access_token: 'not-a-token'});
    const fakePath = path.resolve('../test/fixtures/service.json');
    const realPath = path.resolve('jwt.keys.json');
    const exists = fs.existsSync(realPath);
    if (!exists) {
      const contents = fs.readFileSync(fakePath);
      fs.writeFileSync(realPath, contents);
    }
    const data = await samples.jwt.runSample();
    assert(data);
    scope.done();
  });

  it('should accept an access token header', async () => {
    const scope = nock('https://www.googleapis.com')
      .get('/drive/v2/files')
      .reply(200, {});
    const res = await samples.accessToken.runSample(12345);
    assert.strictEqual(res.config.headers['Authorization'], 'Bearer 12345');
    scope.done();
  });
});
