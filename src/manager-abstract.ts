import { IHandler, IEventHandlerOptions, ICommandHandlerOptions } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { ModuleRef } from '@nestjs/core';
import { Type } from '@nestjs/common';

import { InvalidModuleRefException } from './exceptions/invalid-module-ref.exception';
import { InvalidMetadataException } from './exceptions/invalid-metatada.exception';

export type HandlerMetaType<T extends IHandler<any>> = Type<T>;

export abstract class ManagerAbstract<T extends IHandler<any>> {

    protected handlers: HandlerMetaType<T>[];

    protected bus: IBus;

    constructor(protected readonly moduleRef: ModuleRef) { }

    public abstract init(bus: IBus): void;

    protected abstract bindHandler(handler: T, metadata: IEventHandlerOptions | ICommandHandlerOptions): void;

    protected abstract getMetadata(handler: T | Type<T>): any;

    protected registerHandler(handler: HandlerMetaType<T>): void {
        if (!this.moduleRef) {
            throw new InvalidModuleRefException();
        }
        const instance: T = this.moduleRef.get(handler, { strict: false });
        if (!instance) return;

        const metadata = this.getMetadata(handler);
        if (!metadata) {
            throw new InvalidMetadataException(this.getCommandName(handler));
        }

        this.bindHandler(instance, metadata);
    }

    protected getCommandName(handler): string {
        const { constructor } = Object.getPrototypeOf(handler);
        return constructor.name as string;
    }

}