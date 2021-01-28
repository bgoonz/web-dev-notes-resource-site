// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudbilling_v1} from './v1';

export const VERSIONS = {
  v1: cloudbilling_v1.Cloudbilling,
};

export function cloudbilling(version: 'v1'): cloudbilling_v1.Cloudbilling;
export function cloudbilling(
  options: cloudbilling_v1.Options
): cloudbilling_v1.Cloudbilling;
export function cloudbilling<T = cloudbilling_v1.Cloudbilling>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | cloudbilling_v1.Options
) {
  return getAPI<T>('cloudbilling', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudbilling_v1};
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
