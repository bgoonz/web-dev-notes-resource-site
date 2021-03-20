import { WebDialog } from "./web-dialog";
interface IOpenDialogConfig<T extends WebDialog<R>, R = any> {
    $content: Node | (($dialog: T) => void);
    $container: HTMLElement;
    center: boolean;
    initialize: (() => T);
}
/**
 * Opens a dialog and appends it to the container.
 * @param $content
 * @param $container
 * @param center
 * @param initialize
 */
declare function openDialog<T extends WebDialog<R>, R = any>({ $content, $container, center, initialize }?: Partial<IOpenDialogConfig<T, R>>): {
    $dialog: T;
    resolver: Promise<R>;
};
export { openDialog };
