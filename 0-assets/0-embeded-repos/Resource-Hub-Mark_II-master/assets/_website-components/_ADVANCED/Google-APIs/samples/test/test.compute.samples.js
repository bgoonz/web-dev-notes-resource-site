// Copyright 2019 Google, LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




'use strict';

const assert = require('assert');
const execa = require('execa');
const {describe, it} = require('mocha');

describe('Compute samples', () => {
  it('should list all the VMs', async () => {
    const res = execa.sync('node compute/listVMs.js', {shell: true});
    assert.ok(/VMs:/.test(res.stdout));
  });
});
