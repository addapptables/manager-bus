"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const manager_abstract_1 = require("./manager-abstract");
class Manager extends manager_abstract_1.ManagerAbstract {
    constructor() {
        super(...arguments);
        this.messageHandle = (handle) => (message, ack, nack) => {
            try {
                const content = JSON.parse(message.content.toString());
                handle(content);
                ack();
            }
            catch (error) {
                nack();
            }
        };
    }
    bindHandler(handler, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { action, context, options } = metadata;
            yield this.bus.subscribe(action, this.messageHandle(handler.handle), context, options);
        });
    }
}
exports.Manager = Manager;
