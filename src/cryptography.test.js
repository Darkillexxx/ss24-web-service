import {encrypt, decrypt} from "./cryptography.js";
import {test, describe, expect} from "@jest/globals";

describe('encrypt and decrypt test', () => {
    test('Encrypted Message', () => {
        expect(encrypt('Check Message'.toUpperCase(), 3)).toBe('FKHFN PHVVDJH')
    })

    test('Decrypted Message', () => {
        expect(decrypt('FKHFN PHVVDJH DIWHU', 3)).toBe('CHECK MESSAGE AFTER')
    })
})