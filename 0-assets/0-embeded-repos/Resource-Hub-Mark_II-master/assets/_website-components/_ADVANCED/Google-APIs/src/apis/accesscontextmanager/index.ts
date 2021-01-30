// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {accesscontextmanager_v1} from './v1';
import {accesscontextmanager_v1beta} from './v1beta';

export const VERSIONS = {
  v1: accesscontextmanager_v1.Accesscontextmanager,
  v1beta: accesscontextmanager_v1beta.Accesscontextmanager,
};

export function accesscontextmanager(
  version: 'v1'
): accesscontextmanager_v1.Accesscontextmanager;
export function accesscontextmanager(
  options: accesscontextmanager_v1.Options
): accesscontextmanager_v1.Accesscontextmanager;
export function accesscontextmanager(
  version: 'v1beta'
): accesscontextmanager_v1beta.Accesscontextmanager;
export function accesscontextmanager(
  options: accesscontextmanager_v1beta.Options
): accesscontextmanager_v1beta.Accesscontextmanager;
export function accesscontextmanager<
  T =
    | accesscontextmanager_v1.Accesscontextmanager
    | accesscontextmanager_v1beta.Accesscontextmanager
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | accesscontextmanager_v1.Options
    | 'v1beta'
    | accesscontextmanager_v1beta.Options
) {
  return getAPI<T>('accesscontextmanager', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {accesscontextmanager_v1};
export {accesscontextmanager_v1beta};
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
