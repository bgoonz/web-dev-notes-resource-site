// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {cloudasset_v1} from './v1';
import {cloudasset_v1beta1} from './v1beta1';
import {cloudasset_v1p1beta1} from './v1p1beta1';
import {cloudasset_v1p4beta1} from './v1p4beta1';
import {cloudasset_v1p5beta1} from './v1p5beta1';

export const VERSIONS = {
  v1: cloudasset_v1.Cloudasset,
  v1beta1: cloudasset_v1beta1.Cloudasset,
  v1p1beta1: cloudasset_v1p1beta1.Cloudasset,
  v1p4beta1: cloudasset_v1p4beta1.Cloudasset,
  v1p5beta1: cloudasset_v1p5beta1.Cloudasset,
};

export function cloudasset(version: 'v1'): cloudasset_v1.Cloudasset;
export function cloudasset(
  options: cloudasset_v1.Options
): cloudasset_v1.Cloudasset;
export function cloudasset(version: 'v1beta1'): cloudasset_v1beta1.Cloudasset;
export function cloudasset(
  options: cloudasset_v1beta1.Options
): cloudasset_v1beta1.Cloudasset;
export function cloudasset(
  version: 'v1p1beta1'
): cloudasset_v1p1beta1.Cloudasset;
export function cloudasset(
  options: cloudasset_v1p1beta1.Options
): cloudasset_v1p1beta1.Cloudasset;
export function cloudasset(
  version: 'v1p4beta1'
): cloudasset_v1p4beta1.Cloudasset;
export function cloudasset(
  options: cloudasset_v1p4beta1.Options
): cloudasset_v1p4beta1.Cloudasset;
export function cloudasset(
  version: 'v1p5beta1'
): cloudasset_v1p5beta1.Cloudasset;
export function cloudasset(
  options: cloudasset_v1p5beta1.Options
): cloudasset_v1p5beta1.Cloudasset;
export function cloudasset<
  T =
    | cloudasset_v1.Cloudasset
    | cloudasset_v1beta1.Cloudasset
    | cloudasset_v1p1beta1.Cloudasset
    | cloudasset_v1p4beta1.Cloudasset
    | cloudasset_v1p5beta1.Cloudasset
>(
  this: GoogleConfigurable,
  versionOrOptions:
    | 'v1'
    | cloudasset_v1.Options
    | 'v1beta1'
    | cloudasset_v1beta1.Options
    | 'v1p1beta1'
    | cloudasset_v1p1beta1.Options
    | 'v1p4beta1'
    | cloudasset_v1p4beta1.Options
    | 'v1p5beta1'
    | cloudasset_v1p5beta1.Options
) {
  return getAPI<T>('cloudasset', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {cloudasset_v1};
export {cloudasset_v1beta1};
export {cloudasset_v1p1beta1};
export {cloudasset_v1p4beta1};
export {cloudasset_v1p5beta1};
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
