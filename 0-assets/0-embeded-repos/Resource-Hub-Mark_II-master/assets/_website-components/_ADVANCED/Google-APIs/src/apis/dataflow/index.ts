// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {dataflow_v1b3} from './v1b3';

export const VERSIONS = {
  v1b3: dataflow_v1b3.Dataflow,
};

export function dataflow(version: 'v1b3'): dataflow_v1b3.Dataflow;
export function dataflow(
  options: dataflow_v1b3.Options
): dataflow_v1b3.Dataflow;
export function dataflow<T = dataflow_v1b3.Dataflow>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1b3' | dataflow_v1b3.Options
) {
  return getAPI<T>('dataflow', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {dataflow_v1b3};
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
