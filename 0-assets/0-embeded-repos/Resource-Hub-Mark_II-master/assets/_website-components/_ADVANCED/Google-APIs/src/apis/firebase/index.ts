// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {firebase_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: firebase_v1beta1.Firebase,
};

export function firebase(version: 'v1beta1'): firebase_v1beta1.Firebase;
export function firebase(
  options: firebase_v1beta1.Options
): firebase_v1beta1.Firebase;
export function firebase<T = firebase_v1beta1.Firebase>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | firebase_v1beta1.Options
) {
  return getAPI<T>('firebase', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {firebase_v1beta1};
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
