import { IHandler, IEventHandlerOptions, ICommandHandlerOptions } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { each } from 'bluebird';
import { ManagerAbstract } from './manager-abstract';


export abstract class Manager<T extends IHandler<any>> extends ManagerAbstract<T> {

    private bus: IBus;

    public async init(bus: IBus): Promise<void> {
        this.bus = bus;
        await each(this.handlers, async handler => await this.registerHandler(handler));
    }

    protected async bindHandler(handler: T, metadata: IEventHandlerOptions | ICommandHandlerOptions): Promise<void> {
        const { action, context, options } = metadata;
        console.log('metadata', metadata);
        console.log('handler.handle', handler.handle);
        console.log('start register...');
        await this.bus.subscribe(action, this.messageHandle(handler.handle), context, options);
        console.log('handle registered!');
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