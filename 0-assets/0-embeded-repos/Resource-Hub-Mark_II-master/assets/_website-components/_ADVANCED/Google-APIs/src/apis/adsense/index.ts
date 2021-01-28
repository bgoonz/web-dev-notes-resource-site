// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {adsense_v1_4} from './v1.4';

export const VERSIONS = {
  'v1.4': adsense_v1_4.Adsense,
};

export function adsense(version: 'v1.4'): adsense_v1_4.Adsense;
export function adsense(options: adsense_v1_4.Options): adsense_v1_4.Adsense;
export function adsense<T = adsense_v1_4.Adsense>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1.4' | adsense_v1_4.Options
) {
  return getAPI<T>('adsense', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {adsense_v1_4};
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
