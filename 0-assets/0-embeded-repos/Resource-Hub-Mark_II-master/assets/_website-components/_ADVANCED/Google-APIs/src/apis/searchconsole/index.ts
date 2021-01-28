// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {searchconsole_v1} from './v1';

export const VERSIONS = {
  v1: searchconsole_v1.Searchconsole,
};

export function searchconsole(version: 'v1'): searchconsole_v1.Searchconsole;
export function searchconsole(
  options: searchconsole_v1.Options
): searchconsole_v1.Searchconsole;
export function searchconsole<T = searchconsole_v1.Searchconsole>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | searchconsole_v1.Options
) {
  return getAPI<T>('searchconsole', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {searchconsole_v1};
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
