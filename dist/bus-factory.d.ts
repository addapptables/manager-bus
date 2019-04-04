import { IBusOptions } from "./interfaces/bus.options.interface";
import { IBus } from "@addapptables/bus";
export declare class BusFactory {
    static create(busOptions: IBusOptions): Promise<IBus>;
}
