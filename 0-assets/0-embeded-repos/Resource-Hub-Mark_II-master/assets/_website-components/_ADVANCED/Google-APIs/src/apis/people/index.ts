// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {people_v1} from './v1';

export const VERSIONS = {
  v1: people_v1.People,
};

export function people(version: 'v1'): people_v1.People;
export function people(options: people_v1.Options): people_v1.People;
export function people<T = people_v1.People>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | people_v1.Options
) {
  return getAPI<T>('people', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {people_v1};
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
