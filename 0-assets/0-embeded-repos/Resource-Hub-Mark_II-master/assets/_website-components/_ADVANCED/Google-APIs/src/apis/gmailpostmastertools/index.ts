// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {gmailpostmastertools_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: gmailpostmastertools_v1beta1.Gmailpostmastertools,
};

export function gmailpostmastertools(
  version: 'v1beta1'
): gmailpostmastertools_v1beta1.Gmailpostmastertools;
export function gmailpostmastertools(
  options: gmailpostmastertools_v1beta1.Options
): gmailpostmastertools_v1beta1.Gmailpostmastertools;
export function gmailpostmastertools<
  T = gmailpostmastertools_v1beta1.Gmailpostmastertools
>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | gmailpostmastertools_v1beta1.Options
) {
  return getAPI<T>('gmailpostmastertools', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {gmailpostmastertools_v1beta1};
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
