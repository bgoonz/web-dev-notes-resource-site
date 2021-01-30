// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {manufacturers_v1} from './v1';

export const VERSIONS = {
  v1: manufacturers_v1.Manufacturers,
};

export function manufacturers(version: 'v1'): manufacturers_v1.Manufacturers;
export function manufacturers(
  options: manufacturers_v1.Options
): manufacturers_v1.Manufacturers;
export function manufacturers<T = manufacturers_v1.Manufacturers>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | manufacturers_v1.Options
) {
  return getAPI<T>('manufacturers', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {manufacturers_v1};
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
