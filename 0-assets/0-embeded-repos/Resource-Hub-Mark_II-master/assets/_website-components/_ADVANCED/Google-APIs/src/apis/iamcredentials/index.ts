// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {iamcredentials_v1} from './v1';

export const VERSIONS = {
  v1: iamcredentials_v1.Iamcredentials,
};

export function iamcredentials(version: 'v1'): iamcredentials_v1.Iamcredentials;
export function iamcredentials(
  options: iamcredentials_v1.Options
): iamcredentials_v1.Iamcredentials;
export function iamcredentials<T = iamcredentials_v1.Iamcredentials>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | iamcredentials_v1.Options
) {
  return getAPI<T>('iamcredentials', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {iamcredentials_v1};
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
