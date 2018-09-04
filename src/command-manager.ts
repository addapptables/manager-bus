import { getMetadataCommand, ICommandHandler } from '@addapptables/cqrs';
import { Injectable } from '@nestjs/common';
import { Manager } from './manager';

@Injectable()
export class CommandManager extends Manager<ICommandHandler<any>> {

    protected getMetadata(handler: ICommandHandler<any>) {
        return getMetadataCommand(handler);
    }

}

