

import {EventType, SpecificEventListener} from '@material/base/types';
import {CssClasses} from './constants';

/**
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 */
export interface MDCTooltipAdapter {
  /**
   * @return the attribute string if present on the root element, null
   * otherwise.
   */
  getAttribute(attr: string): string|null;

  /**
   * Sets an attribute on the root element.
   */
  setAttribute(attr: string, value: string): void;

  /**
   * Adds a class onto the root element.
   */
  addClass(className: CssClasses): void;

  /**
   * @return whether or not the root element has the provided className.
   */
  hasClass(className: CssClasses): boolean;

  /**
   * Removes a class from the root element.
   */
  removeClass(className: CssClasses): void;

  /**
   * Sets the property value of the given style property on the root element.
   */
  setStyleProperty(propertyName: string, value: string): void;

  /**
   * @return the width of the viewport.
   */
  getViewportWidth(): number;

  /**
   * @return the height of the viewport.
   */
  getViewportHeight(): number;

  /**
   * @return the width and height of the tooltip element.
   */
  getTooltipSize(): {width: number, height: number};

  /**
   * @return the ClientRect for the anchor element.
   */
  getAnchorBoundingRect(): ClientRect|null;

  /**
   * @return the attribute string if present on the anchor element, null
   * otherwise.
   */
  getAnchorAttribute(attr: string): string|null;

  /**
   * Sets an attribute on the anchor element.
   */
  setAnchorAttribute(attr: string, value: string): void;

  /**
   * @return true if the text direction is right-to-left.
   */
  isRTL(): boolean;

  /**
   * Checks if element is contained within the anchor element.
   */
  anchorContainsElement(element: HTMLElement): boolean;

  /**
   * Checks if element is contained within the tooltip element.
   */
  tooltipContainsElement(element: HTMLElement): boolean;

  /**
   * Registers an event listener to the root element.
   */
  registerEventHandler<K extends EventType>(
      evtType: K, handler: SpecificEventListener<K>): void;

  /**
   * Deregisters an event listener to the root element.
   */
  deregisterEventHandler<K extends EventType>(
      evtType: K, handler: SpecificEventListener<K>): void;

  /**
   * Registers an event listener to the document body.
   */
  registerDocumentEventHandler<K extends EventType>(
      evtType: K, handler: SpecificEventListener<K>): void;

  /**
   * Deregisters an event listener to the document body.
   */
  deregisterDocumentEventHandler<K extends EventType>(
      evtType: K, handler: SpecificEventListener<K>): void;

  /**
   * Registers an event listener to the window.
   */
  registerWindowEventHandler<K extends EventType>(
      evtType: K, handler: SpecificEventListener<K>): void;

  /**
   * Deregisters an event listener to the window.
   */
  deregisterWindowEventHandler<K extends EventType>(
      evtType: K, handler: SpecificEventListener<K>): void;

  /**
   * Notification that the tooltip element has been fully hidden. Typically used
   * to wait for the hide animation to complete.
   */
  notifyHidden(): void;
}
