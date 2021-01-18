// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {youtubereporting_v1} from './v1';

export const VERSIONS = {
  v1: youtubereporting_v1.Youtubereporting,
};

export function youtubereporting(
  version: 'v1'
): youtubereporting_v1.Youtubereporting;
export function youtubereporting(
  options: youtubereporting_v1.Options
): youtubereporting_v1.Youtubereporting;
export function youtubereporting<T = youtubereporting_v1.Youtubereporting>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | youtubereporting_v1.Options
) {
  return getAPI<T>('youtubereporting', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {youtubereporting_v1};
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
