"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveFileCommand = void 0;
const BaseCommand_1 = require("./BaseCommand");
class MoveFileCommand extends BaseCommand_1.BaseCommand {
    async execute(uri) {
        const dialogOptions = { prompt: "New Location", showFullPath: true, uri };
        const fileItem = await this.controller.showDialog(dialogOptions);
        await this.executeController(fileItem);
    }
}
exports.MoveFileCommand = MoveFileCommand;
