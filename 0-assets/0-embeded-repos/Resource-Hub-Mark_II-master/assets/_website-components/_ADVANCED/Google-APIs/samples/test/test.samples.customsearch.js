// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const assert = require('assert');
const nock = require('nock');
const {describe, it, afterEach} = require('mocha');

nock.disableNetConnect();

const samples = {
  list: require('../customsearch/customsearch'),
};

const baseUrl = 'https://customsearch.googleapis.com';

describe('customsearch samples', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should search', async () => {
    const scope = nock(baseUrl)
      .get('/customsearch/v1?cx=cx&q=q')
      .reply(200, {});
    const options = {cx: 'cx', q: 'q', auth: 'key'};
    const data = await samples.list.runSample(options);
    assert(data);
    scope.done();
  });
});
