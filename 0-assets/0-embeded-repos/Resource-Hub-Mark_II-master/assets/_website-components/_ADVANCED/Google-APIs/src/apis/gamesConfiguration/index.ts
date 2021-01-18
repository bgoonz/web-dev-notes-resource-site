// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {gamesConfiguration_v1configuration} from './v1configuration';

export const VERSIONS = {
  v1configuration: gamesConfiguration_v1configuration.Gamesconfiguration,
};

export function gamesConfiguration(
  version: 'v1configuration'
): gamesConfiguration_v1configuration.Gamesconfiguration;
export function gamesConfiguration(
  options: gamesConfiguration_v1configuration.Options
): gamesConfiguration_v1configuration.Gamesconfiguration;
export function gamesConfiguration<
  T = gamesConfiguration_v1configuration.Gamesconfiguration
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1configuration'
    | gamesConfiguration_v1configuration.Options
) {
  return getAPI<T>('gamesConfiguration', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {gamesConfiguration_v1configuration};
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
