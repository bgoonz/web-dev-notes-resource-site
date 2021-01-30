// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {alertcenter_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: alertcenter_v1beta1.Alertcenter,
};

export function alertcenter(
  version: 'v1beta1'
): alertcenter_v1beta1.Alertcenter;
export function alertcenter(
  options: alertcenter_v1beta1.Options
): alertcenter_v1beta1.Alertcenter;
export function alertcenter<T = alertcenter_v1beta1.Alertcenter>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | alertcenter_v1beta1.Options
) {
  return getAPI<T>('alertcenter', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {alertcenter_v1beta1};
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
