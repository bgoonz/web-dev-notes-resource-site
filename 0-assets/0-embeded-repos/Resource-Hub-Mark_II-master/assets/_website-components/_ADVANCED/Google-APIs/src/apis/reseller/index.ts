// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {reseller_v1} from './v1';

export const VERSIONS = {
  v1: reseller_v1.Reseller,
};

export function reseller(version: 'v1'): reseller_v1.Reseller;
export function reseller(options: reseller_v1.Options): reseller_v1.Reseller;
export function reseller<T = reseller_v1.Reseller>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | reseller_v1.Options
) {
  return getAPI<T>('reseller', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {reseller_v1};
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
