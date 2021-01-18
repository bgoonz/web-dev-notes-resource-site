// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {gmail_v1} from './v1';

export const VERSIONS = {
  v1: gmail_v1.Gmail,
};

export function gmail(version: 'v1'): gmail_v1.Gmail;
export function gmail(options: gmail_v1.Options): gmail_v1.Gmail;
export function gmail<T = gmail_v1.Gmail>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | gmail_v1.Options
) {
  return getAPI<T>('gmail', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {gmail_v1};
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
