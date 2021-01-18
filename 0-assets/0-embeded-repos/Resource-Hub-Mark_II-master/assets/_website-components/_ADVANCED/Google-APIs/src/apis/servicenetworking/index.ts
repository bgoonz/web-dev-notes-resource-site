// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {servicenetworking_v1} from './v1';
import {servicenetworking_v1beta} from './v1beta';

export const VERSIONS = {
  v1: servicenetworking_v1.Servicenetworking,
  v1beta: servicenetworking_v1beta.Servicenetworking,
};

export function servicenetworking(
  version: 'v1'
): servicenetworking_v1.Servicenetworking;
export function servicenetworking(
  options: servicenetworking_v1.Options
): servicenetworking_v1.Servicenetworking;
export function servicenetworking(
  version: 'v1beta'
): servicenetworking_v1beta.Servicenetworking;
export function servicenetworking(
  options: servicenetworking_v1beta.Options
): servicenetworking_v1beta.Servicenetworking;
export function servicenetworking<
  T =
    | servicenetworking_v1.Servicenetworking
    | servicenetworking_v1beta.Servicenetworking
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | servicenetworking_v1.Options
    | 'v1beta'
    | servicenetworking_v1beta.Options
) {
  return getAPI<T>('servicenetworking', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {servicenetworking_v1};
export {servicenetworking_v1beta};
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
