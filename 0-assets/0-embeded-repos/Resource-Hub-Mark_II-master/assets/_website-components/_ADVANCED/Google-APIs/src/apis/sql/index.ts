// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {sql_v1beta4} from './v1beta4';

export const VERSIONS = {
  v1beta4: sql_v1beta4.Sql,
};

export function sql(version: 'v1beta4'): sql_v1beta4.Sql;
export function sql(options: sql_v1beta4.Options): sql_v1beta4.Sql;
export function sql<T = sql_v1beta4.Sql>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta4' | sql_v1beta4.Options
) {
  return getAPI<T>('sql', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {sql_v1beta4};
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
