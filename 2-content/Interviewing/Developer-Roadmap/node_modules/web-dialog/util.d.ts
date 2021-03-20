/**
 * Returns the data dialog count for an element.
 * @param $elem
 */
declare function getDialogCount($elem: HTMLElement): number;
/**
 * Sets the data dialog count for an element.
 * @param $elem
 * @param count
 */
declare function setDialogCount($elem: HTMLElement, count: number): void;
/**
 * Traverses the tree of active elements down the shadow tree.
 * @param activeElement
 */
declare function traverseActiveElements(activeElement?: Element | null): Element | null;
export { getDialogCount, setDialogCount, traverseActiveElements };
