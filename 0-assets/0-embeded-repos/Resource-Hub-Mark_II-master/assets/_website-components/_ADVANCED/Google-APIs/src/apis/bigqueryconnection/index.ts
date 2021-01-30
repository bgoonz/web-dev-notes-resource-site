// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {bigqueryconnection_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: bigqueryconnection_v1beta1.Bigqueryconnection,
};

export function bigqueryconnection(
  version: 'v1beta1'
): bigqueryconnection_v1beta1.Bigqueryconnection;
export function bigqueryconnection(
  options: bigqueryconnection_v1beta1.Options
): bigqueryconnection_v1beta1.Bigqueryconnection;
export function bigqueryconnection<
  T = bigqueryconnection_v1beta1.Bigqueryconnection
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | bigqueryconnection_v1beta1.Options
) {
  return getAPI<T>('bigqueryconnection', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {bigqueryconnection_v1beta1};
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
