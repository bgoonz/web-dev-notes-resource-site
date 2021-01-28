"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFileCommand = void 0;
const BaseCommand_1 = require("./BaseCommand");
class NewFileCommand extends BaseCommand_1.BaseCommand {
    async execute() {
        var _a, _b;
        const relativeToRoot = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.relativeToRoot) !== null && _b !== void 0 ? _b : false;
        const dialogOptions = { prompt: "File Name", relativeToRoot };
        const fileItems = await this.controller.showDialog(dialogOptions);
        if (fileItems) {
            const executions = [...fileItems].map(async (fileItem) => {
                const result = await this.controller.execute({ fileItem });
                await this.controller.openFileInEditor(result);
            });
            await Promise.all(executions);
        }
    }
}
exports.NewFileCommand = NewFileCommand;
