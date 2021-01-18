// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {servicedirectory_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: servicedirectory_v1beta1.Servicedirectory,
};

export function servicedirectory(
  version: 'v1beta1'
): servicedirectory_v1beta1.Servicedirectory;
export function servicedirectory(
  options: servicedirectory_v1beta1.Options
): servicedirectory_v1beta1.Servicedirectory;
export function servicedirectory<T = servicedirectory_v1beta1.Servicedirectory>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | servicedirectory_v1beta1.Options
) {
  return getAPI<T>('servicedirectory', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {servicedirectory_v1beta1};
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
