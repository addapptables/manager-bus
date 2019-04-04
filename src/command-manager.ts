import { Injectable } from '@nestjs/common';
import { getMetadataCommand, ICommandHandler } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { each } from 'bluebird';

import { Manager } from './manager';
import { ExplorerService } from './services/explore.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CommandManager extends Manager<ICommandHandler<any>> {

    constructor(
        protected readonly moduleRef: ModuleRef,
        private readonly explorerService: ExplorerService
    ) {
        super(moduleRef);
    }

    public async init(bus: IBus): Promise<void> {
        this.bus = bus;
        this.handlers = this.explorerService.getCommands();
        await each(this.handlers, async handler => await this.registerHandler(handler));
    }

    protected getMetadata = (handler: ICommandHandler<any>) => getMetadataCommand(handler);

}
