# manager-bus

- manager-bus is a library for nodejs oriented to microservices,
this library is made to work with [nestjs](https://docs.nestjs.com/)

- [Example code](https://github.com/addapptables/example-service)

## Getting Started
To get started, let's install the package through npm:

```
npm i @addapptables/manager-bus --S
```

Install peerDependencies
```
npm i @addapptables/bus @addapptables/cqrs @nestjs/common @nestjs/core --S
```

## How to use

- Import the module

```typescript
import { ManagerBusModule, BusType } from '@addapptables/manager-bus';
@Module({
    imports: [
        ManagerBusModule.forRoot({
            busType: BusType.RMQ,
            options: {
                exchange: 'exchange',
                service: 'domain-service',
                host: process.env.BUS_URL,
            },
        })
    ],
})
export class YourModule { }
```

- Create command handlers
```typescript
import { ICommandHandler, CommandHandler, ICommand } from '@addapptables/cqrs';

@CommandHandler({ context: 'context', action: 'action' })
export class CommandHandler implements ICommandHandler<YourCommandClass> {

    handle = async (command: ICommand<YourCommandClass>): Promise<void> => {
        // Save in event store
    }

}
```

- Create event handlers
```typescript
import { IEventHandler, IEvent, EventHandler } from '@addapptables/cqrs';

@EventHandler({ context: 'context', action: 'action' })
export class ActionHandler implements IEventHandler<YourActionEvent> {

    handle = async ({ data }: IEvent<YourActionEvent>): Promise<void> => {
        try {
            console.log(data);
        } catch (error) {
            console.log('error', error);
        }
    }

}
```
