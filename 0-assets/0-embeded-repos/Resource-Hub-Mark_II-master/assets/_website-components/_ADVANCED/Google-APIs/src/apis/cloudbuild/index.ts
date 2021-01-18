// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudbuild_v1} from './v1';
import {cloudbuild_v1alpha1} from './v1alpha1';
import {cloudbuild_v1alpha2} from './v1alpha2';

export const VERSIONS = {
  v1: cloudbuild_v1.Cloudbuild,
  v1alpha1: cloudbuild_v1alpha1.Cloudbuild,
  v1alpha2: cloudbuild_v1alpha2.Cloudbuild,
};

export function cloudbuild(version: 'v1'): cloudbuild_v1.Cloudbuild;
export function cloudbuild(
  options: cloudbuild_v1.Options
): cloudbuild_v1.Cloudbuild;
export function cloudbuild(version: 'v1alpha1'): cloudbuild_v1alpha1.Cloudbuild;
export function cloudbuild(
  options: cloudbuild_v1alpha1.Options
): cloudbuild_v1alpha1.Cloudbuild;
export function cloudbuild(version: 'v1alpha2'): cloudbuild_v1alpha2.Cloudbuild;
export function cloudbuild(
  options: cloudbuild_v1alpha2.Options
): cloudbuild_v1alpha2.Cloudbuild;
export function cloudbuild<
  T =
    | cloudbuild_v1.Cloudbuild
    | cloudbuild_v1alpha1.Cloudbuild
    | cloudbuild_v1alpha2.Cloudbuild
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | cloudbuild_v1.Options
    | 'v1alpha1'
    | cloudbuild_v1alpha1.Options
    | 'v1alpha2'
    | cloudbuild_v1alpha2.Options
) {
  return getAPI<T>('cloudbuild', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudbuild_v1};
export {cloudbuild_v1alpha1};
export {cloudbuild_v1alpha2};
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
