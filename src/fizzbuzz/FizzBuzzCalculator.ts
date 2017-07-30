import { FizzBuzzType } from "./FizzBuzzType";

export default class FizzBuzzCalculator {
    static calculate(num: number) : FizzBuzzType {
        return (num % 15) == 0 ? FizzBuzzType.FizzBuzz
            : (num % 3) == 0 ? FizzBuzzType.Fizz
            : (num % 5) == 0 ? FizzBuzzType.Buzz
            : FizzBuzzType.None;
    }
}