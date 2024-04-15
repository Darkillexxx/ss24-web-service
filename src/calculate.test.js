import {factorial, product} from './calculate';
import {test, describe, expect} from "@jest/globals"; // this is optional, all three are global variables im runner scope

describe('factorial', () => {

    test('Testing product func', () => {
        expect(product(6, k => k, 3)).toBe(360)
    });
    test('Testing product func', () => {
        expect(()=>product(-1, k => k, 2)).toThrow()
    });
    test('Testing product func', () => {
        expect(()=>product(0, k => k, 1)).toThrow()
    });

    test('0! is 1', () => {
        expect(factorial(0)).toBe(1)
    });

    test('Factorial of negative int is throwing exception ', () => {
        expect(() => {
            factorial(-5);
        }).toThrow();
    });

})
