// Copyright 2020 Google LLC





/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {analyticsadmin_v1alpha} from './v1alpha';

export const VERSIONS = {
  v1alpha: analyticsadmin_v1alpha.Analyticsadmin,
};

export function analyticsadmin(
  version: 'v1alpha'
): analyticsadmin_v1alpha.Analyticsadmin;
export function analyticsadmin(
  options: analyticsadmin_v1alpha.Options
): analyticsadmin_v1alpha.Analyticsadmin;
export function analyticsadmin<T = analyticsadmin_v1alpha.Analyticsadmin>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1alpha' | analyticsadmin_v1alpha.Options
) {
  return getAPI<T>('analyticsadmin', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {analyticsadmin_v1alpha};
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
