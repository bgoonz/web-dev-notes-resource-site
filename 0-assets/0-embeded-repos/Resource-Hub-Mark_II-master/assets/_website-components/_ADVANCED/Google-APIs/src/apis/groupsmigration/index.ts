// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {groupsmigration_v1} from './v1';

export const VERSIONS = {
  v1: groupsmigration_v1.Groupsmigration,
};

export function groupsmigration(
  version: 'v1'
): groupsmigration_v1.Groupsmigration;
export function groupsmigration(
  options: groupsmigration_v1.Options
): groupsmigration_v1.Groupsmigration;
export function groupsmigration<T = groupsmigration_v1.Groupsmigration>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | groupsmigration_v1.Options
) {
  return getAPI<T>('groupsmigration', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {groupsmigration_v1};
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
