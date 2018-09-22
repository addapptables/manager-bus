import { ICommandHandler } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { Manager } from './manager';
export declare class CommandManager extends Manager<ICommandHandler<any>> {
    init(bus: IBus): Promise<void>;
    protected getMetadata: (handler: ICommandHandler<any>) => import("@addapptables/cqrs/dist/interfaces/commands/command-handler-options.interface").ICommandHandlerOptions;
}
