// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {doubleclicksearch_v2} from './v2';

export const VERSIONS = {
  v2: doubleclicksearch_v2.Doubleclicksearch,
};

export function doubleclicksearch(
  version: 'v2'
): doubleclicksearch_v2.Doubleclicksearch;
export function doubleclicksearch(
  options: doubleclicksearch_v2.Options
): doubleclicksearch_v2.Doubleclicksearch;
export function doubleclicksearch<T = doubleclicksearch_v2.Doubleclicksearch>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | doubleclicksearch_v2.Options
) {
  return getAPI<T>('doubleclicksearch', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {doubleclicksearch_v2};
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
