// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {bigquery_v2} from './v2';

export const VERSIONS = {
  v2: bigquery_v2.Bigquery,
};

export function bigquery(version: 'v2'): bigquery_v2.Bigquery;
export function bigquery(options: bigquery_v2.Options): bigquery_v2.Bigquery;
export function bigquery<T = bigquery_v2.Bigquery>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | bigquery_v2.Options
) {
  return getAPI<T>('bigquery', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {bigquery_v2};
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
