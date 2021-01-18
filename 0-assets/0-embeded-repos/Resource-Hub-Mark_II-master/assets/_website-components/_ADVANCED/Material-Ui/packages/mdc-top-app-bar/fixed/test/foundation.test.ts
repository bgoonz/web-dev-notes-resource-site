

import {createMockAdapter} from '../../../../testing/helpers/foundation';
import {MDCTopAppBarFoundation} from '../../standard/foundation';
import {MDCFixedTopAppBarFoundation} from '../foundation';

describe('MDCFixedTopAppBarFoundation', () => {
  const setupTest = () => {
    const mockAdapter = createMockAdapter(MDCTopAppBarFoundation);
    const foundation = new MDCFixedTopAppBarFoundation(mockAdapter);
    return {foundation, mockAdapter};
  };

  it('#handleTargetScroll calls #adapter.getViewportScrollY', () => {
    const {foundation, mockAdapter} = setupTest();
    foundation.handleTargetScroll();
    // twice because it is called once in the standard foundation
    expect(mockAdapter.getViewportScrollY).toHaveBeenCalledTimes(2);
  });

  it('#handleTargetScroll calls #adapter.addClass if adapter.getViewportScrollY > 0',
     () => {
       const {foundation, mockAdapter} = setupTest();
       mockAdapter.getViewportScrollY.and.returnValue(1);
       foundation.handleTargetScroll();
       expect(mockAdapter.addClass)
           .toHaveBeenCalledWith(
               MDCTopAppBarFoundation.cssClasses.FIXED_SCROLLED_CLASS);
       expect(mockAdapter.addClass).toHaveBeenCalledTimes(1);
     });

  it('#handleTargetScroll calls #adapter.removeClass if ' +
         'adapter.getViewportScrollY < 0 but had just scrolled down',
     () => {
       const {foundation, mockAdapter} = setupTest();
       mockAdapter.getViewportScrollY.and.returnValue(1);
       foundation.handleTargetScroll();
       mockAdapter.getViewportScrollY.and.returnValue(-1);
       foundation.handleTargetScroll();
       expect(mockAdapter.removeClass)
           .toHaveBeenCalledWith(
               MDCTopAppBarFoundation.cssClasses.FIXED_SCROLLED_CLASS);
       expect(mockAdapter.removeClass).toHaveBeenCalledTimes(1);
     });

  it('#handleTargetScroll does not call #adapter.removeClass if was not scrolled yet',
     () => {
       const {foundation, mockAdapter} = setupTest();
       mockAdapter.getViewportScrollY.and.returnValue(-1);
       foundation.handleTargetScroll();
       expect(mockAdapter.removeClass)
           .not.toHaveBeenCalledWith(jasmine.any(String));
     });

  it('#handleTargetScroll calls #adapter.addClass only once if it already scrolled',
     () => {
       const {foundation, mockAdapter} = setupTest();
       mockAdapter.getViewportScrollY.and.returnValue(1);
       foundation.handleTargetScroll();
       foundation.handleTargetScroll();
       expect(mockAdapter.addClass)
           .toHaveBeenCalledWith(
               MDCTopAppBarFoundation.cssClasses.FIXED_SCROLLED_CLASS);
       expect(mockAdapter.addClass).toHaveBeenCalledTimes(1);
     });
});
