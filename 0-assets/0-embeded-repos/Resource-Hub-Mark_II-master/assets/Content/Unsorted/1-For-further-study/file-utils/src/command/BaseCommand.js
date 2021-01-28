"use strict";
Object.defineProperty( exports, "__esModule", { value: true } );
/*
(method) ObjectConstructor.defineProperty(o: any, p: string | number | symbol, attributes: PropertyDescriptor & ThisType<any>): any
Adds a property to an object, or modifies attributes of an existing property.

@param o — Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.

@param p — The property name.

@param attributes — Descriptor for the property. It can be for a data property or an accessor property.
*/
exports.BaseCommand = void 0;
class BaseCommand {
    constructor(controller, options) {
        this.controller = controller;
        this.options = options;
    }
    async executeController(fileItem, options) {
        if (fileItem) {
            const result = await this.controller.execute({ fileItem });
            if (options === null || options === void 0 ? void 0 : options.openFileInEditor) {
                await this.controller.openFileInEditor(result);
            }
        }
    }
}
exports.BaseCommand = BaseCommand;
