

import 'jasmine';

import * as path from 'path';
import {expectStylesWithNoFeaturesToBeEmpty} from '../../../testing/featuretargeting';

describe('mdc-touch-target.scss', () => {
  expectStylesWithNoFeaturesToBeEmpty(
      path.join(__dirname, 'feature-targeting-any.test.css'));
});
