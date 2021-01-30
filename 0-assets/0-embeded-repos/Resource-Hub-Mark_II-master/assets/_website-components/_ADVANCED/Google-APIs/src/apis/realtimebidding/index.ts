// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {realtimebidding_v1} from './v1';

export const VERSIONS = {
  v1: realtimebidding_v1.Realtimebidding,
};

export function realtimebidding(
  version: 'v1'
): realtimebidding_v1.Realtimebidding;
export function realtimebidding(
  options: realtimebidding_v1.Options
): realtimebidding_v1.Realtimebidding;
export function realtimebidding<T = realtimebidding_v1.Realtimebidding>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | realtimebidding_v1.Options
) {
  return getAPI<T>('realtimebidding', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {realtimebidding_v1};
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
