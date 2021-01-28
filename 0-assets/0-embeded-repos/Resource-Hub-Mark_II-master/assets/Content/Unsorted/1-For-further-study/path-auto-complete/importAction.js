"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsImport_1 = require("./jsImport");
const path = require('path');
class ImportAction {
    // TODO: ''PropTypes' is declared but never used.'
    provideCodeActions(document, range, context, token) {
        const result = [];
        context.diagnostics.forEach(d => {
            result.push(...this.processDiagnostic(d, document, range));
        });
        return result;
    }
    processDiagnostic(diagnostic, document, range) {
        const handlers = [];
        let name = null;
        const matchEslintUndef = diagnostic.message.match(ImportAction.eslintUndefRegExp);
        if (matchEslintUndef != null) {
            name = matchEslintUndef[1];
        }
        if (name == null) {
            const matchTsUndef = diagnostic.message.match(ImportAction.tsUndefRegExp);
            if (matchTsUndef != null) {
                name = matchTsUndef[1];
            }
        }
        if (name == null) {
            return handlers;
        }
        const items = jsImport_1.default.resolveItems(name, document, range, false);
        items.forEach(item => {
            handlers.push({
                title: item.label,
                command: 'extension.fixImport',
                arguments: [item.importObj, item.doc, item.range]
            });
        });
        return handlers;
    }
}
// 'Via' is not defined. (no-undef)
ImportAction.eslintUndefRegExp = /^\'(\w+)\' is not defined\. \(no\-undef\)$/;
// Cannot find name 'isWin'.
ImportAction.tsUndefRegExp = /^Cannot find name \'(\w+)\'\.$/;
exports.ImportAction = ImportAction;
//# sourceMappingURL=importAction.js.map