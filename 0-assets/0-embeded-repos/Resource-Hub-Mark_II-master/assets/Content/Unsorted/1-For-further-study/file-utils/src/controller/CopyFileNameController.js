"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyFileNameController = void 0;
const vscode_1 = require("vscode");
const FileItem_1 = require("../FileItem");
const BaseFileController_1 = require("./BaseFileController");
class CopyFileNameController extends BaseFileController_1.BaseFileController {
    async showDialog(options) {
        const { uri = null } = options;
        const sourcePath = (uri && uri.fsPath) || (await this.getSourcePath());
        if (!sourcePath) {
            throw new Error();
        }
        return new FileItem_1.FileItem(sourcePath);
    }
    async execute(options) {
        await vscode_1.env.clipboard.writeText(options.fileItem.name);
        return options.fileItem;
    }
}
exports.CopyFileNameController = CopyFileNameController;
