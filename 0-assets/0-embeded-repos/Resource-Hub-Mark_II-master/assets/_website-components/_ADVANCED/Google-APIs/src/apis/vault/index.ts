// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {vault_v1} from './v1';

export const VERSIONS = {
  v1: vault_v1.Vault,
};

export function vault(version: 'v1'): vault_v1.Vault;
export function vault(options: vault_v1.Options): vault_v1.Vault;
export function vault<T = vault_v1.Vault>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | vault_v1.Options
) {
  return getAPI<T>('vault', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {vault_v1};
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
