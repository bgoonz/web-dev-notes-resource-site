// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudsearch_v1} from './v1';

export const VERSIONS = {
  v1: cloudsearch_v1.Cloudsearch,
};

export function cloudsearch(version: 'v1'): cloudsearch_v1.Cloudsearch;
export function cloudsearch(
  options: cloudsearch_v1.Options
): cloudsearch_v1.Cloudsearch;
export function cloudsearch<T = cloudsearch_v1.Cloudsearch>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | cloudsearch_v1.Options
) {
  return getAPI<T>('cloudsearch', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudsearch_v1};
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
