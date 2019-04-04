import { IBusOptions } from "./interfaces/bus.options.interface";
import { IBus, rabbitmqCreateBus } from "@addapptables/bus";
import { BusType } from "./enums/bus-type.enum";

export class BusFactory {

    public static create(busOptions: IBusOptions): Promise<IBus> {
        switch (busOptions.busType) {
            case BusType.RMQ:
                return rabbitmqCreateBus(busOptions.options);
        }
    }

}