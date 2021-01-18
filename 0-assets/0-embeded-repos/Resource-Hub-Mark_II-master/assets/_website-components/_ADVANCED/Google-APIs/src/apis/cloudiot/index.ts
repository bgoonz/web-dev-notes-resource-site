// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudiot_v1} from './v1';

export const VERSIONS = {
  v1: cloudiot_v1.Cloudiot,
};

export function cloudiot(version: 'v1'): cloudiot_v1.Cloudiot;
export function cloudiot(options: cloudiot_v1.Options): cloudiot_v1.Cloudiot;
export function cloudiot<T = cloudiot_v1.Cloudiot>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | cloudiot_v1.Options
) {
  return getAPI<T>('cloudiot', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudiot_v1};
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
