// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {privateca_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: privateca_v1beta1.Privateca,
};

export function privateca(version: 'v1beta1'): privateca_v1beta1.Privateca;
export function privateca(
  options: privateca_v1beta1.Options
): privateca_v1beta1.Privateca;
export function privateca<T = privateca_v1beta1.Privateca>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | privateca_v1beta1.Options
) {
  return getAPI<T>('privateca', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {privateca_v1beta1};
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
