"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFileController = void 0;
const vscode_1 = require("vscode");
const Cache_1 = require("../lib/Cache");
class BaseFileController {
    constructor(context) {
        this.context = context;
    }
    async openFileInEditor(fileItem) {
        if (fileItem.isDir) {
            return;
        }
        const textDocument = await vscode_1.workspace.openTextDocument(fileItem.path);
        if (!textDocument) {
            throw new Error("Could not open file!");
        }
        const editor = await vscode_1.window.showTextDocument(textDocument);
        if (!editor) {
            throw new Error("Could not show document!");
        }
        return editor;
    }
    async closeCurrentFileEditor() {
        return vscode_1.commands.executeCommand("workbench.action.closeActiveEditor");
    }
    async getSourcePath({ ignoreIfNotExists } = {}) {
        const activeEditor = vscode_1.window.activeTextEditor;
        if (activeEditor && activeEditor.document && activeEditor.document.fileName) {
            return activeEditor.document.fileName;
        }
        const sourcePath = await this.getSourcePathForNonTextFile();
        if (!sourcePath && ignoreIfNotExists !== true) {
            throw new Error();
        }
        return sourcePath;
    }
    getCache(namespace) {
        return new Cache_1.Cache(this.context.globalState, namespace);
    }
    async ensureWritableFile(fileItem) {
        if (!fileItem.exists) {
            return fileItem;
        }
        if (fileItem.targetPath === undefined) {
            throw new Error("Missing target path");
        }
        const message = `File '${fileItem.targetPath.path}' already exists.`;
        const action = "Overwrite";
        const overwrite = await vscode_1.window.showInformationMessage(message, { modal: true }, action);
        if (overwrite) {
            return fileItem;
        }
        throw new Error();
    }
    async getSourcePathForNonTextFile() {
        const originalClipboardData = await vscode_1.env.clipboard.readText();
        await vscode_1.env.clipboard.writeText("");
        await vscode_1.commands.executeCommand("workbench.action.files.copyPathOfActiveFile");
        const postAPICallClipboardData = await vscode_1.env.clipboard.readText();
        await vscode_1.env.clipboard.writeText(originalClipboardData);
        return postAPICallClipboardData;
    }
}
exports.BaseFileController = BaseFileController;
