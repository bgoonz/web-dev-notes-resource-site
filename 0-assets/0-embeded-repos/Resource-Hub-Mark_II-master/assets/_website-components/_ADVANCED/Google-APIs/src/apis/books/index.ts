// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {books_v1} from './v1';

export const VERSIONS = {
  v1: books_v1.Books,
};

export function books(version: 'v1'): books_v1.Books;
export function books(options: books_v1.Options): books_v1.Books;
export function books<T = books_v1.Books>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | books_v1.Options
) {
  return getAPI<T>('books', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {books_v1};
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
