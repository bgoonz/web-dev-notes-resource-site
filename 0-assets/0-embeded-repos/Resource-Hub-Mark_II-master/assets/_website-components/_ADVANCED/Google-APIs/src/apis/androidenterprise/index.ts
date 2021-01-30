// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {androidenterprise_v1} from './v1';

export const VERSIONS = {
  v1: androidenterprise_v1.Androidenterprise,
};

export function androidenterprise(
  version: 'v1'
): androidenterprise_v1.Androidenterprise;
export function androidenterprise(
  options: androidenterprise_v1.Options
): androidenterprise_v1.Androidenterprise;
export function androidenterprise<T = androidenterprise_v1.Androidenterprise>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | androidenterprise_v1.Options
) {
  return getAPI<T>('androidenterprise', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {androidenterprise_v1};
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
