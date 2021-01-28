"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_comment_es6_1 = require("parse-comment-es6");
const findExports_1 = require("./findExports");
class Interpreter {
    run(text, isIndex, moduleName, fileName) {
        return this.extractModuleFromFile(parse_comment_es6_1.default(text).text, isIndex, moduleName, fileName);
    }
    addDefaultName(name, resultList) {
        // support export['default'] = _xxxx2 or _xxxx
        const mt = name.match(/(?:^_(\w+)2)|(?:^_(\w+))/);
        let defaultName = name;
        if (mt != null) {
            defaultName = mt[1] != null ? mt[1] : mt[2];
        }
        if (!this.isUnwantedName(defaultName)) {
            resultList.push({
                default: true,
                name: defaultName,
            });
        }
    }
    extractModuleFromFile(text, isIndex, moduleName, fileName) {
        const nameList = [];
        const resultList = [];
        let res;
        let i = 0;
        Interpreter.importRegex.lastIndex = 0;
        while ((res = Interpreter.importRegex.exec(text)) != null) {
            for (i = 1; i <= 3; i += 1) {
                if (res[i] != null) {
                    this.addDefaultName(res[i], resultList);
                    break;
                }
            }
            if (res[4] != null) {
                resultList.push({
                    default: true,
                    name: res[5],
                });
                continue;
            }
            for (i = 5; i <= 8; i += 1) {
                if (res[i] != null) {
                    if (!this.isUnwantedName(res[i]) && !nameList.includes(res[i])) {
                        nameList.push(res[i]);
                    }
                    break;
                }
            }
            if (res[9] != null) {
                this.addDefaultName(res[9], resultList);
                break;
            }
            if (res[11] != null) {
                if (res[10] != null) {
                    this.addDefaultName(moduleName, resultList);
                }
                else {
                    const names = this.extrachModuleFromExportBlock(res[11]);
                    if (names) {
                        nameList.push(...names);
                    }
                    else {
                        // complex export statement
                        resultList.push({
                            parse: true,
                        });
                    }
                }
            }
            if (res[12] != null) {
                const names = this.extrachModuleFromExportBlock(res[12]);
                if (names) {
                    nameList.push(...names);
                }
                else {
                    // complex export statement
                    resultList.push({
                        parse: true,
                    });
                }
            }
        }
        nameList.forEach((item) => {
            if (item === 'default') {
                resultList.push({
                    default: true,
                    name: isIndex ? moduleName : fileName,
                });
            }
            else {
                resultList.push({
                    default: false,
                    name: item,
                });
            }
        });
        return resultList;
    }
    /**
     * {
           a,
           b,
       }
       should ignore complex export {
           'a': {

           }
           b: 'b'
       }
     */
    extrachModuleFromExportBlock(block) {
        if (/[':{]/.test(block)) {
            return false;
        }
        const result = [];
        let res = [];
        while ((res = Interpreter.importBlockRegex.exec(block)) != null) {
            result.push(res[0]);
        }
        return result;
    }
    isUnwantedName(name) {
        return Interpreter.unWantedName.includes(name);
    }
    runMainFile(data, moduleName, mainFilePath) {
        // { named: [], hasDefault: true }
        const resultList = [];
        try {
            const result = findExports_1.default(data, mainFilePath);
            if (result.hasDefault) {
                resultList.push({
                    default: true,
                    name: result.defaultName != null ? result.defaultName : moduleName,
                });
            }
            result.named.forEach(name => {
                if (!this.isUnwantedName(name) && name !== undefined) {
                    resultList.push({
                        default: false,
                        name: name,
                    });
                }
            });
            return resultList;
        }
        catch (error) {
            return [];
        }
    }
}
/** exec result index
 * 1   exports.default = xxx.default
 * 2   module.exports = xxx
 * 3   exports["default"] = xxx
 * 4 5 export (default) const | let | ... xxx
 * 6   exports.xxx =
 * 7   exports['xxx'] =
 * 8   Object.defineProperty( exports , 'xxx'
 * 9   export default xxx
 * 10 11  export (default) { xxx1, xxx2 } // can not match export { complex code } if (default) just export single one identifer
 * 12  module.exports = {}
 */
Interpreter.importRegex = new RegExp(`
        exports.default\\s*=\\s*(\\w+).default
        |module.exports\\s*=\\s*(\\w+)
        |exports\\[[\\'\\"]default[\\'\\"]\\]\\s*=\\s*(\\w+)
        |export\\s+(default\\s+){0,1}(?:const|let|var|interface|enum|async\\s+function|function|function\\*|class|abstract\\sclass)\\s+([\\w]+)
        |exports\\.([\\w]+)\\s*=
        |exports\\[\\"([\\w]+)\\"\\]\\s*=
        |Object.defineProperty\\(\\s*exports\\s*,\\s*[\\'|\\"]([\\w]+)[\\'|\\"]
        |export\\s+default\\s+([\\w]+)
        |export\\s+(default\\s+){0,1}\\{([^\\}]+)\\}
        |module.exports\\s+=\\s+\\{([^\\}]+)\\}
    `.replace(/\s*/g, ''), 'g');
Interpreter.importBlockRegex = /[\w]+/g;
Interpreter.unWantedName = ['__esModule', 'function', 'exports', 'require', 'default'];
exports.default = Interpreter;
/**
 * TODO:
    3. ts文件，包括@types、index.d.ts
 */
// TODO: export default xxxx(), 如果后面跟着括号，说明是调用函数，此时默认名称可以使用文件名
//# sourceMappingURL=interpreter.js.map