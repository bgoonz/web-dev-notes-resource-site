// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {logging_v2} from './v2';

export const VERSIONS = {
  v2: logging_v2.Logging,
};

export function logging(version: 'v2'): logging_v2.Logging;
export function logging(options: logging_v2.Options): logging_v2.Logging;
export function logging<T = logging_v2.Logging>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | logging_v2.Options
) {
  return getAPI<T>('logging', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {logging_v2};
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
