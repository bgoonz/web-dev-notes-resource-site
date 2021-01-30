// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {webfonts_v1} from './v1';

export const VERSIONS = {
  v1: webfonts_v1.Webfonts,
};

export function webfonts(version: 'v1'): webfonts_v1.Webfonts;
export function webfonts(options: webfonts_v1.Options): webfonts_v1.Webfonts;
export function webfonts<T = webfonts_v1.Webfonts>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | webfonts_v1.Options
) {
  return getAPI<T>('webfonts', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {webfonts_v1};
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
