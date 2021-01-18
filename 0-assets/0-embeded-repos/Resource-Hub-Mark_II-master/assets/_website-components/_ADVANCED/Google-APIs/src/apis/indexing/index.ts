// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {indexing_v3} from './v3';

export const VERSIONS = {
  v3: indexing_v3.Indexing,
};

export function indexing(version: 'v3'): indexing_v3.Indexing;
export function indexing(options: indexing_v3.Options): indexing_v3.Indexing;
export function indexing<T = indexing_v3.Indexing>(
  this: GoogleConfigurable,
  versionOrOptions: 'v3' | indexing_v3.Options
) {
  return getAPI<T>('indexing', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {indexing_v3};
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
