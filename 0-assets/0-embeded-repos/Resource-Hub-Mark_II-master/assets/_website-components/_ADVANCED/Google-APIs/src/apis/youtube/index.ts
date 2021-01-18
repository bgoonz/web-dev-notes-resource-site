// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {youtube_v3} from './v3';

export const VERSIONS = {
  v3: youtube_v3.Youtube,
};

export function youtube(version: 'v3'): youtube_v3.Youtube;
export function youtube(options: youtube_v3.Options): youtube_v3.Youtube;
export function youtube<T = youtube_v3.Youtube>(
  this: GoogleConfigurable,
  versionOrOptions: 'v3' | youtube_v3.Options
) {
  return getAPI<T>('youtube', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {youtube_v3};
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
