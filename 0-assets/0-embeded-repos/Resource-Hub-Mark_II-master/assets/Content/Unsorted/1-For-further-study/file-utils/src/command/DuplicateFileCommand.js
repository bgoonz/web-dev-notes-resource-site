"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateFileCommand = void 0;
const BaseCommand_1 = require("./BaseCommand");
class DuplicateFileCommand extends BaseCommand_1.BaseCommand {
    async execute(uri) {
        const dialogOptions = { prompt: "Duplicate As", showFullPath: true, uri };
        const fileItem = await this.controller.showDialog(dialogOptions);
        await this.executeController(fileItem, { openFileInEditor: !(fileItem === null || fileItem === void 0 ? void 0 : fileItem.isDir) });
    }
}
exports.DuplicateFileCommand = DuplicateFileCommand;
