// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {datafusion_v1} from './v1';
import {datafusion_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: datafusion_v1.Datafusion,
  v1beta1: datafusion_v1beta1.Datafusion,
};

export function datafusion(version: 'v1'): datafusion_v1.Datafusion;
export function datafusion(
  options: datafusion_v1.Options
): datafusion_v1.Datafusion;
export function datafusion(version: 'v1beta1'): datafusion_v1beta1.Datafusion;
export function datafusion(
  options: datafusion_v1beta1.Options
): datafusion_v1beta1.Datafusion;
export function datafusion<
  T = datafusion_v1.Datafusion | datafusion_v1beta1.Datafusion
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | datafusion_v1.Options
    | 'v1beta1'
    | datafusion_v1beta1.Options
) {
  return getAPI<T>('datafusion', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {datafusion_v1};
export {datafusion_v1beta1};
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
