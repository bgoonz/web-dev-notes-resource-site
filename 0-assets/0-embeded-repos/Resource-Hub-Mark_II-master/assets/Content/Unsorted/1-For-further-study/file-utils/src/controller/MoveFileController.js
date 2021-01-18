"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveFileController = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const FileItem_1 = require("../FileItem");
const BaseFileController_1 = require("./BaseFileController");
class MoveFileController extends BaseFileController_1.BaseFileController {
    async showDialog(options) {
        const { prompt, showFullPath = false, uri = null } = options;
        const sourcePath = (uri && uri.fsPath) || (await this.getSourcePath());
        if (!sourcePath) {
            throw new Error();
        }
        const value = showFullPath ? sourcePath : path.basename(sourcePath);
        const valueSelection = this.getFilenameSelection(value);
        const targetPath = await vscode_1.window.showInputBox({
            prompt,
            value,
            valueSelection,
        });
        if (targetPath) {
            const isDir = (await vscode_1.workspace.fs.stat(vscode_1.Uri.file(sourcePath))).type === vscode_1.FileType.Directory;
            const realPath = path.resolve(path.dirname(sourcePath), targetPath);
            return new FileItem_1.FileItem(sourcePath, realPath, isDir);
        }
    }
    async execute(options) {
        const { fileItem } = options;
        await this.ensureWritableFile(fileItem);
        return fileItem.move();
    }
    getFilenameSelection(value) {
        const basename = path.basename(value);
        const start = value.length - basename.length;
        const dot = basename.lastIndexOf(".");
        const exclusiveEndIndex = dot <= 0 ? value.length : start + dot;
        return [start, exclusiveEndIndex];
    }
}
exports.MoveFileController = MoveFileController;
