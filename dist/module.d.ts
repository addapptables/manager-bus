import { DynamicModule, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CommandManager } from './command-manager';
import { EventManager } from './event-manager';
import { IBusOptions } from './interfaces/bus.options.interface';
import { IBus } from '@addapptables/bus';
export declare class ManagerBusModule implements OnModuleInit, OnModuleDestroy {
    private readonly bus;
    private readonly commandManager;
    private readonly eventManager;
    constructor(bus: IBus, commandManager: CommandManager, eventManager: EventManager);
    static forRoot(busOptions: IBusOptions): DynamicModule;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
