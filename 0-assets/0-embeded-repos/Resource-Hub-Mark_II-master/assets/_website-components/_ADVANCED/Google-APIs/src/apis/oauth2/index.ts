// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {oauth2_v2} from './v2';

export const VERSIONS = {
  v2: oauth2_v2.Oauth2,
};

export function oauth2(version: 'v2'): oauth2_v2.Oauth2;
export function oauth2(options: oauth2_v2.Options): oauth2_v2.Oauth2;
export function oauth2<T = oauth2_v2.Oauth2>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | oauth2_v2.Options
) {
  return getAPI<T>('oauth2', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {oauth2_v2};
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
