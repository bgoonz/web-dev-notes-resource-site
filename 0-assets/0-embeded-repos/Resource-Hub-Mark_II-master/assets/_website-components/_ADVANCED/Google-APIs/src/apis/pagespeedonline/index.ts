// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {pagespeedonline_v5} from './v5';

export const VERSIONS = {
  v5: pagespeedonline_v5.Pagespeedonline,
};

export function pagespeedonline(
  version: 'v5'
): pagespeedonline_v5.Pagespeedonline;
export function pagespeedonline(
  options: pagespeedonline_v5.Options
): pagespeedonline_v5.Pagespeedonline;
export function pagespeedonline<T = pagespeedonline_v5.Pagespeedonline>(
  this: GoogleConfigurable,
  versionOrOptions: 'v5' | pagespeedonline_v5.Options
) {
  return getAPI<T>('pagespeedonline', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {pagespeedonline_v5};
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
