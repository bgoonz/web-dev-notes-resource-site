// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudidentity_v1} from './v1';
import {cloudidentity_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: cloudidentity_v1.Cloudidentity,
  v1beta1: cloudidentity_v1beta1.Cloudidentity,
};

export function cloudidentity(version: 'v1'): cloudidentity_v1.Cloudidentity;
export function cloudidentity(
  options: cloudidentity_v1.Options
): cloudidentity_v1.Cloudidentity;
export function cloudidentity(
  version: 'v1beta1'
): cloudidentity_v1beta1.Cloudidentity;
export function cloudidentity(
  options: cloudidentity_v1beta1.Options
): cloudidentity_v1beta1.Cloudidentity;
export function cloudidentity<
  T = cloudidentity_v1.Cloudidentity | cloudidentity_v1beta1.Cloudidentity
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | cloudidentity_v1.Options
    | 'v1beta1'
    | cloudidentity_v1beta1.Options
) {
  return getAPI<T>('cloudidentity', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudidentity_v1};
export {cloudidentity_v1beta1};
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
