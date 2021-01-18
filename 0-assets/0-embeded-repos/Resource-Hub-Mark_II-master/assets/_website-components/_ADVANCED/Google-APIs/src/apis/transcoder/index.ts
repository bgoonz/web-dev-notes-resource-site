// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {transcoder_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: transcoder_v1beta1.Transcoder,
};

export function transcoder(version: 'v1beta1'): transcoder_v1beta1.Transcoder;
export function transcoder(
  options: transcoder_v1beta1.Options
): transcoder_v1beta1.Transcoder;
export function transcoder<T = transcoder_v1beta1.Transcoder>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | transcoder_v1beta1.Options
) {
  return getAPI<T>('transcoder', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {transcoder_v1beta1};
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
