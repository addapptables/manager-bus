import { Injectable } from '@nestjs/common';
import { IEventHandler, getMetadataEvent, getEventHandlers } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { each } from 'bluebird';

import { Manager } from './manager';

@Injectable()
export class EventManager extends Manager<IEventHandler<any>> {

    public async init(bus: IBus): Promise<void> {
        this.bus = bus;
        this.handlers = getEventHandlers();
        await each(this.handlers, async handler => await this.registerHandler(handler));
    }

    protected getMetadata = (handler: IEventHandler<any>) => getMetadataEvent(handler)

}
