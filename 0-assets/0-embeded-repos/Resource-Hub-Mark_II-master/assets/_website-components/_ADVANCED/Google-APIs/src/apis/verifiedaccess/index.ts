// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {verifiedaccess_v1} from './v1';

export const VERSIONS = {
  v1: verifiedaccess_v1.Verifiedaccess,
};

export function verifiedaccess(version: 'v1'): verifiedaccess_v1.Verifiedaccess;
export function verifiedaccess(
  options: verifiedaccess_v1.Options
): verifiedaccess_v1.Verifiedaccess;
export function verifiedaccess<T = verifiedaccess_v1.Verifiedaccess>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | verifiedaccess_v1.Options
) {
  return getAPI<T>('verifiedaccess', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {verifiedaccess_v1};
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
