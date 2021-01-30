// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {civicinfo_v2} from './v2';

export const VERSIONS = {
  v2: civicinfo_v2.Civicinfo,
};

export function civicinfo(version: 'v2'): civicinfo_v2.Civicinfo;
export function civicinfo(
  options: civicinfo_v2.Options
): civicinfo_v2.Civicinfo;
export function civicinfo<T = civicinfo_v2.Civicinfo>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | civicinfo_v2.Options
) {
  return getAPI<T>('civicinfo', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {civicinfo_v2};
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
