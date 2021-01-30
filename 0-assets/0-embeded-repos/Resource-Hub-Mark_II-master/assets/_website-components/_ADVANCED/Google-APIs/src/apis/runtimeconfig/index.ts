// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {runtimeconfig_v1} from './v1';
import {runtimeconfig_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: runtimeconfig_v1.Runtimeconfig,
  v1beta1: runtimeconfig_v1beta1.Runtimeconfig,
};

export function runtimeconfig(version: 'v1'): runtimeconfig_v1.Runtimeconfig;
export function runtimeconfig(
  options: runtimeconfig_v1.Options
): runtimeconfig_v1.Runtimeconfig;
export function runtimeconfig(
  version: 'v1beta1'
): runtimeconfig_v1beta1.Runtimeconfig;
export function runtimeconfig(
  options: runtimeconfig_v1beta1.Options
): runtimeconfig_v1beta1.Runtimeconfig;
export function runtimeconfig<
  T = runtimeconfig_v1.Runtimeconfig | runtimeconfig_v1beta1.Runtimeconfig
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | runtimeconfig_v1.Options
    | 'v1beta1'
    | runtimeconfig_v1beta1.Options
) {
  return getAPI<T>('runtimeconfig', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {runtimeconfig_v1};
export {runtimeconfig_v1beta1};
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
