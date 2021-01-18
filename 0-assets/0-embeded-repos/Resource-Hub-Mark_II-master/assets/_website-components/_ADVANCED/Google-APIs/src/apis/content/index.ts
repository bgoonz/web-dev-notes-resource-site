// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {content_v2_1} from './v2.1';
import {content_v2} from './v2';

export const VERSIONS = {
  'v2.1': content_v2_1.Content,
  v2: content_v2.Content,
};

export function content(version: 'v2.1'): content_v2_1.Content;
export function content(options: content_v2_1.Options): content_v2_1.Content;
export function content(version: 'v2'): content_v2.Content;
export function content(options: content_v2.Options): content_v2.Content;
export function content<T = content_v2_1.Content | content_v2.Content>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2.1' | content_v2_1.Options | 'v2' | content_v2.Options
) {
  return getAPI<T>('content', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {content_v2_1};
export {content_v2};
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
