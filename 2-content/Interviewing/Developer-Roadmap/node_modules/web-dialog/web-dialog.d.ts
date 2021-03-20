import { FocusTrap } from "@a11y/focus-trap";
/**
 * A dialog web component that can be used to display highly interruptive messages.
 * @fires open - This event is fired when the dialog opens.
 * @fires close - This event is fired when the dialog closes.
 * @fires closing - This event is fired before the dialog is closed by clicking escape or on the backdrop. The event is cancellable which means `event.preventDefault()` can cancel the closing of the dialog.
 * @cssprop --dialog-container-padding - Padding of the host container of the dialog.
 * @cssprop --dialog-z-index - Z-index of the dialog.
 * @cssprop --dialog-overflow-x - Overflow of the x-axis.
 * @cssprop --dialog-overflow-y - Overflow of the y-axis.
 * @cssprop --dialog-max-height - Max height of the dialog.
 * @cssprop --dialog-height - Height of the dialog.
 * @cssprop --dialog-backdrop-bg - Background of the backdrop.
 * @cssprop --dialog-animation-duration - Duration of the dialog animation.
 * @cssprop --dialog-animation-easing - Easing of the dialog animation.
 * @cssprop --dialog-border-radius - Border radius of the dialog.
 * @cssprop --dialog-box-shadow - Box shadow of the dialog.
 * @cssprop --dialog-max-width - Max width of the dialog.
 * @cssprop --dialog-width - Width of the dialog.
 * @cssprop --dialog-padding - Padding of the dialog.
 * @cssprop --dialog-color - Color of the dialog.
 * @cssprop --dialog-bg - Background of the dialog.
 * @csspart backdrop - Backdrop part.
 * @csspart dialog - Dialog part.
 */
declare class WebDialog<R = any> extends HTMLElement {
    static get observedAttributes(): string[];
    /**
     * Whether the dialog is opened.
     * @attr
     */
    get open(): boolean;
    set open(value: boolean);
    /**
     * Whether the dialog is centered on the page.
     * @attr
     */
    get center(): boolean;
    set center(value: boolean);
    result?: R;
    protected $dialog: FocusTrap;
    protected $backdrop: HTMLElement;
    protected $scrollContainer: HTMLElement;
    protected $previousActiveElement: HTMLElement | null;
    /**
     * Attaches the shadow root.
     */
    /**
     * Attaches the shadow root.
     */
    constructor();
    /**
     * Attaches event listeners when connected.
     */
    /**
     * Attaches event listeners when connected.
     */
    connectedCallback(): void;
    /**
     * Removes event listeners when disconnected.
     */
    /**
     * Removes event listeners when disconnected.
     */
    disconnectedCallback(): void;
    /**
     * Shows the dialog.
     */
    /**
     * Shows the dialog.
     */
    show(): void;
    /**
     * Closes the dialog with a result.
     * @param result
     */
    /**
     * Closes the dialog with a result.
     * @param result
     */
    close(result?: R): void;
    /**
     * Closes the dialog when the backdrop is clicked.
     */
    /**
     * Closes the dialog when the backdrop is clicked.
     */
    onBackdropClick(): void;
    /**
     * Closes the dialog when escape is pressed.
     */
    /**
     * Closes the dialog when escape is pressed.
     */
    onKeyDown(e: KeyboardEvent): void;
    /**
     * Dispatches an event that, if asserts whether the dialog can be closed.
     * If "preventDefault()" is called on the event, assertClosing will return true
     * if the event was not cancelled. It will return false if the event was cancelled.
     */
    /**
     * Dispatches an event that, if asserts whether the dialog can be closed.
     * If "preventDefault()" is called on the event, assertClosing will return true
     * if the event was not cancelled. It will return false if the event was cancelled.
     */
    assertClosing(): boolean;
    /**
     * Setup the dialog after it has opened.
     */
    /**
     * Setup the dialog after it has opened.
     */
    didOpen(): void;
    /**
     * Clean up the dialog after it has closed.
     */
    /**
     * Clean up the dialog after it has closed.
     */
    didClose(): void;
    /**
     * Reacts when an observed attribute changes.
     */
    /**
     * Reacts when an observed attribute changes.
     */
    attributeChangedCallback(name: string, newValue: unknown, oldValue: unknown): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "web-dialog": WebDialog;
    }
}
export { WebDialog };
