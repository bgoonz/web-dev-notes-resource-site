// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {tpu_v1} from './v1';
import {tpu_v1alpha1} from './v1alpha1';

export const VERSIONS = {
  v1: tpu_v1.Tpu,
  v1alpha1: tpu_v1alpha1.Tpu,
};

export function tpu(version: 'v1'): tpu_v1.Tpu;
export function tpu(options: tpu_v1.Options): tpu_v1.Tpu;
export function tpu(version: 'v1alpha1'): tpu_v1alpha1.Tpu;
export function tpu(options: tpu_v1alpha1.Options): tpu_v1alpha1.Tpu;
export function tpu<T = tpu_v1.Tpu | tpu_v1alpha1.Tpu>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | tpu_v1.Options | 'v1alpha1' | tpu_v1alpha1.Options
) {
  return getAPI<T>('tpu', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {tpu_v1};
export {tpu_v1alpha1};
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
