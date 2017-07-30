import Emitter from "./EventEmitter";
import {countUp, change, CountUpArgument} from "./Events";

export default class Store extends Emitter {
    private _count: number;
    private _isSuccess: boolean;

    constructor(dispatcher: Emitter) {
        super();
        this._count = 1;
        this._isSuccess = true;

        dispatcher.on(countUp, this.onCountUp);
    }

    getCount = () => {
        return this._count;
    };

    isSuccess = () => {
        return this._isSuccess;
    };

    onCountUp = (args: CountUpArgument) => {
        this._isSuccess = args.isSuccess;
        if (args.isSuccess) {
            this._count = args.count;
        }
        this.emit(change, null);
    };
}