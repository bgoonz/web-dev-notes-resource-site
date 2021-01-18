// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {analyticsreporting_v4} from './v4';

export const VERSIONS = {
  v4: analyticsreporting_v4.Analyticsreporting,
};

export function analyticsreporting(
  version: 'v4'
): analyticsreporting_v4.Analyticsreporting;
export function analyticsreporting(
  options: analyticsreporting_v4.Options
): analyticsreporting_v4.Analyticsreporting;
export function analyticsreporting<
  T = analyticsreporting_v4.Analyticsreporting
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v4' | analyticsreporting_v4.Options
) {
  return getAPI<T>('analyticsreporting', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {analyticsreporting_v4};
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
