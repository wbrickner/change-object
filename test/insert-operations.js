const assert = require("assert")
const changeObject = require("../")

describe("Insert Operations", () => {
    describe("Sets object properties", () => {
        it("Should set top-level properties", function () {
            const testObject = { propA: 0 }
            
            changeObject(testObject, {
                set: { propA: 1 }
            })

            const correctResult = JSON.stringify({ propA: 1 })
            assert.equal(JSON.stringify(testObject), correctResult)
        })

        it("Should set nested properties", function () {
            const testObject = {
                nested: { propA: 0 }
            }
            
            changeObject(testObject, {
                set: { "nested->propA": 1 }
            })

            const correctResult = JSON.stringify({ nested: { propA: 1 } })
            assert.equal(JSON.stringify(testObject), correctResult)
        })
    })
})