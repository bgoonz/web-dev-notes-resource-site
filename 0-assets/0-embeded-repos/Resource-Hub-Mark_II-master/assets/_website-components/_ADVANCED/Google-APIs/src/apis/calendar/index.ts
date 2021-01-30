// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {calendar_v3} from './v3';

export const VERSIONS = {
  v3: calendar_v3.Calendar,
};

export function calendar(version: 'v3'): calendar_v3.Calendar;
export function calendar(options: calendar_v3.Options): calendar_v3.Calendar;
export function calendar<T = calendar_v3.Calendar>(
  this: GoogleConfigurable,
  versionOrOptions: 'v3' | calendar_v3.Options
) {
  return getAPI<T>('calendar', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {calendar_v3};
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
