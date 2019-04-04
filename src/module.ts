import { Module, DynamicModule, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CommandManager } from './command-manager';
import { EventManager } from './event-manager';
import { IBusOptions } from './interfaces/bus.options.interface';
import { BusFactory } from './bus-factory';
import { BUS } from './const';
import { IBus } from '@addapptables/bus';
import { ExplorerService } from './services/explore.service';

@Module({
    providers: [
        CommandManager,
        EventManager,
        ExplorerService
    ],
    exports: [
        CommandManager,
        EventManager
    ]
})
export class ManagerBusModule implements OnModuleInit, OnModuleDestroy {

    constructor(
        @Inject(BUS)
        private readonly bus: IBus,
        private readonly commandManager: CommandManager,
        private readonly eventManager: EventManager
    ) { }

    static forRoot(busOptions: IBusOptions): DynamicModule {
        const busProvider = {
            provide: BUS,
            useFactory: async () => {
                return await BusFactory.create(busOptions);
            },
        };
        return <DynamicModule>{
            module: ManagerBusModule,
            providers: [busProvider],
            exports: [busProvider]
        }
    }

    async onModuleInit() {
        this.bus && await this.commandManager
            .init(this.bus);
        this.bus && await this.eventManager
            .init(this.bus);
    }


    async onModuleDestroy() {
        this.bus && this.bus.close();
    }

}
