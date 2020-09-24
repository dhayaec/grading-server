import { addAll } from "../src/utils/utils"

describe('utils', () => {
    test('addAll', () => {
        expect(addAll(1, 2)).toEqual(3)
    })
})