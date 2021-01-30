// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {licensing_v1} from './v1';

export const VERSIONS = {
  v1: licensing_v1.Licensing,
};

export function licensing(version: 'v1'): licensing_v1.Licensing;
export function licensing(
  options: licensing_v1.Options
): licensing_v1.Licensing;
export function licensing<T = licensing_v1.Licensing>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | licensing_v1.Options
) {
  return getAPI<T>('licensing', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {licensing_v1};
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
