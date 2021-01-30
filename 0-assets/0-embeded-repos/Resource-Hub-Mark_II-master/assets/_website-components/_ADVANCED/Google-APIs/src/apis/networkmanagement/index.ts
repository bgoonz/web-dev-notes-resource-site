// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {networkmanagement_v1} from './v1';
import {networkmanagement_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: networkmanagement_v1.Networkmanagement,
  v1beta1: networkmanagement_v1beta1.Networkmanagement,
};

export function networkmanagement(
  version: 'v1'
): networkmanagement_v1.Networkmanagement;
export function networkmanagement(
  options: networkmanagement_v1.Options
): networkmanagement_v1.Networkmanagement;
export function networkmanagement(
  version: 'v1beta1'
): networkmanagement_v1beta1.Networkmanagement;
export function networkmanagement(
  options: networkmanagement_v1beta1.Options
): networkmanagement_v1beta1.Networkmanagement;
export function networkmanagement<
  T =
    | networkmanagement_v1.Networkmanagement
    | networkmanagement_v1beta1.Networkmanagement
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | networkmanagement_v1.Options
    | 'v1beta1'
    | networkmanagement_v1beta1.Options
) {
  return getAPI<T>('networkmanagement', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {networkmanagement_v1};
export {networkmanagement_v1beta1};
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
