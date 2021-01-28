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
exports.TypeAheadController = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const TreeWalker_1 = require("../lib/TreeWalker");
async function waitForIOEvents() {
    return new Promise((resolve) => setImmediate(resolve));
}
class TypeAheadController {
    constructor(cache, relativeToRoot) {
        this.cache = cache;
        this.relativeToRoot = relativeToRoot;
    }
    async showDialog(sourcePath) {
        const item = await this.showQuickPick(this.buildQuickPickItems(sourcePath));
        if (!item) {
            throw new Error();
        }
        const selection = item.label;
        this.cache.put("last", selection);
        return path.join(sourcePath, selection);
    }
    async buildQuickPickItems(sourcePath) {
        const directories = await this.listDirectoriesAtSourcePath(sourcePath);
        return [
            ...this.buildQuickPickItemsHeader(),
            ...directories.map((directory) => this.buildQuickPickItem(directory)),
        ];
    }
    async listDirectoriesAtSourcePath(sourcePath) {
        await waitForIOEvents();
        const treeWalker = new TreeWalker_1.TreeWalker();
        return treeWalker.directories(sourcePath);
    }
    buildQuickPickItemsHeader() {
        const items = [this.buildQuickPickItem("/", `- ${this.relativeToRoot ? "workspace root" : "current file"}`)];
        const lastEntry = this.cache.get("last");
        if (lastEntry) {
            items.push(this.buildQuickPickItem(lastEntry, "- last selection"));
        }
        return items;
    }
    buildQuickPickItem(label, description) {
        return { description, label };
    }
    async showQuickPick(items) {
        const hint = "larger projects may take a moment to load";
        const placeHolder = `First, select an existing path to create relative to (${hint})`;
        return vscode_1.window.showQuickPick(items, { placeHolder });
    }
}
exports.TypeAheadController = TypeAheadController;
