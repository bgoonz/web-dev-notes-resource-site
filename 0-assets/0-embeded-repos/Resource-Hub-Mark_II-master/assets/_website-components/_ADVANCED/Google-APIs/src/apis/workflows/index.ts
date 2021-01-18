// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {workflows_v1beta} from './v1beta';

export const VERSIONS = {
  v1beta: workflows_v1beta.Workflows,
};

export function workflows(version: 'v1beta'): workflows_v1beta.Workflows;
export function workflows(
  options: workflows_v1beta.Options
): workflows_v1beta.Workflows;
export function workflows<T = workflows_v1beta.Workflows>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta' | workflows_v1beta.Options
) {
  return getAPI<T>('workflows', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {workflows_v1beta};
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
