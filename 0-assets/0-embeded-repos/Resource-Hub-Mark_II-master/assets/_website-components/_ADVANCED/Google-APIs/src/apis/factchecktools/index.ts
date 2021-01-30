// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {factchecktools_v1alpha1} from './v1alpha1';

export const VERSIONS = {
  v1alpha1: factchecktools_v1alpha1.Factchecktools,
};

export function factchecktools(
  version: 'v1alpha1'
): factchecktools_v1alpha1.Factchecktools;
export function factchecktools(
  options: factchecktools_v1alpha1.Options
): factchecktools_v1alpha1.Factchecktools;
export function factchecktools<T = factchecktools_v1alpha1.Factchecktools>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1alpha1' | factchecktools_v1alpha1.Options
) {
  return getAPI<T>('factchecktools', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {factchecktools_v1alpha1};
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
