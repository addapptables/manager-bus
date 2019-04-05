import { IBus } from '@addapptables/bus';
import { IBusOptions } from './interfaces/bus.options.interface';
export declare class BusFactory {
    static create(busOptions: IBusOptions): Promise<IBus>;
}
