// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudscheduler_v1} from './v1';
import {cloudscheduler_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: cloudscheduler_v1.Cloudscheduler,
  v1beta1: cloudscheduler_v1beta1.Cloudscheduler,
};

export function cloudscheduler(version: 'v1'): cloudscheduler_v1.Cloudscheduler;
export function cloudscheduler(
  options: cloudscheduler_v1.Options
): cloudscheduler_v1.Cloudscheduler;
export function cloudscheduler(
  version: 'v1beta1'
): cloudscheduler_v1beta1.Cloudscheduler;
export function cloudscheduler(
  options: cloudscheduler_v1beta1.Options
): cloudscheduler_v1beta1.Cloudscheduler;
export function cloudscheduler<
  T = cloudscheduler_v1.Cloudscheduler | cloudscheduler_v1beta1.Cloudscheduler
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | cloudscheduler_v1.Options
    | 'v1beta1'
    | cloudscheduler_v1beta1.Options
) {
  return getAPI<T>('cloudscheduler', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudscheduler_v1};
export {cloudscheduler_v1beta1};
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
