// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {localservices_v1} from './v1';

export const VERSIONS = {
  v1: localservices_v1.Localservices,
};

export function localservices(version: 'v1'): localservices_v1.Localservices;
export function localservices(
  options: localservices_v1.Options
): localservices_v1.Localservices;
export function localservices<T = localservices_v1.Localservices>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | localservices_v1.Options
) {
  return getAPI<T>('localservices', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {localservices_v1};
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
