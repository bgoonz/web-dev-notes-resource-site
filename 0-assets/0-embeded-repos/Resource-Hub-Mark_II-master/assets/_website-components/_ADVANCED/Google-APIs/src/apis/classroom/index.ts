// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {classroom_v1} from './v1';

export const VERSIONS = {
  v1: classroom_v1.Classroom,
};

export function classroom(version: 'v1'): classroom_v1.Classroom;
export function classroom(
  options: classroom_v1.Options
): classroom_v1.Classroom;
export function classroom<T = classroom_v1.Classroom>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | classroom_v1.Options
) {
  return getAPI<T>('classroom', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {classroom_v1};
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
