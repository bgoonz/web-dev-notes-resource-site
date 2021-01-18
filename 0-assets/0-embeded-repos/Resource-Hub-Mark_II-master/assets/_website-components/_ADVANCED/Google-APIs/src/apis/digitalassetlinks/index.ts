// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {digitalassetlinks_v1} from './v1';

export const VERSIONS = {
  v1: digitalassetlinks_v1.Digitalassetlinks,
};

export function digitalassetlinks(
  version: 'v1'
): digitalassetlinks_v1.Digitalassetlinks;
export function digitalassetlinks(
  options: digitalassetlinks_v1.Options
): digitalassetlinks_v1.Digitalassetlinks;
export function digitalassetlinks<T = digitalassetlinks_v1.Digitalassetlinks>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | digitalassetlinks_v1.Options
) {
  return getAPI<T>('digitalassetlinks', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {digitalassetlinks_v1};
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
