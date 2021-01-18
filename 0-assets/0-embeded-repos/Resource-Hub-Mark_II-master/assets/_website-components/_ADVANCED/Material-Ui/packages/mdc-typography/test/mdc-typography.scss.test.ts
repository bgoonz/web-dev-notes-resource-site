

import 'jasmine';

import * as fs from 'fs';
import * as path from 'path';
import {expectStylesWithNoFeaturesToBeEmpty} from '../../../testing/featuretargeting';

describe('mdc-typography.scss', () => {
  expectStylesWithNoFeaturesToBeEmpty(
      path.join(__dirname, 'feature-targeting-any.test.css'));

  it('should allow global variable overrides with @import', () => {
    const css = fs.readFileSync(
                      path.join(__dirname, 'global-variables.test.css'), 'utf8')
                    .trim();
    const headline1Start = css.indexOf('.mdc-typography--headline1 {');
    const headline1End = css.indexOf('}', headline1Start);
    const headline1Css = css.substring(headline1Start, headline1End);
    expect(headline1Css.includes('font-family: Arial'))
        .toBe(true, '$mdc-typography-font-family should override');
    expect(headline1Css.includes('font-size: 1rem'))
        .toBe(
            true, '$mdc-typography-styles-headline1-font-size should override');
  });
});
