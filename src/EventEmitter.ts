export default class EventEmitter {
    private _handlers: {[index: string]: EventHandler[]};

    constructor() {
        this._handlers = {};
    }

    on = (type: string, handler: EventHandler) => {
        if (this._handlers[type] == null) {
            this._handlers[type] = [];
        }

        this._handlers[type].push(handler);
    };

    emit = (type: string, data: any) => {
        var handlers: EventHandler[] = this._handlers[type] || [];

        for (var i = 0; i < handlers.length; i++) {
            handlers[i](data);
        }
    };
}

export type EventHandler = ((data: any) => void);