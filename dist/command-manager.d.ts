import { ICommandHandler } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { Manager } from './manager';
import { ExplorerService } from './services/explore.service';
import { ModuleRef } from '@nestjs/core';
export declare class CommandManager extends Manager<ICommandHandler<any>> {
    protected readonly moduleRef: ModuleRef;
    private readonly explorerService;
    constructor(moduleRef: ModuleRef, explorerService: ExplorerService);
    init(bus: IBus): Promise<void>;
    protected getMetadata: (handler: ICommandHandler<any>) => import("@addapptables/cqrs").ICommandHandlerOptions;
}
