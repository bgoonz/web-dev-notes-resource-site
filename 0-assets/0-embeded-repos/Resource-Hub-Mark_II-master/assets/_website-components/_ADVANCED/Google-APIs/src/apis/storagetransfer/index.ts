// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {storagetransfer_v1} from './v1';

export const VERSIONS = {
  v1: storagetransfer_v1.Storagetransfer,
};

export function storagetransfer(
  version: 'v1'
): storagetransfer_v1.Storagetransfer;
export function storagetransfer(
  options: storagetransfer_v1.Options
): storagetransfer_v1.Storagetransfer;
export function storagetransfer<T = storagetransfer_v1.Storagetransfer>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | storagetransfer_v1.Options
) {
  return getAPI<T>('storagetransfer', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {storagetransfer_v1};
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
