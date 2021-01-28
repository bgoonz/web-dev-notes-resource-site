// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {androiddeviceprovisioning_v1} from './v1';

export const VERSIONS = {
  v1: androiddeviceprovisioning_v1.Androiddeviceprovisioning,
};

export function androiddeviceprovisioning(
  version: 'v1'
): androiddeviceprovisioning_v1.Androiddeviceprovisioning;
export function androiddeviceprovisioning(
  options: androiddeviceprovisioning_v1.Options
): androiddeviceprovisioning_v1.Androiddeviceprovisioning;
export function androiddeviceprovisioning<
  T = androiddeviceprovisioning_v1.Androiddeviceprovisioning
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | androiddeviceprovisioning_v1.Options
) {
  return getAPI<T>(
    'androiddeviceprovisioning',
    versionOrOptions,
    VERSIONS,
    this
  );
}

const auth = new AuthPlus();
export {auth};
export {androiddeviceprovisioning_v1};
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
