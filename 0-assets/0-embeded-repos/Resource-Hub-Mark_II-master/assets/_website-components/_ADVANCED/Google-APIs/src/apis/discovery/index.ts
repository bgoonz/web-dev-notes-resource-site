// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {discovery_v1} from './v1';

export const VERSIONS = {
  v1: discovery_v1.Discovery,
};

export function discovery(version: 'v1'): discovery_v1.Discovery;
export function discovery(
  options: discovery_v1.Options
): discovery_v1.Discovery;
export function discovery<T = discovery_v1.Discovery>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | discovery_v1.Options
) {
  return getAPI<T>('discovery', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {discovery_v1};
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
