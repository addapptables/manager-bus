"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_module_ref_exception_1 = require("./exceptions/invalid-module-ref.exception");
const invalid_metatada_exception_1 = require("./exceptions/invalid-metatada.exception");
class ManagerAbstract {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    registerHandler(handler) {
        if (!this.moduleRef) {
            throw new invalid_module_ref_exception_1.InvalidModuleRefException();
        }
        const instance = this.moduleRef.get(handler, { strict: false });
        if (!instance)
            return;
        const metadata = this.getMetadata(handler);
        if (!metadata) {
            throw new invalid_metatada_exception_1.InvalidMetadataException(this.getCommandName(handler));
        }
        this.bindHandler(instance, metadata);
    }
    getCommandName(handler) {
        const { constructor } = Object.getPrototypeOf(handler);
        return constructor.name;
    }
}
exports.ManagerAbstract = ManagerAbstract;
