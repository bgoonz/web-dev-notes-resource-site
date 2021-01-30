// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {workflowexecutions_v1beta} from './v1beta';

export const VERSIONS = {
  v1beta: workflowexecutions_v1beta.Workflowexecutions,
};

export function workflowexecutions(
  version: 'v1beta'
): workflowexecutions_v1beta.Workflowexecutions;
export function workflowexecutions(
  options: workflowexecutions_v1beta.Options
): workflowexecutions_v1beta.Workflowexecutions;
export function workflowexecutions<
  T = workflowexecutions_v1beta.Workflowexecutions
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta' | workflowexecutions_v1beta.Options
) {
  return getAPI<T>('workflowexecutions', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {workflowexecutions_v1beta};
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
