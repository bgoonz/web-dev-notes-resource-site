

import {verifyDefaultAdapter} from '../../../testing/helpers/foundation';
import {setUpFoundationTest} from '../../../testing/helpers/setup';
import {cssClasses, numbers, strings} from '../constants';
import {MDCTopAppBarBaseFoundation} from '../foundation';

describe('MDCTopAppBarBaseFoundation', () => {
  it('exports strings', () => {
    expect('strings' in MDCTopAppBarBaseFoundation).toBe(true);
    expect(MDCTopAppBarBaseFoundation.strings).toEqual(strings);
  });

  it('exports cssClasses', () => {
    expect('cssClasses' in MDCTopAppBarBaseFoundation).toBe(true);
    expect(MDCTopAppBarBaseFoundation.cssClasses).toEqual(cssClasses);
  });

  it('exports numbers', () => {
    expect('numbers' in MDCTopAppBarBaseFoundation).toBe(true);
    expect(MDCTopAppBarBaseFoundation.numbers).toEqual(numbers);
  });

  it('defaultAdapter returns a complete adapter implementation', () => {
    verifyDefaultAdapter(MDCTopAppBarBaseFoundation, [
      'hasClass',
      'addClass',
      'removeClass',
      'setStyle',
      'getTopAppBarHeight',
      'notifyNavigationIconClicked',
      'getViewportScrollY',
      'getTotalActionItems',
    ]);
  });

  const setupTest = () => {
    const {foundation, mockAdapter} =
        setUpFoundationTest(MDCTopAppBarBaseFoundation);
    return {foundation, mockAdapter};
  };

  it('#handleNavigationClick emits a navigation event', () => {
    const {foundation, mockAdapter} = setupTest();
    foundation.handleNavigationClick();
    expect(mockAdapter.notifyNavigationIconClicked).toHaveBeenCalledTimes(1);
  });
});
