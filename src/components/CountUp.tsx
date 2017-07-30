import * as React from "react";
import ActionCreator from "../ActionCreator";
import Store from "../Store";
import EventEmitter from "../EventEmitter";
import {change, CountUpArgument} from "../Events";
import FizzBuzzCalculator from "../fizzbuzz/FizzBuzzCalculator";
import {FizzBuzzType} from "../fizzbuzz/FizzBuzzType";

export default class CountUp extends React.Component<CountUpProps, CountUpState> {
    private _dispacher: EventEmitter;
    private _action: ActionCreator;
    private _store: Store;

    constructor(props: CountUpProps) {
        super(props);

        this._dispacher = new EventEmitter();
        this._action = new ActionCreator(this._dispacher);
        this._store = new Store(this._dispacher);

        this.state = {count: this._store.getCount(), isSuccess: this._store.isSuccess()};

        this._store.on(change, () => {
            this.onChange();
        });
    }

    onChange = () => {
        this.setState({count: this._store.getCount(), isSuccess: this._store.isSuccess()});
    };

    tick = (input: FizzBuzzType) => {
        let current = this._store.getCount();
        let next = current + 1;
        let success = input == FizzBuzzCalculator.calculate(current);
        this._action.countUp({count: next, isSuccess: success});
    };

    fizz = () => {
        this.tick(FizzBuzzType.Fizz);
    };

    buzz = () => {
        this.tick(FizzBuzzType.Buzz);
    };

    fizzbuzz = () => {
        this.tick(FizzBuzzType.FizzBuzz);
    };

    none = () => {
        this.tick(FizzBuzzType.None);
    };

    render() {
        return (
            <div>
                <p style={{fontSize: 32}}>{this.state.count}</p>
                <div style={this.state.isSuccess ? {} : {display: "none"}}>
                    <FizzBuzzButtons onNone={this.none} onFizz={this.fizz} onBuzz={this.buzz} onFizzBuzz={this.fizzbuzz} count={this.state.count} />
                </div>
                <p>{this.state.isSuccess ? "success" : "failed"}</p>
            </div>
        )
    };
}

class CountUpProps {

}

class CountUpState {
    count: number;
    isSuccess: boolean;
}

class FizzBuzzButtons extends React.Component<FizzBuzzButtonsProps, FizzBuzzButtonsState> {
    constructor(props: FizzBuzzButtonsProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <FizzBuzzButton onClick={this.props.onNone}>{this.props.count}</FizzBuzzButton>
                <FizzBuzzButton onClick={this.props.onFizz}>Fizz</FizzBuzzButton>
                <FizzBuzzButton onClick={this.props.onBuzz}>Buzz</FizzBuzzButton>
                <FizzBuzzButton onClick={this.props.onFizzBuzz}>FizzBuzz</FizzBuzzButton>
            </div>
        )
    }
}

class FizzBuzzButtonsProps {
    count: number;
    onNone: () => void;
    onFizz: () => void;
    onBuzz: () => void;
    onFizzBuzz: () => void;
}

class FizzBuzzButtonsState {

}

class FizzBuzzButton extends React.Component<FizzBuzzButtonProps, FizzBuzzButtonState> {

    constructor(props: FizzBuzzButtonProps) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.onClick}>{this.props.children}</button>
        )
    }
}

class FizzBuzzButtonProps {
    onClick: () => void;
}

class FizzBuzzButtonState {

}