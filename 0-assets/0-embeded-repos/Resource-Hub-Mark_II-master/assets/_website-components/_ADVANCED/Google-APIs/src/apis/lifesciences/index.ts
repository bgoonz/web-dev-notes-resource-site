// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {lifesciences_v2beta} from './v2beta';

export const VERSIONS = {
  v2beta: lifesciences_v2beta.Lifesciences,
};

export function lifesciences(
  version: 'v2beta'
): lifesciences_v2beta.Lifesciences;
export function lifesciences(
  options: lifesciences_v2beta.Options
): lifesciences_v2beta.Lifesciences;
export function lifesciences<T = lifesciences_v2beta.Lifesciences>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2beta' | lifesciences_v2beta.Options
) {
  return getAPI<T>('lifesciences', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {lifesciences_v2beta};
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
