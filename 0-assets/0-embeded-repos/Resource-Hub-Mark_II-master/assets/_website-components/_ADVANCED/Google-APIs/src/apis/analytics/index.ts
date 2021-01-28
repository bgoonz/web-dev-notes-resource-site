// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {analytics_v3} from './v3';

export const VERSIONS = {
  v3: analytics_v3.Analytics,
};

export function analytics(version: 'v3'): analytics_v3.Analytics;
export function analytics(
  options: analytics_v3.Options
): analytics_v3.Analytics;
export function analytics<T = analytics_v3.Analytics>(
  this: GoogleConfigurable,
  versionOrOptions: 'v3' | analytics_v3.Options
) {
  return getAPI<T>('analytics', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {analytics_v3};
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
