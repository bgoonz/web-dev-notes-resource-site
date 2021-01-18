// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {composer_v1} from './v1';
import {composer_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: composer_v1.Composer,
  v1beta1: composer_v1beta1.Composer,
};

export function composer(version: 'v1'): composer_v1.Composer;
export function composer(options: composer_v1.Options): composer_v1.Composer;
export function composer(version: 'v1beta1'): composer_v1beta1.Composer;
export function composer(
  options: composer_v1beta1.Options
): composer_v1beta1.Composer;
export function composer<T = composer_v1.Composer | composer_v1beta1.Composer>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | composer_v1.Options
    | 'v1beta1'
    | composer_v1beta1.Options
) {
  return getAPI<T>('composer', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {composer_v1};
export {composer_v1beta1};
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
