import { IEventHandler } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { Manager } from './manager';
export declare class EventManager extends Manager<IEventHandler<any>> {
    init(bus: IBus): Promise<void>;
    protected getMetadata: (handler: IEventHandler<any>) => import("@addapptables/cqrs/dist/interfaces/events/event-handler-options.interface").IEventHandlerOptions;
}
