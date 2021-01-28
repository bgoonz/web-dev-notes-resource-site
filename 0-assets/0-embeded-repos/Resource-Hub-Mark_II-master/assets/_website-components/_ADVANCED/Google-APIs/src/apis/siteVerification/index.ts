// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {siteVerification_v1} from './v1';

export const VERSIONS = {
  v1: siteVerification_v1.Siteverification,
};

export function siteVerification(
  version: 'v1'
): siteVerification_v1.Siteverification;
export function siteVerification(
  options: siteVerification_v1.Options
): siteVerification_v1.Siteverification;
export function siteVerification<T = siteVerification_v1.Siteverification>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | siteVerification_v1.Options
) {
  return getAPI<T>('siteVerification', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {siteVerification_v1};
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
