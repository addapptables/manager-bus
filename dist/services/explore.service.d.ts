import { Type } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ICommandHandler, IEventHandler } from '@addapptables/cqrs';
export declare class ExplorerService {
    private readonly modulesContainer;
    constructor(modulesContainer: ModulesContainer);
    getCommands(): Type<ICommandHandler<any>>[];
    getEventHandlers(): Type<IEventHandler<any>>[];
    flatMap<T>(modules: Module[], callback: (instance: InstanceWrapper) => Type<any> | undefined): Type<T>[];
    filterProvider(wrapper: InstanceWrapper, metadataKey: string): Type<any> | undefined;
    extractMetadata(instance: Object, metadataKey: string): Type<any>;
}
