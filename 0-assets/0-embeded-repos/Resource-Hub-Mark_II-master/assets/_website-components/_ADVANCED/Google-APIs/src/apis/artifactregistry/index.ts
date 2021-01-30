// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {artifactregistry_v1beta1} from './v1beta1';
import {artifactregistry_v1beta2} from './v1beta2';

export const VERSIONS = {
  v1beta1: artifactregistry_v1beta1.Artifactregistry,
  v1beta2: artifactregistry_v1beta2.Artifactregistry,
};

export function artifactregistry(
  version: 'v1beta1'
): artifactregistry_v1beta1.Artifactregistry;
export function artifactregistry(
  options: artifactregistry_v1beta1.Options
): artifactregistry_v1beta1.Artifactregistry;
export function artifactregistry(
  version: 'v1beta2'
): artifactregistry_v1beta2.Artifactregistry;
export function artifactregistry(
  options: artifactregistry_v1beta2.Options
): artifactregistry_v1beta2.Artifactregistry;
export function artifactregistry<
  T =
    | artifactregistry_v1beta1.Artifactregistry
    | artifactregistry_v1beta2.Artifactregistry
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1beta1'
    | artifactregistry_v1beta1.Options
    | 'v1beta2'
    | artifactregistry_v1beta2.Options
) {
  return getAPI<T>('artifactregistry', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {artifactregistry_v1beta1};
export {artifactregistry_v1beta2};
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
