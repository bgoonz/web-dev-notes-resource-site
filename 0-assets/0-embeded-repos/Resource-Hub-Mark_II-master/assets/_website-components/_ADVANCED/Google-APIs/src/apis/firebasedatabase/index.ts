// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {firebasedatabase_v1beta} from './v1beta';

export const VERSIONS = {
  v1beta: firebasedatabase_v1beta.Firebasedatabase,
};

export function firebasedatabase(
  version: 'v1beta'
): firebasedatabase_v1beta.Firebasedatabase;
export function firebasedatabase(
  options: firebasedatabase_v1beta.Options
): firebasedatabase_v1beta.Firebasedatabase;
export function firebasedatabase<T = firebasedatabase_v1beta.Firebasedatabase>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta' | firebasedatabase_v1beta.Options
) {
  return getAPI<T>('firebasedatabase', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {firebasedatabase_v1beta};
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
