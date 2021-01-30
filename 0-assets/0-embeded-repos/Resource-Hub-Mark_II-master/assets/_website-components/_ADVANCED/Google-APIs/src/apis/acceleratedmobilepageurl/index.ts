// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {acceleratedmobilepageurl_v1} from './v1';

export const VERSIONS = {
  v1: acceleratedmobilepageurl_v1.Acceleratedmobilepageurl,
};

export function acceleratedmobilepageurl(
  version: 'v1'
): acceleratedmobilepageurl_v1.Acceleratedmobilepageurl;
export function acceleratedmobilepageurl(
  options: acceleratedmobilepageurl_v1.Options
): acceleratedmobilepageurl_v1.Acceleratedmobilepageurl;
export function acceleratedmobilepageurl<
  T = acceleratedmobilepageurl_v1.Acceleratedmobilepageurl
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | acceleratedmobilepageurl_v1.Options
) {
  return getAPI<T>(
    'acceleratedmobilepageurl',
    versionOrOptions,
    VERSIONS,
    this
  );
}

const auth = new AuthPlus();
export {auth};
export {acceleratedmobilepageurl_v1};
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
