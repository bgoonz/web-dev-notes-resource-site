// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {homegraph_v1} from './v1';

export const VERSIONS = {
  v1: homegraph_v1.Homegraph,
};

export function homegraph(version: 'v1'): homegraph_v1.Homegraph;
export function homegraph(
  options: homegraph_v1.Options
): homegraph_v1.Homegraph;
export function homegraph<T = homegraph_v1.Homegraph>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | homegraph_v1.Options
) {
  return getAPI<T>('homegraph', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {homegraph_v1};
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
