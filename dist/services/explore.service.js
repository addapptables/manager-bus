"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const modules_container_1 = require("@nestjs/core/injector/modules-container");
const cqrs_1 = require("@addapptables/cqrs");
let ExplorerService = class ExplorerService {
    constructor(modulesContainer) {
        this.modulesContainer = modulesContainer;
    }
    getCommands() {
        const modules = [...this.modulesContainer.values()];
        const commands = this.flatMap(modules, instance => this.filterProvider(instance, cqrs_1.COMMAND_HANDLER_METADATA));
        return commands;
    }
    getEventHandlers() {
        const modules = [...this.modulesContainer.values()];
        const events = this.flatMap(modules, instance => this.filterProvider(instance, cqrs_1.EVENT_HANDLER_METADATA));
        return events;
    }
    flatMap(modules, callback) {
        const items = modules
            .map(module => [...module.providers.values()].map(callback))
            .reduce((a, b) => a.concat(b), []);
        return items.filter(element => !!element);
    }
    filterProvider(wrapper, metadataKey) {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        return this.extractMetadata(instance, metadataKey);
    }
    extractMetadata(instance, metadataKey) {
        if (!instance.constructor) {
            return undefined;
        }
        const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
        return metadata ? instance.constructor : undefined;
    }
};
ExplorerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer])
], ExplorerService);
exports.ExplorerService = ExplorerService;
