// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {datamigration_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: datamigration_v1beta1.Datamigration,
};

export function datamigration(
  version: 'v1beta1'
): datamigration_v1beta1.Datamigration;
export function datamigration(
  options: datamigration_v1beta1.Options
): datamigration_v1beta1.Datamigration;
export function datamigration<T = datamigration_v1beta1.Datamigration>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | datamigration_v1beta1.Options
) {
  return getAPI<T>('datamigration', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {datamigration_v1beta1};
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
