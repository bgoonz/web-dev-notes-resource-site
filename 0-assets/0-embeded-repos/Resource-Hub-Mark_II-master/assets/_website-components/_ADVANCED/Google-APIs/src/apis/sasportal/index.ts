// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {sasportal_v1alpha1} from './v1alpha1';

export const VERSIONS = {
  v1alpha1: sasportal_v1alpha1.Sasportal,
};

export function sasportal(version: 'v1alpha1'): sasportal_v1alpha1.Sasportal;
export function sasportal(
  options: sasportal_v1alpha1.Options
): sasportal_v1alpha1.Sasportal;
export function sasportal<T = sasportal_v1alpha1.Sasportal>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1alpha1' | sasportal_v1alpha1.Options
) {
  return getAPI<T>('sasportal', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {sasportal_v1alpha1};
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
