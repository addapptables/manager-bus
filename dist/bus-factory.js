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
const bus_1 = require("@addapptables/bus");
const bus_type_enum_1 = require("./enums/bus-type.enum");
class BusFactory {
    static create(busOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (busOptions.busType) {
                case bus_type_enum_1.BusType.RMQ:
                    return bus_1.rabbitmqCreateBus(busOptions.options);
            }
        });
    }
}
exports.BusFactory = BusFactory;
