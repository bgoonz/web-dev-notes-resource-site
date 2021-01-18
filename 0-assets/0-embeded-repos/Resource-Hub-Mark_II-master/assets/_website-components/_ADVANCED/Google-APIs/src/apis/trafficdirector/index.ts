// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {trafficdirector_v2} from './v2';

export const VERSIONS = {
  v2: trafficdirector_v2.Trafficdirector,
};

export function trafficdirector(
  version: 'v2'
): trafficdirector_v2.Trafficdirector;
export function trafficdirector(
  options: trafficdirector_v2.Options
): trafficdirector_v2.Trafficdirector;
export function trafficdirector<T = trafficdirector_v2.Trafficdirector>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | trafficdirector_v2.Options
) {
  return getAPI<T>('trafficdirector', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {trafficdirector_v2};
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
