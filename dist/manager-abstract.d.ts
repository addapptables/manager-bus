import { IHandler, IEventHandlerOptions, ICommandHandlerOptions } from '@addapptables/cqrs';
import { IBus } from '@addapptables/bus';
import { ModuleRef } from '@nestjs/core';
import { Type } from '@nestjs/common';
export declare type HandlerMetaType<T extends IHandler<any>> = Type<T>;
export declare abstract class ManagerAbstract<T extends IHandler<any>> {
    protected handlers: HandlerMetaType<T>[];
    protected moduleRef: ModuleRef;
    protected bus: IBus;
    abstract init(bus: IBus): void;
    protected abstract bindHandler(handler: T, metadata: IEventHandlerOptions | ICommandHandlerOptions): void;
    protected abstract getMetadata(handler: T | Type<T>): any;
    setModuleRef(moduleRef: ModuleRef): this;
    protected registerHandler(handler: HandlerMetaType<T>): void;
    protected getCommandName(handler: any): string;
}
