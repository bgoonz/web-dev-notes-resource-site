// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {assuredworkloads_v1} from './v1';
import {assuredworkloads_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: assuredworkloads_v1.Assuredworkloads,
  v1beta1: assuredworkloads_v1beta1.Assuredworkloads,
};

export function assuredworkloads(
  version: 'v1'
): assuredworkloads_v1.Assuredworkloads;
export function assuredworkloads(
  options: assuredworkloads_v1.Options
): assuredworkloads_v1.Assuredworkloads;
export function assuredworkloads(
  version: 'v1beta1'
): assuredworkloads_v1beta1.Assuredworkloads;
export function assuredworkloads(
  options: assuredworkloads_v1beta1.Options
): assuredworkloads_v1beta1.Assuredworkloads;
export function assuredworkloads<
  T =
    | assuredworkloads_v1.Assuredworkloads
    | assuredworkloads_v1beta1.Assuredworkloads
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | assuredworkloads_v1.Options
    | 'v1beta1'
    | assuredworkloads_v1beta1.Options
) {
  return getAPI<T>('assuredworkloads', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {assuredworkloads_v1};
export {assuredworkloads_v1beta1};
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
