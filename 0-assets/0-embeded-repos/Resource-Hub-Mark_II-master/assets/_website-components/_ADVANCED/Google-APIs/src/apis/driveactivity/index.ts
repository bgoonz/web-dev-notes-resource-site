// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {driveactivity_v2} from './v2';

export const VERSIONS = {
  v2: driveactivity_v2.Driveactivity,
};

export function driveactivity(version: 'v2'): driveactivity_v2.Driveactivity;
export function driveactivity(
  options: driveactivity_v2.Options
): driveactivity_v2.Driveactivity;
export function driveactivity<T = driveactivity_v2.Driveactivity>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | driveactivity_v2.Options
) {
  return getAPI<T>('driveactivity', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {driveactivity_v2};
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
