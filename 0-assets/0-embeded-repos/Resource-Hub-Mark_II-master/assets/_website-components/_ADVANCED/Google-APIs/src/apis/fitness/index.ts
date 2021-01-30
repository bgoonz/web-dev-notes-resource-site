// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {fitness_v1} from './v1';

export const VERSIONS = {
  v1: fitness_v1.Fitness,
};

export function fitness(version: 'v1'): fitness_v1.Fitness;
export function fitness(options: fitness_v1.Options): fitness_v1.Fitness;
export function fitness<T = fitness_v1.Fitness>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | fitness_v1.Options
) {
  return getAPI<T>('fitness', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {fitness_v1};
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
