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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var ManagerBusModule_1;
const common_1 = require("@nestjs/common");
const command_manager_1 = require("./command-manager");
const event_manager_1 = require("./event-manager");
const bus_factory_1 = require("./bus-factory");
const const_1 = require("./const");
const explore_service_1 = require("./services/explore.service");
let ManagerBusModule = ManagerBusModule_1 = class ManagerBusModule {
    constructor(bus, commandManager, eventManager) {
        this.bus = bus;
        this.commandManager = commandManager;
        this.eventManager = eventManager;
    }
    static forRoot(busOptions) {
        const busProvider = {
            provide: const_1.BUS,
            useFactory: () => __awaiter(this, void 0, void 0, function* () {
                return yield bus_factory_1.BusFactory.create(busOptions);
            }),
        };
        return {
            module: ManagerBusModule_1,
            providers: [busProvider],
            exports: [busProvider]
        };
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bus && (yield this.commandManager
                .init(this.bus));
            this.bus && (yield this.eventManager
                .init(this.bus));
        });
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bus && this.bus.close();
        });
    }
};
ManagerBusModule = ManagerBusModule_1 = __decorate([
    common_1.Module({
        providers: [
            command_manager_1.CommandManager,
            event_manager_1.EventManager,
            explore_service_1.ExplorerService
        ],
        exports: [
            command_manager_1.CommandManager,
            event_manager_1.EventManager
        ]
    }),
    __param(0, common_1.Inject(const_1.BUS)),
    __metadata("design:paramtypes", [Object, command_manager_1.CommandManager,
        event_manager_1.EventManager])
], ManagerBusModule);
exports.ManagerBusModule = ManagerBusModule;
