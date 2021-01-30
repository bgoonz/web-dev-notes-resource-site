// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {playablelocations_v3} from './v3';

export const VERSIONS = {
  v3: playablelocations_v3.Playablelocations,
};

export function playablelocations(
  version: 'v3'
): playablelocations_v3.Playablelocations;
export function playablelocations(
  options: playablelocations_v3.Options
): playablelocations_v3.Playablelocations;
export function playablelocations<T = playablelocations_v3.Playablelocations>(
  this: GoogleConfigurable,
  versionOrOptions: 'v3' | playablelocations_v3.Options
) {
  return getAPI<T>('playablelocations', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {playablelocations_v3};
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
