// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {kgsearch_v1} from './v1';

export const VERSIONS = {
  v1: kgsearch_v1.Kgsearch,
};

export function kgsearch(version: 'v1'): kgsearch_v1.Kgsearch;
export function kgsearch(options: kgsearch_v1.Options): kgsearch_v1.Kgsearch;
export function kgsearch<T = kgsearch_v1.Kgsearch>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | kgsearch_v1.Options
) {
  return getAPI<T>('kgsearch', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {kgsearch_v1};
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
