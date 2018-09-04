import { Module } from '@nestjs/common';
import { CommandManager } from './command-manager';
import { EventManager } from './event-manager';

@Module({
    providers: [
        CommandManager,
        EventManager
    ],
    exports: [
        CommandManager,
        EventManager
    ]
})
export class ManagerBusModule { }
