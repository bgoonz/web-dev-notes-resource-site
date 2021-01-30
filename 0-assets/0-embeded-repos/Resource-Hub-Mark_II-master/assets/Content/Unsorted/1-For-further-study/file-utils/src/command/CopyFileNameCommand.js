"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyFileNameCommand = void 0;
const BaseCommand_1 = require("./BaseCommand");
class CopyFileNameCommand extends BaseCommand_1.BaseCommand {
    async execute(uri) {
        const dialogOptions = { uri };
        const fileItem = await this.controller.showDialog(dialogOptions);
        await this.executeController(fileItem);
    }
}
exports.CopyFileNameCommand = CopyFileNameCommand;
