// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {tasks_v1} from './v1';

export const VERSIONS = {
  v1: tasks_v1.Tasks,
};

export function tasks(version: 'v1'): tasks_v1.Tasks;
export function tasks(options: tasks_v1.Options): tasks_v1.Tasks;
export function tasks<T = tasks_v1.Tasks>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | tasks_v1.Options
) {
  return getAPI<T>('tasks', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {tasks_v1};
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
