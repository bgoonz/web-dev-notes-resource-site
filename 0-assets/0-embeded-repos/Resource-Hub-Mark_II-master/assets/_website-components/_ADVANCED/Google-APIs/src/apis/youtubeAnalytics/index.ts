// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {youtubeAnalytics_v1} from './v1';
import {youtubeAnalytics_v2} from './v2';

export const VERSIONS = {
  v1: youtubeAnalytics_v1.Youtubeanalytics,
  v2: youtubeAnalytics_v2.Youtubeanalytics,
};

export function youtubeAnalytics(
  version: 'v1'
): youtubeAnalytics_v1.Youtubeanalytics;
export function youtubeAnalytics(
  options: youtubeAnalytics_v1.Options
): youtubeAnalytics_v1.Youtubeanalytics;
export function youtubeAnalytics(
  version: 'v2'
): youtubeAnalytics_v2.Youtubeanalytics;
export function youtubeAnalytics(
  options: youtubeAnalytics_v2.Options
): youtubeAnalytics_v2.Youtubeanalytics;
export function youtubeAnalytics<
  T =
    | youtubeAnalytics_v1.Youtubeanalytics
    | youtubeAnalytics_v2.Youtubeanalytics
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | youtubeAnalytics_v1.Options
    | 'v2'
    | youtubeAnalytics_v2.Options
) {
  return getAPI<T>('youtubeAnalytics', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {youtubeAnalytics_v1};
export {youtubeAnalytics_v2};
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
