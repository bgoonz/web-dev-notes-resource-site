// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {gamesManagement_v1management} from './v1management';

export const VERSIONS = {
  v1management: gamesManagement_v1management.Gamesmanagement,
};

export function gamesManagement(
  version: 'v1management'
): gamesManagement_v1management.Gamesmanagement;
export function gamesManagement(
  options: gamesManagement_v1management.Options
): gamesManagement_v1management.Gamesmanagement;
export function gamesManagement<
  T = gamesManagement_v1management.Gamesmanagement
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1management' | gamesManagement_v1management.Options
) {
  return getAPI<T>('gamesManagement', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {gamesManagement_v1management};
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
