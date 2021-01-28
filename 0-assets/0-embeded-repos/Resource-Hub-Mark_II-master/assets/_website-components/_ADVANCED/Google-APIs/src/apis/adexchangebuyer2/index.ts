// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {adexchangebuyer2_v2beta1} from './v2beta1';

export const VERSIONS = {
  v2beta1: adexchangebuyer2_v2beta1.Adexchangebuyer2,
};

export function adexchangebuyer2(
  version: 'v2beta1'
): adexchangebuyer2_v2beta1.Adexchangebuyer2;
export function adexchangebuyer2(
  options: adexchangebuyer2_v2beta1.Options
): adexchangebuyer2_v2beta1.Adexchangebuyer2;
export function adexchangebuyer2<T = adexchangebuyer2_v2beta1.Adexchangebuyer2>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2beta1' | adexchangebuyer2_v2beta1.Options
) {
  return getAPI<T>('adexchangebuyer2', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {adexchangebuyer2_v2beta1};
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
