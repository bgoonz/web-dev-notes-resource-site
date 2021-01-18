// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {script_v1} from './v1';

export const VERSIONS = {
  v1: script_v1.Script,
};

export function script(version: 'v1'): script_v1.Script;
export function script(options: script_v1.Options): script_v1.Script;
export function script<T = script_v1.Script>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | script_v1.Options
) {
  return getAPI<T>('script', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {script_v1};
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
