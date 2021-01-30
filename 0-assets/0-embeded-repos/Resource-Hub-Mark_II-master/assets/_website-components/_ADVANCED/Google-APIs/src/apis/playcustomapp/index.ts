// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {playcustomapp_v1} from './v1';

export const VERSIONS = {
  v1: playcustomapp_v1.Playcustomapp,
};

export function playcustomapp(version: 'v1'): playcustomapp_v1.Playcustomapp;
export function playcustomapp(
  options: playcustomapp_v1.Options
): playcustomapp_v1.Playcustomapp;
export function playcustomapp<T = playcustomapp_v1.Playcustomapp>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | playcustomapp_v1.Options
) {
  return getAPI<T>('playcustomapp', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {playcustomapp_v1};
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
