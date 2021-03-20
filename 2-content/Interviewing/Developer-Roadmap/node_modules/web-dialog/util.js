/**
 * Returns the data dialog count for an element.
 * @param $elem
 */
function getDialogCount($elem) {
    return Number($elem.getAttribute(`data-dialog-count`)) || 0;
}
/**
 * Sets the data dialog count for an element.
 * @param $elem
 * @param count
 */
function setDialogCount($elem, count) {
    $elem.setAttribute(`data-dialog-count`, count.toString());
}
/**
 * Traverses the tree of active elements down the shadow tree.
 * @param activeElement
 */
function traverseActiveElements(activeElement = document.activeElement) {
    if (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) {
        return traverseActiveElements(activeElement.shadowRoot.activeElement);
    }
    return activeElement;
}

export { getDialogCount, setDialogCount, traverseActiveElements };
