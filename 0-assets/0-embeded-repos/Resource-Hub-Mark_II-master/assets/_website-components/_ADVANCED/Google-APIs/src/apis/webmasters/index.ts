// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {webmasters_v3} from './v3';

export const VERSIONS = {
  v3: webmasters_v3.Webmasters,
};

export function webmasters(version: 'v3'): webmasters_v3.Webmasters;
export function webmasters(
  options: webmasters_v3.Options
): webmasters_v3.Webmasters;
export function webmasters<T = webmasters_v3.Webmasters>(
  this: GoogleConfigurable,
  versionOrOptions: 'v3' | webmasters_v3.Options
) {
  return getAPI<T>('webmasters', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {webmasters_v3};
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
