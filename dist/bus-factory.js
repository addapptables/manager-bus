"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bus_1 = require("@addapptables/bus");
const bus_type_enum_1 = require("./enums/bus-type.enum");
class BusFactory {
    static create(busOptions) {
        switch (busOptions.busType) {
            case bus_type_enum_1.BusType.RMQ:
                return bus_1.rabbitmqCreateBus(busOptions.options);
        }
    }
}
exports.BusFactory = BusFactory;
