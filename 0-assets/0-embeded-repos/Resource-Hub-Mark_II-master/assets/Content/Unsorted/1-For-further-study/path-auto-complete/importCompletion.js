"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const jsImport_1 = require("./jsImport");
class ImportCompletion {
    provideCompletionItems(document, position, token) {
        let enabled = vscode.workspace.getConfiguration('js-import', document.uri).get('codeCompletion');
        let autofix = vscode.workspace.getConfiguration('js-import', document.uri).get('codeCompletionAction');
        if (!enabled) {
            return Promise.resolve([]);
        }
        return new Promise((resolve, reject) => {
            let wordToComplete = '';
            let range = document.getWordRangeAtPosition(position);
            if (range) {
                const startPosition = range.start;
                if (startPosition.character > 0) {
                    /**
                     * if the charator before word is '.', we don't need to return any items.
                     */
                    const start = new vscode.Position(startPosition.line, startPosition.character - 1);
                    const end = new vscode.Position(startPosition.line, startPosition.character);
                    const charBeforeRange = document.getText(new vscode.Range(start, end));
                    if (charBeforeRange === '.') {
                        return resolve([]);
                    }
                }
                wordToComplete = document.getText(new vscode.Range(range.start, position)).toLowerCase();
                const items = jsImport_1.default.resolveItems(wordToComplete, document, range, false);
                const handlers = [];
                items.forEach(item => {
                    handlers.push({
                        label: item.importObj.module.name,
                        kind: vscode.CompletionItemKind.Reference,
                        detail: item.label,
                        documentation: '',
                        command: autofix ? { title: 'Autocomplete', command: 'extension.fixImport', arguments: [item.importObj, item.doc, item.range] } : null
                    });
                });
                return resolve(handlers);
            }
            return resolve([]);
        });
    }
}
exports.ImportCompletion = ImportCompletion;
//# sourceMappingURL=importCompletion.js.map