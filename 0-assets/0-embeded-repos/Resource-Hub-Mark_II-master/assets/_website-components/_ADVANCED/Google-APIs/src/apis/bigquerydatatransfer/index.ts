// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {bigquerydatatransfer_v1} from './v1';

export const VERSIONS = {
  v1: bigquerydatatransfer_v1.Bigquerydatatransfer,
};

export function bigquerydatatransfer(
  version: 'v1'
): bigquerydatatransfer_v1.Bigquerydatatransfer;
export function bigquerydatatransfer(
  options: bigquerydatatransfer_v1.Options
): bigquerydatatransfer_v1.Bigquerydatatransfer;
export function bigquerydatatransfer<
  T = bigquerydatatransfer_v1.Bigquerydatatransfer
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | bigquerydatatransfer_v1.Options
) {
  return getAPI<T>('bigquerydatatransfer', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {bigquerydatatransfer_v1};
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
