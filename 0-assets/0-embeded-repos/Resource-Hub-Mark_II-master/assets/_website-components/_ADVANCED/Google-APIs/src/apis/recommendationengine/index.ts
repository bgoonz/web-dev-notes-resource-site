// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {recommendationengine_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: recommendationengine_v1beta1.Recommendationengine,
};

export function recommendationengine(
  version: 'v1beta1'
): recommendationengine_v1beta1.Recommendationengine;
export function recommendationengine(
  options: recommendationengine_v1beta1.Options
): recommendationengine_v1beta1.Recommendationengine;
export function recommendationengine<
  T = recommendationengine_v1beta1.Recommendationengine
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | recommendationengine_v1beta1.Options
) {
  return getAPI<T>('recommendationengine', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {recommendationengine_v1beta1};
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
