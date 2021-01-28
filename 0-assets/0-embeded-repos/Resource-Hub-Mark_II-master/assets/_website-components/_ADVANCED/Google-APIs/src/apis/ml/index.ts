// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {ml_v1} from './v1';

export const VERSIONS = {
  v1: ml_v1.Ml,
};

export function ml(version: 'v1'): ml_v1.Ml;
export function ml(options: ml_v1.Options): ml_v1.Ml;
export function ml<T = ml_v1.Ml>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | ml_v1.Options
) {
  return getAPI<T>('ml', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {ml_v1};
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
