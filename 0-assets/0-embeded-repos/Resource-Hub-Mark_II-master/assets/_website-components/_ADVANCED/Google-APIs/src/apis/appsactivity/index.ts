// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {appsactivity_v1} from './v1';

export const VERSIONS = {
  v1: appsactivity_v1.Appsactivity,
};

export function appsactivity(version: 'v1'): appsactivity_v1.Appsactivity;
export function appsactivity(
  options: appsactivity_v1.Options
): appsactivity_v1.Appsactivity;
export function appsactivity<T = appsactivity_v1.Appsactivity>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | appsactivity_v1.Options
) {
  return getAPI<T>('appsactivity', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {appsactivity_v1};
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
