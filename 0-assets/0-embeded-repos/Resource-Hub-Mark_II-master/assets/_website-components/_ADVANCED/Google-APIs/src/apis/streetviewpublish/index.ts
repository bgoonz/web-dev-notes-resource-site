// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {streetviewpublish_v1} from './v1';

export const VERSIONS = {
  v1: streetviewpublish_v1.Streetviewpublish,
};

export function streetviewpublish(
  version: 'v1'
): streetviewpublish_v1.Streetviewpublish;
export function streetviewpublish(
  options: streetviewpublish_v1.Options
): streetviewpublish_v1.Streetviewpublish;
export function streetviewpublish<T = streetviewpublish_v1.Streetviewpublish>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | streetviewpublish_v1.Options
) {
  return getAPI<T>('streetviewpublish', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {streetviewpublish_v1};
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
