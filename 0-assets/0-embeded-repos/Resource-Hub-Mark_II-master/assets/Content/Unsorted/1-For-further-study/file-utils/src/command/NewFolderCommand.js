"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFolderCommand = void 0;
const NewFileCommand_1 = require("./NewFileCommand");
class NewFolderCommand extends NewFileCommand_1.NewFileCommand {
    async execute() {
        var _a, _b;
        const relativeToRoot = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.relativeToRoot) !== null && _b !== void 0 ? _b : false;
        const dialogOptions = { prompt: "Folder Name", relativeToRoot };
        const fileItems = await this.controller.showDialog(dialogOptions);
        if (fileItems) {
            const executions = [...fileItems].map(async (fileItem) => {
                await this.controller.execute({ fileItem, isDir: true });
            });
            await Promise.all(executions);
        }
    }
}
exports.NewFolderCommand = NewFolderCommand;
