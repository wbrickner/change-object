const assert = require("assert")
const changeObject = require("../")

describe("Remove Operations", () => {
    describe("Removes properties of top-level objects", () => {
        it("Should remove properties based on key", function () {
            const testObject = {
                collection: {
                    propA: 0,
                    propB: 1
                }
            }
            
            changeObject(testObject, {
                remove: {
                    collection: (key, value) => (key === "propA")
                }
            })

            const correctResult = JSON.stringify({ collection: { propB: 1 } })
            assert.equal(JSON.stringify(testObject), correctResult)
        })

        it("Should remove properties based on value", function () {
            const testObject = {
                collection: {
                    propA: 0,
                    propB: 1
                }
            }
            
            changeObject(testObject, {
                remove: {
                    collection: (key, value) => (value === 0)
                }
            })

            const correctResult = JSON.stringify({ collection: { propB: 1 } })
            assert.equal(JSON.stringify(testObject), correctResult)
        })
    })

    describe("Removes properties of nested objects", () => {
        it("Should remove properties based on key", function () {
            const testObject = {
                nested: {
                    collection: {
                        propA: 0,
                        propB: 1
                    }
                }
            }
            
            changeObject(testObject, {
                remove: {
                    "nested->collection": (key, value) => (key === "propA")
                }
            })

            const correctResult = JSON.stringify({ 
                nested: { 
                    collection: { propB: 1 } 
                }
            })
            assert.equal(JSON.stringify(testObject), correctResult)
        })

        it("Should remove properties based on value", function () {
            const testObject = {
                nested: {
                    collection: {
                        propA: 0,
                        propB: 1
                    }
                }
            }
            
            changeObject(testObject, {
                remove: {
                    "nested->collection": (key, value) => (value === 0)
                }
            })

            const correctResult = JSON.stringify({ 
                nested: { 
                    collection: { propB: 1 } 
                }
            })
            assert.equal(JSON.stringify(testObject), correctResult)
        })
    })

    describe("Removes elements of top-level arrays", () => {
        it("Should remove elements based on index", function () {
            const testObject = {
                collection: [ "a", "b" ]
            }
            
            changeObject(testObject, {
                remove: {
                    collection: (index, value) => (index === 0)
                }
            })

            const correctResult = JSON.stringify({
                collection: [ "b" ]
            })
            assert.equal(JSON.stringify(testObject), correctResult)
        })

        it("Should remove elements based on value", function () {
            const testObject = {
                collection: [ "a", "b" ]
            }
            
            changeObject(testObject, {
                remove: {
                    collection: (index, value) => (value === "a")
                }
            })

            const correctResult = JSON.stringify({
                collection: [ "b" ]
            })
            assert.equal(JSON.stringify(testObject), correctResult)
        })
    })

    // describe("Removes elements of nested arrays", () => {
    //     // TODO
    //     it("Should remove elements based on index (when provided a function)", function () {
    //         const testObject = {
    //             collection: [ "a", "b" ]
    //         }
            
    //         changeObject(testObject, {
    //             remove: {
    //                 collection: (index, value) => (index === 0)
    //             }
    //         })

    //         const correctResult = JSON.stringify({
    //             collection: [ "b" ]
    //         })
    //         assert.equal(JSON.stringify(testObject), correctResult)
    //     })

    //     it("Should remove elements based on index (when provided a function string)", function () {
    //         const testObject = {
    //             collection: [ "a", "b" ]
    //         }
            
    //         changeObject(testObject, {
    //             remove: {
    //                 collection: `(index, value) => (index === 0)`
    //             }
    //         })

    //         const correctResult = JSON.stringify({
    //             collection: [ "b" ]
    //         })
    //         assert.equal(JSON.stringify(testObject), correctResult)
    //     })

    //     it("Should remove elements based on value (when provided a function)", function () {
    //         const testObject = {
    //             collection: [ "a", "b" ]
    //         }
            
    //         changeObject(testObject, {
    //             remove: {
    //                 collection: (index, value) => (value === "a")
    //             }
    //         })

    //         const correctResult = JSON.stringify({
    //             collection: [ "b" ]
    //         })
    //         assert.equal(JSON.stringify(testObject), correctResult)
    //     })

    //     it("Should remove elements based on value (when provided a function string)", function () {
    //         const testObject = {
    //             collection: [ "a", "b" ]
    //         }
            
    //         changeObject(testObject, {
    //             remove: {
    //                 collection: `(index, value) => (value === "a")`
    //             }
    //         })

    //         const correctResult = JSON.stringify({
    //             collection: [ "b" ]
    //         })
    //         assert.equal(JSON.stringify(testObject), correctResult)
    //     })
    // })
})  