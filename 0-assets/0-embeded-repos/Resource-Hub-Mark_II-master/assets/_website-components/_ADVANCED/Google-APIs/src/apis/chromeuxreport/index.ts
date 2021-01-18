// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {chromeuxreport_v1} from './v1';

export const VERSIONS = {
  v1: chromeuxreport_v1.Chromeuxreport,
};

export function chromeuxreport(version: 'v1'): chromeuxreport_v1.Chromeuxreport;
export function chromeuxreport(
  options: chromeuxreport_v1.Options
): chromeuxreport_v1.Chromeuxreport;
export function chromeuxreport<T = chromeuxreport_v1.Chromeuxreport>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | chromeuxreport_v1.Options
) {
  return getAPI<T>('chromeuxreport', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {chromeuxreport_v1};
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
