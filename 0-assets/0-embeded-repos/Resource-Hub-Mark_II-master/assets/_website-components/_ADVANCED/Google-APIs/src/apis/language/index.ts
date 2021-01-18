// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {language_v1} from './v1';
import {language_v1beta1} from './v1beta1';
import {language_v1beta2} from './v1beta2';

export const VERSIONS = {
  v1: language_v1.Language,
  v1beta1: language_v1beta1.Language,
  v1beta2: language_v1beta2.Language,
};

export function language(version: 'v1'): language_v1.Language;
export function language(options: language_v1.Options): language_v1.Language;
export function language(version: 'v1beta1'): language_v1beta1.Language;
export function language(
  options: language_v1beta1.Options
): language_v1beta1.Language;
export function language(version: 'v1beta2'): language_v1beta2.Language;
export function language(
  options: language_v1beta2.Options
): language_v1beta2.Language;
export function language<
  T =
    | language_v1.Language
    | language_v1beta1.Language
    | language_v1beta2.Language
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | language_v1.Options
    | 'v1beta1'
    | language_v1beta1.Options
    | 'v1beta2'
    | language_v1beta2.Options
) {
  return getAPI<T>('language', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {language_v1};
export {language_v1beta1};
export {language_v1beta2};
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
