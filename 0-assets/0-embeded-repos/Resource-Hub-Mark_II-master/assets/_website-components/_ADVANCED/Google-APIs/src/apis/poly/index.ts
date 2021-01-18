// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {poly_v1} from './v1';

export const VERSIONS = {
  v1: poly_v1.Poly,
};

export function poly(version: 'v1'): poly_v1.Poly;
export function poly(options: poly_v1.Options): poly_v1.Poly;
export function poly<T = poly_v1.Poly>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | poly_v1.Options
) {
  return getAPI<T>('poly', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {poly_v1};
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
