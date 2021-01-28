// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudkms_v1} from './v1';

export const VERSIONS = {
  v1: cloudkms_v1.Cloudkms,
};

export function cloudkms(version: 'v1'): cloudkms_v1.Cloudkms;
export function cloudkms(options: cloudkms_v1.Options): cloudkms_v1.Cloudkms;
export function cloudkms<T = cloudkms_v1.Cloudkms>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | cloudkms_v1.Options
) {
  return getAPI<T>('cloudkms', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudkms_v1};
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
