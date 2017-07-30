import Emitter from "./EventEmitter";
import {countUp, CountUpArgument} from "./Events";

export default class ActionCreator {
    private _dispatcher: Emitter;

    constructor(dispatcher: Emitter) {
        this._dispatcher = dispatcher;
    }

    countUp = (data: CountUpArgument) => {
        this._dispatcher.emit(countUp, data);
    };
}