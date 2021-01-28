"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_import_es6_1 = require("parse-import-es6");
const vscode = require("vscode");
const parse_comment_es6_1 = require("parse-comment-es6");
const help_1 = require("./help");
const importStatement_1 = require("./importStatement");
const jsImport_1 = require("./jsImport");
const vscode_1 = require("vscode");
const path = require('path');
var open = require("open");
function getImportDeclaration(importedDefaultBinding, nameSpaceImport, namedImports, importPath, position) {
    return {
        importedDefaultBinding,
        namedImports,
        nameSpaceImport,
        loc: {
            start: {
                line: position.line,
                column: position.character,
            },
            end: {
                line: position.line,
                column: position.character,
            },
        },
        range: null,
        raw: '',
        middleComments: [],
        leadComments: [],
        trailingComments: [],
        moduleSpecifier: importPath,
        error: 0,
    };
}
class ImportFixer {
    constructor(importObj, doc, range, options) {
        this.importObj = importObj;
        this.doc = doc;
        this.range = range;
        if (doc != null) {
            this.eol = doc.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
        }
        this.options = options;
    }
    fix() {
        try {
            let importPath;
            if (this.importObj.isNodeModule) {
                importPath = this.extractImportPathFromNodeModules(this.importObj);
            }
            else {
                importPath = this.extractImportPathFromAlias(this.importObj, this.doc.uri.fsPath);
                if (importPath === null) {
                    importPath = this.extractImportFromRoot(this.importObj, this.doc.uri.fsPath);
                }
            }
            this.resolveImport(importPath);
        }
        catch (error) {
            jsImport_1.default.consoleError(error);
            let body = '';
            body = this.doc.getText() + '\n\n';
            if (error && error.stack) {
                body += error.stack;
            }
            open('https://github.com/wangtao0101/vscode-js-import/issues/new?title=new&body=' + encodeURIComponent(body));
        }
    }
    extractImportPathFromNodeModules(importObj) {
        return importObj.path;
    }
    extractImportPathFromAlias(importObj, fsPath) {
        let aliasMatch = null;
        let aliasKey = null;
        const uri = vscode_1.Uri.file(fsPath);
        const rootPath = vscode.workspace.getWorkspaceFolder(uri).uri.fsPath;
        /**
         * pick up the first alias, currently not support nested alias
         */
        const alias = this.options.alias;
        for (const key of Object.keys(alias)) {
            if (importObj.path.startsWith(path.join(rootPath, alias[key]))) {
                aliasMatch = alias[key];
                aliasKey = key;
            }
        }
        let importPath = null;
        if (aliasMatch !== null) {
            const filename = path.basename(importObj.path);
            /**
             * absolute path of current alias module
             */
            const aliasPath = path.join(rootPath, aliasMatch);
            if (fsPath.startsWith(aliasPath)) {
                /**
                 * use relative path if doc.uri is in aliasPath
                 */
                return this.extractImportFromRoot(importObj, fsPath);
            }
            let relativePath = path.relative(aliasPath, path.dirname(importObj.path));
            if (help_1.isWin()) {
                relativePath = relativePath.replace(/\\/g, '/');
            }
            if (!importObj.module.isPlainFile && help_1.isIndexFile(filename)) {
                importPath = relativePath === '' ? aliasKey : `${aliasKey}/${relativePath}`;
            }
            else {
                const parsePath = path.parse(importObj.path);
                const filename = importObj.module.isPlainFile ? parsePath.base : parsePath.name;
                importPath = relativePath === '' ? `${aliasKey}/${filename}` : `${aliasKey}/${relativePath}/${filename}`;
            }
        }
        return importPath;
    }
    extractImportFromRoot(importObj, filePath) {
        const rootPath = vscode.workspace.getWorkspaceFolder(vscode_1.Uri.file(filePath));
        let importPath = path.relative(filePath, importObj.path);
        const parsePath = path.parse(importPath);
        /**
         * normalize dir
         */
        let dir = parsePath.dir;
        if (help_1.isWin()) {
            dir = dir.replace(/\\/g, '/');
        }
        dir = dir.replace(/../, '.');
        if (dir.startsWith('./..')) {
            dir = dir.substr(2, dir.length - 2);
        }
        if (!importObj.module.isPlainFile && help_1.isIndexFile(parsePath.base)) {
            importPath = `${dir}`;
        }
        else {
            const name = importObj.module.isPlainFile ? parsePath.base : parsePath.name;
            importPath = `${dir}/${name}`;
        }
        return importPath;
    }
    resolveImport(importPath) {
        const imports = parse_import_es6_1.default(this.doc.getText());
        // TODO: here we can normalize moduleSpecifier
        const filteredImports = imports.filter(imp => imp.error === 0 && imp.moduleSpecifier === importPath);
        let importStatement = null;
        if (filteredImports.length === 0) {
            const position = this.getNewImportPositoin(imports);
            // TODO: skip name === 'name as cc'
            if (this.importObj.module.isNotMember) {
                importStatement = new importStatement_1.default(getImportDeclaration(null, null, [], importPath, position), help_1.getImportOption(this.eol, true, this.options));
            }
            else if (this.importObj.module.default) {
                importStatement = new importStatement_1.default(getImportDeclaration(this.importObj.module.name, null, [], importPath, position), help_1.getImportOption(this.eol, true, this.options));
            }
            else {
                importStatement = new importStatement_1.default(getImportDeclaration(null, null, [this.importObj.module.name], importPath, position), help_1.getImportOption(this.eol, true, this.options));
            }
        }
        else {
            // TODO: merge import
            const imp = filteredImports[0];
            if (this.importObj.module.isNotMember) {
                return;
            }
            if (this.importObj.module.default) {
                if (imp.importedDefaultBinding !== null && imp.importedDefaultBinding === this.importObj.module.name) {
                    // TODO: we can format code
                    return;
                }
                else if (imp.importedDefaultBinding !== null && imp.importedDefaultBinding !== this.importObj.module.name) {
                    // error , two default import
                    return;
                }
                else {
                    // imp.importedDefaultBinding === null
                    importStatement = new importStatement_1.default(Object.assign(imp, { importedDefaultBinding: this.importObj.module.name }), help_1.getImportOption(this.eol, false, this.options));
                }
            }
            else {
                if (imp.nameSpaceImport !== null) {
                    // error
                    return;
                }
                if (imp.namedImports.includes(this.importObj.module.name)) {
                    // TODO: we can format code
                    return;
                }
                importStatement = new importStatement_1.default(Object.assign(imp, { namedImports: imp.namedImports.concat([this.importObj.module.name]) }), help_1.getImportOption(this.eol, false, this.options));
            }
        }
        const iec = importStatement.getEditChange();
        let edit = new vscode.WorkspaceEdit();
        edit.replace(this.doc.uri, new vscode.Range(iec.startLine, iec.startColumn, iec.endLine, iec.endColumn), iec.text);
        vscode.workspace.applyEdit(edit);
    }
    getNewImportPositoin(imports) {
        let position = null;
        let pos = this.options.insertPosition;
        if (pos !== 'first' && pos !== 'last') {
            pos = 'last';
        }
        if (pos === 'last' && imports.length !== 0) {
            const imp = imports[imports.length - 1];
            if (imp.trailingComments.length === 0) {
                position = new vscode.Position(imp.loc.end.line + 1, 0);
            }
            else {
                position = new vscode.Position(imp.trailingComments[imp.trailingComments.length - 1].loc.end.line + 1, 0);
            }
        }
        if (imports.length === 0) {
            const comments = parse_comment_es6_1.default(this.doc.getText(), { comment: true, range: true, loc: true, raw: true }).comments;
            if (comments.length === 0) {
                position = new vscode.Position(0, 0);
            }
            else {
                // exculde the first leading comment of the first import, if exist 'flow' 'Copyright' 'LICENSE'
                const ignoreComment = /@flow|license|copyright/i;
                let index = 0;
                let comment;
                for (; index < comments.length; index += 1) {
                    comment = comments[index];
                    if (!ignoreComment.test(comments[index].raw)) {
                        break;
                    }
                }
                if (index === comments.length) {
                    position = new vscode.Position(comment.loc.end.line + 1, 0);
                }
                else {
                    if (index === 0) {
                        position = new vscode.Position(0, 0);
                    }
                    else {
                        comment = comments[index - 1];
                        position = new vscode.Position(comment.loc.end.line + 1, 0);
                    }
                }
            }
        }
        return position;
    }
}
exports.default = ImportFixer;
// TODO: sort all import statement by eslint rules
//# sourceMappingURL=importFixer.js.map