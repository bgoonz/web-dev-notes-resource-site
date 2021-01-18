// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {texttospeech_v1} from './v1';
import {texttospeech_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1: texttospeech_v1.Texttospeech,
  v1beta1: texttospeech_v1beta1.Texttospeech,
};

export function texttospeech(version: 'v1'): texttospeech_v1.Texttospeech;
export function texttospeech(
  options: texttospeech_v1.Options
): texttospeech_v1.Texttospeech;
export function texttospeech(
  version: 'v1beta1'
): texttospeech_v1beta1.Texttospeech;
export function texttospeech(
  options: texttospeech_v1beta1.Options
): texttospeech_v1beta1.Texttospeech;
export function texttospeech<
  T = texttospeech_v1.Texttospeech | texttospeech_v1beta1.Texttospeech
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | texttospeech_v1.Options
    | 'v1beta1'
    | texttospeech_v1beta1.Options
) {
  return getAPI<T>('texttospeech', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {texttospeech_v1};
export {texttospeech_v1beta1};
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
