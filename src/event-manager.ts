import { IEventHandler, getMetadataEvent } from '@addapptables/cqrs';
import { Injectable } from '@nestjs/common';
import { Manager } from './manager';

@Injectable()
export class EventManager extends Manager<IEventHandler<any>> {

    protected getMetadata(handler: IEventHandler<any>) {
        return getMetadataEvent(handler);
    }

}
