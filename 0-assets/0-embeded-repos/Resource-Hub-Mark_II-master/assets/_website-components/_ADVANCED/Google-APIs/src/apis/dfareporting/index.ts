// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {dfareporting_v3_3} from './v3.3';
import {dfareporting_v3_4} from './v3.4';

export const VERSIONS = {
  'v3.3': dfareporting_v3_3.Dfareporting,
  'v3.4': dfareporting_v3_4.Dfareporting,
};

export function dfareporting(version: 'v3.3'): dfareporting_v3_3.Dfareporting;
export function dfareporting(
  options: dfareporting_v3_3.Options
): dfareporting_v3_3.Dfareporting;
export function dfareporting(version: 'v3.4'): dfareporting_v3_4.Dfareporting;
export function dfareporting(
  options: dfareporting_v3_4.Options
): dfareporting_v3_4.Dfareporting;
export function dfareporting<
  T = dfareporting_v3_3.Dfareporting | dfareporting_v3_4.Dfareporting
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v3.3'
    | dfareporting_v3_3.Options
    | 'v3.4'
    | dfareporting_v3_4.Options
) {
  return getAPI<T>('dfareporting', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {dfareporting_v3_3};
export {dfareporting_v3_4};
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
