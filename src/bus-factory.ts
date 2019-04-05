import { IBus, rabbitmqCreateBus } from '@addapptables/bus';
import { IBusOptions } from './interfaces/bus.options.interface';
import { BusType } from './enums/bus-type.enum';

export class BusFactory {

    static async create(busOptions: IBusOptions): Promise<IBus> {
        switch (busOptions.busType) {
            case BusType.RMQ:
                return rabbitmqCreateBus(busOptions.options);
        }
    }

}
