import { IEventHandler } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { Manager } from './manager';
import { ExplorerService } from './services/explore.service';
import { ModuleRef } from '@nestjs/core';
export declare class EventManager extends Manager<IEventHandler<any>> {
    protected readonly moduleRef: ModuleRef;
    private readonly explorerService;
    constructor(moduleRef: ModuleRef, explorerService: ExplorerService);
    init(bus: IBus): Promise<void>;
    protected getMetadata: (handler: IEventHandler<any>) => import("@addapptables/cqrs").IEventHandlerOptions;
}
