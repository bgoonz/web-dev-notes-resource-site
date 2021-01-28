// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {sourcerepo_v1} from './v1';

export const VERSIONS = {
  v1: sourcerepo_v1.Sourcerepo,
};

export function sourcerepo(version: 'v1'): sourcerepo_v1.Sourcerepo;
export function sourcerepo(
  options: sourcerepo_v1.Options
): sourcerepo_v1.Sourcerepo;
export function sourcerepo<T = sourcerepo_v1.Sourcerepo>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | sourcerepo_v1.Options
) {
  return getAPI<T>('sourcerepo', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {sourcerepo_v1};
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
