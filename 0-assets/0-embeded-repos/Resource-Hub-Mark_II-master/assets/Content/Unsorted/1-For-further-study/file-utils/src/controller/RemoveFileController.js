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
exports.RemoveFileController = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const FileItem_1 = require("../FileItem");
const BaseFileController_1 = require("./BaseFileController");
class RemoveFileController extends BaseFileController_1.BaseFileController {
    async showDialog() {
        const sourcePath = await this.getSourcePath();
        if (!sourcePath) {
            throw new Error();
        }
        if (this.confirmDelete === false) {
            return new FileItem_1.FileItem(sourcePath);
        }
        const message = `Are you sure you want to delete '${path.basename(sourcePath)}'?`;
        const action = "Move to Trash";
        const remove = await vscode_1.window.showInformationMessage(message, { modal: true }, action);
        if (remove) {
            return new FileItem_1.FileItem(sourcePath);
        }
    }
    async execute(options) {
        const { fileItem } = options;
        try {
            await fileItem.remove();
        }
        catch (e) {
            throw new Error(`Error deleting file '${fileItem.path}'.`);
        }
        return fileItem;
    }
    get confirmDelete() {
        return vscode_1.workspace.getConfiguration("explorer", null).get("confirmDelete") === true;
    }
}
exports.RemoveFileController = RemoveFileController;
