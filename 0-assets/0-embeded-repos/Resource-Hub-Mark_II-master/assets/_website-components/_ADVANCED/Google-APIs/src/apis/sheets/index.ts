// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {sheets_v4} from './v4';

export const VERSIONS = {
  v4: sheets_v4.Sheets,
};

export function sheets(version: 'v4'): sheets_v4.Sheets;
export function sheets(options: sheets_v4.Options): sheets_v4.Sheets;
export function sheets<T = sheets_v4.Sheets>(
  this: GoogleConfigurable,
  versionOrOptions: 'v4' | sheets_v4.Options
) {
  return getAPI<T>('sheets', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {sheets_v4};
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
