// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {abusiveexperiencereport_v1} from './v1';

export const VERSIONS = {
  v1: abusiveexperiencereport_v1.Abusiveexperiencereport,
};

export function abusiveexperiencereport(
  version: 'v1'
): abusiveexperiencereport_v1.Abusiveexperiencereport;
export function abusiveexperiencereport(
  options: abusiveexperiencereport_v1.Options
): abusiveexperiencereport_v1.Abusiveexperiencereport;
export function abusiveexperiencereport<
  T = abusiveexperiencereport_v1.Abusiveexperiencereport
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | abusiveexperiencereport_v1.Options
) {
  return getAPI<T>('abusiveexperiencereport', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {abusiveexperiencereport_v1};
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
