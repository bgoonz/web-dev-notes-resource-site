"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rootScanner_1 = require("./rootScanner");
const vscode_1 = require("vscode");
const vscode = require("vscode");
const jsImport_1 = require("./jsImport");
const help_1 = require("./help");
const path = require('path');
const leven = require('leven');
class RootCache {
    constructor(workspaceFolder) {
        this.fileWatcher = [];
        this.options = {
            emptyMemberPlainFiles: [],
            defaultMemberPlainFiles: [],
            plainFilesGlob: '',
            filesToScan: '',
            excludeFilesToScan: '',
        };
        this.workspaceFolder = workspaceFolder;
        const filesToScan = vscode.workspace.getConfiguration('js-import', this.workspaceFolder.uri).get('filesToScan');
        const excludeFilesToScan = vscode.workspace.getConfiguration('js-import', this.workspaceFolder.uri).get('excludeFilesToScan');
        const plainFileSuffix = vscode.workspace.getConfiguration('js-import', this.workspaceFolder.uri).get('plainFileSuffix');
        const plainFileSuffixWithDefaultMember = vscode.workspace.getConfiguration('js-import', this.workspaceFolder.uri).get('plainFileSuffixWithDefaultMember');
        this.options.filesToScan = filesToScan;
        this.options.excludeFilesToScan = `{**/node_modules/**${excludeFilesToScan ? ',' + excludeFilesToScan : ""}}`;
        this.options.emptyMemberPlainFiles = plainFileSuffix.split(',').map((x) => x.trim());
        this.options.defaultMemberPlainFiles = plainFileSuffixWithDefaultMember.split(',').map((x) => x.trim());
        this.options.plainFilesGlob = `**/*.{${this.options.emptyMemberPlainFiles.concat(this.options.defaultMemberPlainFiles).join(',')}}`;
        this.scanner = new rootScanner_1.default(workspaceFolder, this.options);
        this.scanAllImport();
        this.addFileWatcher();
    }
    dispose() {
        this.removeFileWatcher();
    }
    addFileWatcher() {
        const watcher = vscode.workspace.createFileSystemWatcher(new vscode_1.RelativePattern(this.workspaceFolder, this.options.filesToScan));
        watcher.onDidChange((file) => {
            vscode.commands
                .executeCommand('extension.scanImport', { file, edit: true, nodeModule: false });
        });
        watcher.onDidCreate((file) => {
            vscode.commands
                .executeCommand('extension.scanImport', { file, edit: true, nodeModule: false });
        });
        watcher.onDidDelete((file) => {
            vscode.commands
                .executeCommand('extension.scanImport', { file, delete: true, nodeModule: false });
        });
        const packageJsonWatcher = vscode.workspace.createFileSystemWatcher(new vscode_1.RelativePattern(this.workspaceFolder, '**/package.json'));
        packageJsonWatcher.onDidChange((file) => {
            vscode.commands
                .executeCommand('extension.scanImport', { file: null, edit: false, delete: false, nodeModule: true });
        });
        const plainFilesGlobWatcher = vscode.workspace.createFileSystemWatcher(new vscode_1.RelativePattern(this.workspaceFolder, this.options.plainFilesGlob));
        plainFilesGlobWatcher.onDidDelete((file) => {
            vscode.commands
                .executeCommand('extension.scanPlainFileImport', { file, create: false });
        });
        plainFilesGlobWatcher.onDidCreate((file) => {
            vscode.commands
                .executeCommand('extension.scanPlainFileImport', { file, create: true });
        });
        this.fileWatcher.push(watcher, packageJsonWatcher, plainFilesGlobWatcher);
    }
    removeFileWatcher() {
        this.fileWatcher.map(fw => {
            fw.dispose();
        });
    }
    scanAllImport() {
        this.scanner.scanAllImport();
    }
    /**
     * get items by value
     * TODO: sort by value
     * @param value desc value
     * @param doc
     * @param range
     * @param completion is auto complete mode
     */
    resolveItems(value, doc, range, completion) {
        // TODO: need sort ?
        // TODO: filter current file export
        try {
            let items = [];
            for (const key of Object.keys(this.scanner.cache)) {
                // skip current file export
                if (this.scanner.cache[key].path === doc.fileName) {
                    continue;
                }
                if (completion) {
                    if (this.scanner.cache[key].module.name.toLowerCase().startsWith(value.toLowerCase())) {
                        items.push(this.resolveFromFile(this.scanner.cache[key], doc, range));
                    }
                }
                else {
                    if (this.scanner.cache[key].module.name.toLowerCase().includes(value.toLowerCase())) {
                        items.push(this.resolveFromFile(this.scanner.cache[key], doc, range));
                    }
                }
            }
            for (const key of Object.keys(this.scanner.nodeModuleCache)) {
                if (completion) {
                    if (this.scanner.nodeModuleCache[key].module.name.toLowerCase().startsWith(value.toLowerCase())) {
                        items.push(this.resolveFromModule(this.scanner.nodeModuleCache[key], doc, range));
                    }
                }
                else {
                    if (this.scanner.nodeModuleCache[key].module.name.toLowerCase().includes(value.toLowerCase())) {
                        items.push(this.resolveFromModule(this.scanner.nodeModuleCache[key], doc, range));
                    }
                }
            }
            return items.sort(this.sortItem(value));
        }
        catch (error) {
            jsImport_1.default.consoleError(error);
        }
    }
    resolveFromFile(importObj, doc, range) {
        let rp = path.relative(vscode.workspace.getWorkspaceFolder(doc.uri).uri.fsPath, importObj.path);
        if (help_1.isWin) {
            rp = rp.replace(/\\/g, '/');
        }
        const label = importObj.module.isNotMember ?
            `import ${rp} [js-import]` : `import ${importObj.module.name} from ${rp} [js-import]`;
        return {
            label,
            description: '',
            importObj: importObj,
            doc: doc,
            range: range,
        };
    }
    resolveFromModule(importObj, doc, range) {
        return {
            label: `import ${importObj.module.name} from node_modules/${importObj.path} [js-import]`,
            description: '',
            importObj: importObj,
            doc: doc,
            range: range,
        };
    }
    getConfig() {
    }
    sortItem(value) {
        return (a, b) => {
            return leven(value, a.importObj.module.name) - leven(value, b.importObj.module.name);
        };
    }
}
exports.default = RootCache;
//# sourceMappingURL=rootCache.js.map