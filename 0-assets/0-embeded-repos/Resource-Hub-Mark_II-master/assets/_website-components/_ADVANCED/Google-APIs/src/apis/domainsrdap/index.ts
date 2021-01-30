// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {domainsrdap_v1} from './v1';

export const VERSIONS = {
  v1: domainsrdap_v1.Domainsrdap,
};

export function domainsrdap(version: 'v1'): domainsrdap_v1.Domainsrdap;
export function domainsrdap(
  options: domainsrdap_v1.Options
): domainsrdap_v1.Domainsrdap;
export function domainsrdap<T = domainsrdap_v1.Domainsrdap>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | domainsrdap_v1.Options
) {
  return getAPI<T>('domainsrdap', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {domainsrdap_v1};
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
