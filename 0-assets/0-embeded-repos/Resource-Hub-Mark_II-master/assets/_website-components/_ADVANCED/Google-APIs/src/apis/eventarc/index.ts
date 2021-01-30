// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {eventarc_v1beta1} from './v1beta1';

export const VERSIONS = {
  v1beta1: eventarc_v1beta1.Eventarc,
};

export function eventarc(version: 'v1beta1'): eventarc_v1beta1.Eventarc;
export function eventarc(
  options: eventarc_v1beta1.Options
): eventarc_v1beta1.Eventarc;
export function eventarc<T = eventarc_v1beta1.Eventarc>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1beta1' | eventarc_v1beta1.Options
) {
  return getAPI<T>('eventarc', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {eventarc_v1beta1};
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
