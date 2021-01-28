// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {accessapproval_v1} from './v1';
import {accessapproval_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: accessapproval_v1.Accessapproval,
  v1beta1: accessapproval_v1beta1.Accessapproval,
};

export function accessapproval(version: 'v1'): accessapproval_v1.Accessapproval;
export function accessapproval(
  options: accessapproval_v1.Options
): accessapproval_v1.Accessapproval;
export function accessapproval(
  version: 'v1beta1'
): accessapproval_v1beta1.Accessapproval;
export function accessapproval(
  options: accessapproval_v1beta1.Options
): accessapproval_v1beta1.Accessapproval;
export function accessapproval<
  T = accessapproval_v1.Accessapproval | accessapproval_v1beta1.Accessapproval
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | accessapproval_v1.Options
    | 'v1beta1'
    | accessapproval_v1beta1.Options
) {
  return getAPI<T>('accessapproval', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {accessapproval_v1};
export {accessapproval_v1beta1};
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
