// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {analyticsdata_v1alpha} from './v1alpha';

export const VERSIONS = {
  v1alpha: analyticsdata_v1alpha.Analyticsdata,
};

export function analyticsdata(
  version: 'v1alpha'
): analyticsdata_v1alpha.Analyticsdata;
export function analyticsdata(
  options: analyticsdata_v1alpha.Options
): analyticsdata_v1alpha.Analyticsdata;
export function analyticsdata<T = analyticsdata_v1alpha.Analyticsdata>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1alpha' | analyticsdata_v1alpha.Options
) {
  return getAPI<T>('analyticsdata', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {analyticsdata_v1alpha};
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
