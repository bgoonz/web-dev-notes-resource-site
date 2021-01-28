// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {servicemanagement_v1} from './v1';

export const VERSIONS = {
  v1: servicemanagement_v1.Servicemanagement,
};

export function servicemanagement(
  version: 'v1'
): servicemanagement_v1.Servicemanagement;
export function servicemanagement(
  options: servicemanagement_v1.Options
): servicemanagement_v1.Servicemanagement;
export function servicemanagement<T = servicemanagement_v1.Servicemanagement>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | servicemanagement_v1.Options
) {
  return getAPI<T>('servicemanagement', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {servicemanagement_v1};
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
