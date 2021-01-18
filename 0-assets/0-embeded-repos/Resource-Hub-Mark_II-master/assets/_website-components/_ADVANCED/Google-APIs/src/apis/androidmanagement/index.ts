// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {androidmanagement_v1} from './v1';

export const VERSIONS = {
  v1: androidmanagement_v1.Androidmanagement,
};

export function androidmanagement(
  version: 'v1'
): androidmanagement_v1.Androidmanagement;
export function androidmanagement(
  options: androidmanagement_v1.Options
): androidmanagement_v1.Androidmanagement;
export function androidmanagement<T = androidmanagement_v1.Androidmanagement>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | androidmanagement_v1.Options
) {
  return getAPI<T>('androidmanagement', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {androidmanagement_v1};
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
