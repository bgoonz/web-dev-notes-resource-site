// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {sqladmin_v1beta4} from './v1beta4';

export const VERSIONS = {
  v1beta4: sqladmin_v1beta4.Sqladmin,
};

export function sqladmin(version: 'v1beta4'): sqladmin_v1beta4.Sqladmin;
export function sqladmin(
  options: sqladmin_v1beta4.Options
): sqladmin_v1beta4.Sqladmin;
export function sqladmin<T = sqladmin_v1beta4.Sqladmin>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta4' | sqladmin_v1beta4.Options
) {
  return getAPI<T>('sqladmin', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {sqladmin_v1beta4};
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
