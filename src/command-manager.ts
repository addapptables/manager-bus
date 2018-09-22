import { Injectable } from '@nestjs/common';
import { getCommandHandlers, getMetadataCommand, ICommandHandler } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { each } from 'bluebird';

import { Manager } from './manager';

@Injectable()
export class CommandManager extends Manager<ICommandHandler<any>> {

    public async init(bus: IBus): Promise<void> {
        this.bus = bus;
        this.handlers = getCommandHandlers();
        await each(this.handlers, async handler => await this.registerHandler(handler));
    }

    protected getMetadata = (handler: ICommandHandler<any>) => getMetadataCommand(handler);

}
