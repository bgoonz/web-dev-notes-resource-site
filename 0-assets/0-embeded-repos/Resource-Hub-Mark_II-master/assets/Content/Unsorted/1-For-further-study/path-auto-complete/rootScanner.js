"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const interpreter_1 = require("./interpreter");
const jsImport_1 = require("./jsImport");
const help_1 = require("./help");
const vscode_1 = require("vscode");
const path = require('path');
class RootScanner {
    constructor(workspaceFolder, options) {
        this.interpreter = new interpreter_1.default();
        this.cache = {};
        this.nodeModuleCache = {};
        this.nodeModuleVersion = {};
        this.workspaceFolder = workspaceFolder;
        this.options = options;
    }
    scanAllImport() {
        const relativePattern = new vscode_1.RelativePattern(this.workspaceFolder, this.options.filesToScan);
        // TODO: filter file not in src
        vscode.workspace.findFiles(relativePattern, this.options.excludeFilesToScan, 99999)
            .then((files) => this.processFiles(files));
        this.findModulesInPackageJson();
        this.processPlainFiles();
    }
    scanFileImport(file) {
        this.deleteFile(file);
        this.processFile(file);
    }
    deleteFile(file) {
        const keys = Object.keys(this.cache);
        for (const key of keys) {
            if (key.startsWith(file.fsPath)) {
                delete this.cache[key];
            }
        }
    }
    processPlainFiles() {
        const relativePattern = new vscode.RelativePattern(this.workspaceFolder, this.options.plainFilesGlob);
        vscode.workspace.findFiles(relativePattern, this.options.excludeFilesToScan, 99999)
            .then((files) => {
            files.filter((f) => {
                return f.fsPath.indexOf('node_modules') === -1;
            }).map((url) => {
                this.processPlainFile(url);
            });
        });
    }
    processPlainFile(url) {
        const parsedFile = path.parse(url.fsPath);
        const name = help_1.base2camel(parsedFile.name);
        if (this.options.emptyMemberPlainFiles.includes(parsedFile.ext.replace('\.', ''))) {
            this.cache[`${url.fsPath}-${name}`] = {
                path: url.fsPath,
                module: {
                    default: true,
                    name,
                    isPlainFile: true,
                    isNotMember: true,
                },
                isNodeModule: false,
            };
        }
        else {
            this.cache[`${url.fsPath}-${name}`] = {
                path: url.fsPath,
                module: {
                    default: true,
                    name,
                    isPlainFile: true,
                },
                isNodeModule: false,
            };
        }
        jsImport_1.default.setStatusBar();
    }
    processFiles(files) {
        files.forEach(file => {
            this.processFile(file);
        });
        return;
    }
    processFile(file) {
        fs.readFile(file.fsPath, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const fileName = path.parse(file.fsPath).name;
            // use for unnamed identifier
            const moduleName = path.basename(path.dirname(file.fsPath));
            const isIndex = fileName === 'index';
            const modules = this.interpreter.run(data, isIndex, moduleName, fileName);
            let defaultModule = null;
            let shouldParse = false;
            modules.forEach(m => {
                if (m.parse) {
                    shouldParse = true;
                    return;
                }
                this.cache[`${file.fsPath}-${m.name}`] = {
                    path: file.fsPath,
                    module: m,
                    isNodeModule: false,
                };
                if (m.default) {
                    defaultModule = m;
                }
            });
            if (shouldParse) {
                // only complex export should be parsed
                const parsedModules = this.interpreter.runMainFile(data, moduleName, file.fsPath);
                parsedModules.forEach(m => {
                    if (this.cache[`${file.fsPath}-${m.name}`] == null) {
                        if (m.default && defaultModule != null) {
                            return;
                        }
                        this.cache[`${file.fsPath}-${m.name}`] = {
                            path: file.fsPath,
                            module: m,
                            isNodeModule: false,
                        };
                    }
                });
            }
            jsImport_1.default.setStatusBar();
        });
    }
    findModulesInPackageJson() {
        const modules = [];
        const packageJsonPath = path.join(this.workspaceFolder.uri.fsPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            fs.readFile(packageJsonPath, 'utf8', (err, data) => {
                if (err) {
                    return console.log(err);
                }
                const packageJson = JSON.parse(data);
                [
                    "dependencies",
                    "devDependencies",
                    "peerDependencies",
                    "optionalDependencies"
                ].forEach(key => {
                    if (packageJson.hasOwnProperty(key)) {
                        modules.push(...Object.keys(packageJson[key]));
                    }
                });
                this.deleteUnusedModules(modules);
                this.cacheModules(modules);
            });
        }
    }
    deleteUnusedModules(modules) {
        const keys = Object.keys(this.nodeModuleCache);
        const notexists = keys.filter(key => !modules.includes(this.nodeModuleCache[key].path));
        notexists.forEach(name => {
            if (this.nodeModuleCache[name] != null) {
                delete this.nodeModuleVersion[this.nodeModuleCache[name].path];
                delete this.nodeModuleCache[name];
            }
        });
        jsImport_1.default.setStatusBar();
    }
    cacheModules(modules) {
        modules.forEach((moduleName) => {
            const modulePath = path.join(this.workspaceFolder.uri.fsPath, 'node_modules', moduleName);
            const packageJsonPath = path.join(modulePath, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
                fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
                    if (err) {
                        return console.log(err);
                    }
                    const packageJson = JSON.parse(data);
                    if (!this.isCachedByVersion(moduleName, packageJson)) {
                        this.cacheModulesFromMain(moduleName, modulePath, packageJson);
                    }
                });
            }
        });
    }
    cacheModulesFromMain(moduleName, modulePath, packageJson) {
        if (!packageJson.hasOwnProperty('main'))
            return;
        let mainFilePath = path.join(modulePath, packageJson.main);
        if (!fs.existsSync(mainFilePath)) {
            mainFilePath += '.js';
        }
        if (fs.existsSync(mainFilePath)) {
            fs.readFile(mainFilePath, 'utf-8', (err, data) => {
                if (err) {
                    return console.log(err);
                }
                const moduleKebabName = help_1.kebab2camel(moduleName);
                const modules = this.interpreter.run(data, true, moduleKebabName, '');
                let defaultModule = null;
                modules.forEach(m => {
                    if (m.parse) {
                        return;
                    }
                    this.nodeModuleCache[`${moduleName}-${m.name}`] = {
                        path: moduleName,
                        module: m,
                        isNodeModule: true,
                    };
                    if (m.default) {
                        defaultModule = m;
                    }
                });
                const parsedModules = this.interpreter.runMainFile(data, moduleKebabName, mainFilePath);
                parsedModules.forEach(m => {
                    if (this.nodeModuleCache[`${moduleName}-${m.name}`] == null) {
                        if (m.default && defaultModule != null) {
                            return;
                        }
                        this.nodeModuleCache[`${moduleName}-${m.name}`] = {
                            path: moduleName,
                            module: m,
                            isNodeModule: true,
                        };
                    }
                });
                jsImport_1.default.setStatusBar();
            });
        }
    }
    isCachedByVersion(moduleName, packageJson) {
        if (packageJson.hasOwnProperty('version')) {
            if (this.nodeModuleVersion[moduleName] != null) {
                if (this.nodeModuleVersion[moduleName] === packageJson.version) {
                    return true;
                }
                else {
                    this.nodeModuleVersion[moduleName] = packageJson.version;
                    return false;
                }
            }
            else {
                this.nodeModuleVersion[moduleName] = packageJson.version;
                return false;
            }
        }
        return false;
    }
}
exports.default = RootScanner;
//# sourceMappingURL=rootScanner.js.map