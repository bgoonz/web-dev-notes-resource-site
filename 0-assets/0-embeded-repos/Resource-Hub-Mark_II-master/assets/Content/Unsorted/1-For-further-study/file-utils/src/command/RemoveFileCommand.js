"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFileCommand = void 0;
const BaseCommand_1 = require("./BaseCommand");
class RemoveFileCommand extends BaseCommand_1.BaseCommand {
    async execute() {
        const fileItem = await this.controller.showDialog();
        await this.executeController(fileItem);
    }
}
exports.RemoveFileCommand = RemoveFileCommand;
