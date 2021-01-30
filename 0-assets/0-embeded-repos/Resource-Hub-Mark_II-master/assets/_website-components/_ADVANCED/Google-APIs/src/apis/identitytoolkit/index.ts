// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {identitytoolkit_v3} from './v3';

export const VERSIONS = {
  v3: identitytoolkit_v3.Identitytoolkit,
};

export function identitytoolkit(
  version: 'v3'
): identitytoolkit_v3.Identitytoolkit;
export function identitytoolkit(
  options: identitytoolkit_v3.Options
): identitytoolkit_v3.Identitytoolkit;
export function identitytoolkit<T = identitytoolkit_v3.Identitytoolkit>(
  this: GoogleConfigurable,
  versionOrOptions: 'v3' | identitytoolkit_v3.Options
) {
  return getAPI<T>('identitytoolkit', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {identitytoolkit_v3};
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
