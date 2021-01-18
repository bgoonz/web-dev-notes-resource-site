// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {fcm_v1} from './v1';

export const VERSIONS = {
  v1: fcm_v1.Fcm,
};

export function fcm(version: 'v1'): fcm_v1.Fcm;
export function fcm(options: fcm_v1.Options): fcm_v1.Fcm;
export function fcm<T = fcm_v1.Fcm>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | fcm_v1.Options
) {
  return getAPI<T>('fcm', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {fcm_v1};
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
