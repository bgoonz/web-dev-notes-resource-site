// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {pubsublite_v1} from './v1';

export const VERSIONS = {
  v1: pubsublite_v1.Pubsublite,
};

export function pubsublite(version: 'v1'): pubsublite_v1.Pubsublite;
export function pubsublite(
  options: pubsublite_v1.Options
): pubsublite_v1.Pubsublite;
export function pubsublite<T = pubsublite_v1.Pubsublite>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | pubsublite_v1.Options
) {
  return getAPI<T>('pubsublite', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {pubsublite_v1};
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
