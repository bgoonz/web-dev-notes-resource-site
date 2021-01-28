// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {servicecontrol_v1} from './v1';
import {servicecontrol_v2} from './v2';

export const VERSIONS = {
  v1: servicecontrol_v1.Servicecontrol,
  v2: servicecontrol_v2.Servicecontrol,
};

export function servicecontrol(version: 'v1'): servicecontrol_v1.Servicecontrol;
export function servicecontrol(
  options: servicecontrol_v1.Options
): servicecontrol_v1.Servicecontrol;
export function servicecontrol(version: 'v2'): servicecontrol_v2.Servicecontrol;
export function servicecontrol(
  options: servicecontrol_v2.Options
): servicecontrol_v2.Servicecontrol;
export function servicecontrol<
  T = servicecontrol_v1.Servicecontrol | servicecontrol_v2.Servicecontrol
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | servicecontrol_v1.Options
    | 'v2'
    | servicecontrol_v2.Options
) {
  return getAPI<T>('servicecontrol', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {servicecontrol_v1};
export {servicecontrol_v2};
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
