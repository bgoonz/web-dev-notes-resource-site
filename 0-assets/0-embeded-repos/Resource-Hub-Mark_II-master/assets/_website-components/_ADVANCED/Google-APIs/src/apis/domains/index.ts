// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {domains_v1alpha2} from './v1alpha2';
import {domains_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1alpha2: domains_v1alpha2.Domains,
  v1beta1: domains_v1beta1.Domains,
};

export function domains(version: 'v1alpha2'): domains_v1alpha2.Domains;
export function domains(
  options: domains_v1alpha2.Options
): domains_v1alpha2.Domains;
export function domains(version: 'v1beta1'): domains_v1beta1.Domains;
export function domains(
  options: domains_v1beta1.Options
): domains_v1beta1.Domains;
export function domains<T = domains_v1alpha2.Domains | domains_v1beta1.Domains>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1alpha2'
    | domains_v1alpha2.Options
    | 'v1beta1'
    | domains_v1beta1.Options
) {
  return getAPI<T>('domains', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {domains_v1alpha2};
export {domains_v1beta1};
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
