// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {datalabeling_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: datalabeling_v1beta1.Datalabeling,
};

export function datalabeling(
  version: 'v1beta1'
): datalabeling_v1beta1.Datalabeling;
export function datalabeling(
  options: datalabeling_v1beta1.Options
): datalabeling_v1beta1.Datalabeling;
export function datalabeling<T = datalabeling_v1beta1.Datalabeling>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | datalabeling_v1beta1.Options
) {
  return getAPI<T>('datalabeling', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {datalabeling_v1beta1};
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
