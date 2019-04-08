const assert = require("assert")
const changeObject = require("../")

describe("Set Operations", () => {
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

    describe("Sets values at array indices", () => {
        it("Should set values at indices of top-level arrays", function () {
            const testArray = [0]
            
            changeObject(testArray, {
                set: { 0: 1 }
            })

            const correctResult = JSON.stringify([1])
            assert.equal(JSON.stringify(testArray), correctResult)
        })

        it("Should set values at indices of nested arrays", function () {
            const testObject = {
                nested: { arrayA: [0] }
            }
            
            changeObject(testObject, {
                set: { "nested->arrayA->0": 1 }
            })

            const correctResult = JSON.stringify({ nested: { arrayA: [1] } })
            assert.equal(JSON.stringify(testObject), correctResult)
        })
    })

    describe("Sets properties of objects inside arrays", () => {
        it("Should set values at indices of top-level arrays", function () {
            const testObject = { 
                enclosingArray: [{ propA: 0 }]
            }
            
            changeObject(testObject, {
                set: { "enclosingArray->0->propA": 1 }
            })

            const correctResult = JSON.stringify({ 
                enclosingArray: [{ propA: 1 }]
            })
            assert.equal(JSON.stringify(testObject), correctResult)
        })

        it("Should set values at indices of nested arrays", function () {
            const testObject = { 
                nested: {
                    enclosingArray: [{ propA: 0 }]
                }
            }
            
            changeObject(testObject, {
                set: { "nested->enclosingArray->0->propA": 1 }
            })

            const correctResult = JSON.stringify({ 
                nested: {
                    enclosingArray: [{ propA: 1 }]
                }
            })
            assert.equal(JSON.stringify(testObject), correctResult)
        })
    })
})  