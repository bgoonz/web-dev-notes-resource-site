// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {clouderrorreporting_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: clouderrorreporting_v1beta1.Clouderrorreporting,
};

export function clouderrorreporting(
  version: 'v1beta1'
): clouderrorreporting_v1beta1.Clouderrorreporting;
export function clouderrorreporting(
  options: clouderrorreporting_v1beta1.Options
): clouderrorreporting_v1beta1.Clouderrorreporting;
export function clouderrorreporting<
  T = clouderrorreporting_v1beta1.Clouderrorreporting
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | clouderrorreporting_v1beta1.Options
) {
  return getAPI<T>('clouderrorreporting', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {clouderrorreporting_v1beta1};
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
