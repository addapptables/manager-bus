import { IHandler, IEventHandlerOptions, ICommandHandlerOptions } from '@addapptables/cqrs';
import { ManagerAbstract } from './manager-abstract';
export declare abstract class Manager<T extends IHandler<any>> extends ManagerAbstract<T> {
    protected bindHandler(handler: T, metadata: IEventHandlerOptions | ICommandHandlerOptions): Promise<void>;
    private messageHandle;
}
