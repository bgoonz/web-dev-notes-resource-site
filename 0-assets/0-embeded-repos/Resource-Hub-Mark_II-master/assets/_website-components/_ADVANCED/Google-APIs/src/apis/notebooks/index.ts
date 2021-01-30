// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {notebooks_v1} from './v1';

export const VERSIONS = {
  v1: notebooks_v1.Notebooks,
};

export function notebooks(version: 'v1'): notebooks_v1.Notebooks;
export function notebooks(
  options: notebooks_v1.Options
): notebooks_v1.Notebooks;
export function notebooks<T = notebooks_v1.Notebooks>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | notebooks_v1.Options
) {
  return getAPI<T>('notebooks', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {notebooks_v1};
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
