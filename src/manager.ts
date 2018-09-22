import { IHandler, IEventHandlerOptions, ICommandHandlerOptions } from '@addapptables/cqrs';
import { ManagerAbstract } from './manager-abstract';


export abstract class Manager<T extends IHandler<any>> extends ManagerAbstract<T> {

    protected async bindHandler(handler: T, metadata: IEventHandlerOptions | ICommandHandlerOptions): Promise<void> {
        const { action, context, options } = metadata;
        await this.bus.subscribe(action, this.messageHandle(handler.handle), context, options);
    }

    private messageHandle = (handle: (data) => void) => (message, ack, nack) => {
        try {
            const content = JSON.parse(message.content.toString());
            handle(content);
            ack();
        } catch (error) {
            nack();
        }
    };

}