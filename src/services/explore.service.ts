import { Injectable, Type } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ICommandHandler, COMMAND_HANDLER_METADATA, EVENT_HANDLER_METADATA, IEventHandler } from '@addapptables/cqrs';

@Injectable()
export class ExplorerService {

    constructor(private readonly modulesContainer: ModulesContainer) { }

    getCommands(): Type<ICommandHandler<any>>[] {
        const modules = [...this.modulesContainer.values()];
        const commands = this.flatMap<ICommandHandler<any>>(modules, instance =>
            this.filterProvider(instance, COMMAND_HANDLER_METADATA)
        );
        return commands;
    }

    getEventHandlers(): Type<IEventHandler<any>>[] {
        const modules = [...this.modulesContainer.values()];
        const events = this.flatMap<IEventHandler<any>>(modules, instance =>
            this.filterProvider(instance, EVENT_HANDLER_METADATA)
        );
        return events;
    }

    flatMap<T>(
        modules: Module[],
        callback: (instance: InstanceWrapper) => Type<any> | undefined
    ): Type<T>[] {
        const items = modules
            .map(module => [...module.providers.values()].map(callback))
            .reduce((a, b) => a.concat(b), []);
        return items.filter(element => !!element) as Type<T>[];
    }

    filterProvider(
        wrapper: InstanceWrapper,
        metadataKey: string
    ): Type<any> | undefined {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        return this.extractMetadata(instance, metadataKey);
    }

    extractMetadata(instance: Object, metadataKey: string): Type<any> {
        if (!instance.constructor) {
            return undefined;
        }
        const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
        return metadata ? (instance.constructor as Type<any>) : undefined;
    }

}
