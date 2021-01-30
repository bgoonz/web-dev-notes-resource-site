// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {area120tables_v1alpha1} from './v1alpha1';

export const VERSIONS = {
  v1alpha1: area120tables_v1alpha1.Area120tables,
};

export function area120tables(
  version: 'v1alpha1'
): area120tables_v1alpha1.Area120tables;
export function area120tables(
  options: area120tables_v1alpha1.Options
): area120tables_v1alpha1.Area120tables;
export function area120tables<T = area120tables_v1alpha1.Area120tables>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1alpha1' | area120tables_v1alpha1.Options
) {
  return getAPI<T>('area120tables', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {area120tables_v1alpha1};
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
