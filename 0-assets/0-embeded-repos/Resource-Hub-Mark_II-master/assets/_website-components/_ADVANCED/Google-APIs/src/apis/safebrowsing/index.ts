// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {safebrowsing_v4} from './v4';

export const VERSIONS = {
  v4: safebrowsing_v4.Safebrowsing,
};

export function safebrowsing(version: 'v4'): safebrowsing_v4.Safebrowsing;
export function safebrowsing(
  options: safebrowsing_v4.Options
): safebrowsing_v4.Safebrowsing;
export function safebrowsing<T = safebrowsing_v4.Safebrowsing>(
  this: GoogleConfigurable,
  versionOrOptions: 'v4' | safebrowsing_v4.Options
) {
  return getAPI<T>('safebrowsing', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {safebrowsing_v4};
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
