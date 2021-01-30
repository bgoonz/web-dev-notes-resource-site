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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFileController = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const FileItem_1 = require("../FileItem");
const config_1 = require("../lib/config");
const BaseFileController_1 = require("./BaseFileController");
const TypeAheadController_1 = require("./TypeAheadController");
const brace_expansion_1 = __importDefault(require("brace-expansion"));
class NewFileController extends BaseFileController_1.BaseFileController {
    async showDialog(options) {
        const { prompt, relativeToRoot = false } = options;
        const sourcePath = await this.getSourcePath({ relativeToRoot });
        const value = path.join(sourcePath, path.sep);
        const valueSelection = [value.length, value.length];
        const targetPath = await vscode_1.window.showInputBox({
            prompt,
            value,
            valueSelection,
        });
        if (targetPath) {
            return brace_expansion_1.default(targetPath).map((filePath) => {
                const realPath = path.resolve(sourcePath, filePath);
                const isDir = filePath.endsWith(path.sep);
                return new FileItem_1.FileItem(sourcePath, realPath, isDir);
            });
        }
    }
    async execute(options) {
        const { fileItem, isDir = false } = options;
        await this.ensureWritableFile(fileItem);
        try {
            return fileItem.create(isDir);
        }
        catch (e) {
            throw new Error(`Error creating file '${fileItem.path}'.`);
        }
    }
    async getSourcePath({ relativeToRoot }) {
        const rootPath = relativeToRoot ? await this.getWorkspaceSourcePath() : await this.getFileSourcePath();
        if (!rootPath) {
            throw new Error();
        }
        return this.getFileSourcePathAtRoot(rootPath, relativeToRoot === true);
    }
    async getWorkspaceSourcePath() {
        const workspaceFolder = await this.selectWorkspaceFolder();
        return workspaceFolder === null || workspaceFolder === void 0 ? void 0 : workspaceFolder.uri.fsPath;
    }
    async selectWorkspaceFolder() {
        if (vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders.length === 1) {
            return vscode_1.workspace.workspaceFolders[0];
        }
        const sourcePath = await super.getSourcePath({ ignoreIfNotExists: true });
        const uri = vscode_1.Uri.file(sourcePath);
        return vscode_1.workspace.getWorkspaceFolder(uri) || vscode_1.window.showWorkspaceFolderPick();
    }
    async getFileSourcePath() {
        return path.dirname(await super.getSourcePath());
    }
    async getFileSourcePathAtRoot(rootPath, relativeToRoot) {
        let sourcePath = rootPath;
        if (config_1.getConfiguration("typeahead.enabled") === true) {
            const cache = this.getCache(`workspace:${sourcePath}`);
            const typeAheadController = new TypeAheadController_1.TypeAheadController(cache, relativeToRoot);
            sourcePath = await typeAheadController.showDialog(sourcePath);
        }
        if (!sourcePath) {
            throw new Error();
        }
        return sourcePath;
    }
}
exports.NewFileController = NewFileController;
