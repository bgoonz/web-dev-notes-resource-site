"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateFileController = void 0;
const MoveFileController_1 = require("./MoveFileController");
class DuplicateFileController extends MoveFileController_1.MoveFileController {
    async execute(options) {
        const { fileItem } = options;
        await this.ensureWritableFile(fileItem);
        return fileItem.duplicate();
    }
}
exports.DuplicateFileController = DuplicateFileController;
