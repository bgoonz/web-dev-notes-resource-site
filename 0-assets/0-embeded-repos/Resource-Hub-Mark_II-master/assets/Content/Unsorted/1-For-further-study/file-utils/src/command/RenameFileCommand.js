"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameFileCommand = void 0;
const BaseCommand_1 = require("./BaseCommand");
class RenameFileCommand extends BaseCommand_1.BaseCommand {
    async execute() {
        const dialogOptions = { prompt: "New Name" };
        const fileItem = await this.controller.showDialog(dialogOptions);
        await this.executeController(fileItem);
    }
}
exports.RenameFileCommand = RenameFileCommand;
