// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {clouddebugger_v2} from './v2';

export const VERSIONS = {
  v2: clouddebugger_v2.Clouddebugger,
};

export function clouddebugger(version: 'v2'): clouddebugger_v2.Clouddebugger;
export function clouddebugger(
  options: clouddebugger_v2.Options
): clouddebugger_v2.Clouddebugger;
export function clouddebugger<T = clouddebugger_v2.Clouddebugger>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | clouddebugger_v2.Options
) {
  return getAPI<T>('clouddebugger', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {clouddebugger_v2};
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
