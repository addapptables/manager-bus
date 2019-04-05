import { BusType } from "../enums/bus-type.enum";

export class IBusOptions<T = any> {
    busType: BusType;
    options: T;
}