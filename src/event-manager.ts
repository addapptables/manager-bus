import { Injectable } from '@nestjs/common';
import { IEventHandler, getMetadataEvent } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { each } from 'bluebird';
import { Manager } from './manager';
import { ExplorerService } from './services/explore.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class EventManager extends Manager<IEventHandler<any>> {

    constructor(
        protected readonly moduleRef: ModuleRef,
        private readonly explorerService: ExplorerService
    ) {
        super(moduleRef);
    }

    public async init(bus: IBus): Promise<void> {
        this.bus = bus;
        this.handlers = this.explorerService.getEventHandlers();
        await each(this.handlers, handler => this.registerHandler(handler));
    }

    protected getMetadata = (handler: IEventHandler<any>) => getMetadataEvent(handler)

}
