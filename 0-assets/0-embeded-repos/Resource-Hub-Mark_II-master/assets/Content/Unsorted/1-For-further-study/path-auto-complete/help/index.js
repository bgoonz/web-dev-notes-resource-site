"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
/**
 * if the given filename's extname is index.jsx or index.js or index.ts
 * @param {string} filename
 */
function isIndexFile(filename) {
    return /index(\.(jsx|js|ts))/.test(filename);
}
exports.isIndexFile = isIndexFile;
const isW = /^win/.test(process.platform);
function isWin() {
    return isW;
}
exports.isWin = isWin;
function kebab2camel(str) {
    return str.replace(/(\-[A-Za-z])/g, function (m) {
        return m.toUpperCase().replace('-', '');
    });
}
exports.kebab2camel = kebab2camel;
;
function base2camel(str) {
    return str.replace(/(\.[A-Za-z])/g, function (m) {
        return m.toUpperCase().replace('.', '');
    });
}
exports.base2camel = base2camel;
;
function getImportOption(eol, needLineFeed = false, options) {
    return {
        eol,
        needLineFeed,
        semicolon: options.semicolon,
        queto: options.queto,
        commaDangle: options.commaDangle,
        maxLen: options.maxLen,
    };
}
exports.getImportOption = getImportOption;
function getRootOption(uri) {
    return {
        insertPosition: vscode.workspace.getConfiguration('js-import', uri).get('insertPosition') || 'last',
        alias: vscode.workspace.getConfiguration('js-import', uri).get('alias') || {},
        semicolon: vscode.workspace.getConfiguration('js-import', uri).get('semicolon') ? ';' : '',
        queto: vscode.workspace.getConfiguration('js-import', uri).get('quote') === 'doublequote' ? '"' : "'",
        commaDangle: vscode.workspace.getConfiguration('js-import', uri).get('commaDangleImport'),
        maxLen: parseInt(vscode.workspace.getConfiguration('js-import', uri).get('maxLen')),
    };
}
exports.getRootOption = getRootOption;
//# sourceMappingURL=index.js.map