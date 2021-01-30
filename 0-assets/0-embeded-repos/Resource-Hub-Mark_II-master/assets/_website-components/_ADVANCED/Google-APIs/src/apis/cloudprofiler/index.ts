// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudprofiler_v2} from './v2';

export const VERSIONS = {
  v2: cloudprofiler_v2.Cloudprofiler,
};

export function cloudprofiler(version: 'v2'): cloudprofiler_v2.Cloudprofiler;
export function cloudprofiler(
  options: cloudprofiler_v2.Options
): cloudprofiler_v2.Cloudprofiler;
export function cloudprofiler<T = cloudprofiler_v2.Cloudprofiler>(
  this: GoogleConfigurable,
  versionOrOptions: 'v2' | cloudprofiler_v2.Options
) {
  return getAPI<T>('cloudprofiler', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudprofiler_v2};
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
