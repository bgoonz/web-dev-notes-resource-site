// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {spanner_v1} from './v1';

export const VERSIONS = {
  v1: spanner_v1.Spanner,
};

export function spanner(version: 'v1'): spanner_v1.Spanner;
export function spanner(options: spanner_v1.Options): spanner_v1.Spanner;
export function spanner<T = spanner_v1.Spanner>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | spanner_v1.Options
) {
  return getAPI<T>('spanner', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {spanner_v1};
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
