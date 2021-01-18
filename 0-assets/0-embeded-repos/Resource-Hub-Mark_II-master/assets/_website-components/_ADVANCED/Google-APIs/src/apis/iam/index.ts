// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {iam_v1} from './v1';

export const VERSIONS = {
  v1: iam_v1.Iam,
};

export function iam(version: 'v1'): iam_v1.Iam;
export function iam(options: iam_v1.Options): iam_v1.Iam;
export function iam<T = iam_v1.Iam>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | iam_v1.Options
) {
  return getAPI<T>('iam', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {iam_v1};
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
