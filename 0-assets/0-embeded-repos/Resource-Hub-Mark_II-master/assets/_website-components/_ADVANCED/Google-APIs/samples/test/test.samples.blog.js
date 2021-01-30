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

const baseUrl = 'https://blogger.googleapis.com';

describe('blogger samples', () => {
  const insert = proxyquire('../blogger/insert', {
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

  it('should insert a blog post', async () => {
    const scope = nock(baseUrl)
      .post('/v3/blogs/4340475495955554224/posts')
      .reply(200, {});
    const data = await insert();
    assert(data);
    scope.done();
  });
});
