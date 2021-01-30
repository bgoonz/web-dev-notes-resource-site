// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {games_v1} from './v1';

export const VERSIONS = {
  v1: games_v1.Games,
};

export function games(version: 'v1'): games_v1.Games;
export function games(options: games_v1.Options): games_v1.Games;
export function games<T = games_v1.Games>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | games_v1.Options
) {
  return getAPI<T>('games', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {games_v1};
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
