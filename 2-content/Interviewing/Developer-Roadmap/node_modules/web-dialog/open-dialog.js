import '@a11y/focus-trap';
import { WebDialog } from './web-dialog.js';
import './util.js';

/**
 * Opens a dialog and appends it to the container.
 * @param $content
 * @param $container
 * @param center
 * @param initialize
 */
function openDialog({ $content, $container = document.body, center = false, initialize = (() => new WebDialog()) } = {}) {
    // Construct the dialog.
    const $dialog = initialize();
    // Set the relevant properties of the dialog.
    if (center != null) {
        $dialog.center = center;
    }
    // Attach the content to the dialog.
    if ($content != null) {
        if (typeof $content === "function") {
            $content($dialog);
        }
        else {
            $dialog.appendChild($content);
        }
    }
    // Create a resolver that resolves when the dialog closes.
    const resolver = new Promise(res => {
        $dialog.addEventListener("close", (e) => {
            $dialog.remove();
            res(e.detail);
        }, { once: true });
    });
    // Append the dialog to the container and open it.
    $container.appendChild($dialog);
    $dialog.show();
    return { $dialog, resolver };
}

export { openDialog };
