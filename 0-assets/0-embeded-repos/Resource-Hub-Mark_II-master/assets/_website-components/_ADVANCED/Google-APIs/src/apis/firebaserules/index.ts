// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {firebaserules_v1} from './v1';

export const VERSIONS = {
  v1: firebaserules_v1.Firebaserules,
};

export function firebaserules(version: 'v1'): firebaserules_v1.Firebaserules;
export function firebaserules(
  options: firebaserules_v1.Options
): firebaserules_v1.Firebaserules;
export function firebaserules<T = firebaserules_v1.Firebaserules>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | firebaserules_v1.Options
) {
  return getAPI<T>('firebaserules', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {firebaserules_v1};
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
