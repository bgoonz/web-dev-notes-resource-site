// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {libraryagent_v1} from './v1';

export const VERSIONS = {
  v1: libraryagent_v1.Libraryagent,
};

export function libraryagent(version: 'v1'): libraryagent_v1.Libraryagent;
export function libraryagent(
  options: libraryagent_v1.Options
): libraryagent_v1.Libraryagent;
export function libraryagent<T = libraryagent_v1.Libraryagent>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | libraryagent_v1.Options
) {
  return getAPI<T>('libraryagent', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {libraryagent_v1};
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
