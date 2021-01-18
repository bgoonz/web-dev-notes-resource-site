// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {apigateway_v1beta} from './v1beta';

export const VERSIONS = {
  v1beta: apigateway_v1beta.Apigateway,
};

export function apigateway(version: 'v1beta'): apigateway_v1beta.Apigateway;
export function apigateway(
  options: apigateway_v1beta.Options
): apigateway_v1beta.Apigateway;
export function apigateway<T = apigateway_v1beta.Apigateway>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta' | apigateway_v1beta.Options
) {
  return getAPI<T>('apigateway', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {apigateway_v1beta};
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
