// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {testing_v1} from './v1';

export const VERSIONS = {
  v1: testing_v1.Testing,
};

export function testing(version: 'v1'): testing_v1.Testing;
export function testing(options: testing_v1.Options): testing_v1.Testing;
export function testing<T = testing_v1.Testing>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | testing_v1.Options
) {
  return getAPI<T>('testing', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {testing_v1};
export {
  AuthPlus,
  GlobalOptions,
  APIRequestContext,
  GoogleConfigurable,
  StreamMethodOptions,
  GaxiosPromise,
  MethodOptions,
  BodyResponseCallback,
} from 'googleapis-common';
