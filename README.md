# update-object

![Test](test/badges/tests.png) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`update-object` provides an intuitive API to declaratively (or imperatively) update JavaScript objects, when you may not know their internal structure ahead of time.

# Installation

```shell
$ npm install update-object
```

# Usage

```javascript
const updateObject = require("update-object")

const myData = {
  friends: [{ name: "Jackson" }]
}

updateObject(myData, {
  set: {
    likesJS: true,
    "friends.0.age": 19
  },
  insert: {
    friends: [{ name: "Lance" }, { name: "Stephanie" }]
  }
})
```

Which results in the `myData` variable being modified:

```javascript
{
  likesJS: true,
  friends: [
    { name: "Jackson", age: 19 },
    { name: "Lance" },
    { name: "Stephanie" }
  ]
}
```

# Operations and Nested Access 

### Nested Access Syntax

If you'd like to modify a property nested within another object, this is simple.
You use update-object's special nested access syntax.

`topLevelProperty->child property->0->color`

As you can see, the access operator/delimiter is `->`, and your property names can have any set of characters, so long as they don't contain the `->` operator.

To solidify this example, the above string would be targeting the highlighted color property:

```javascript
{
  topLevelProperty: {
    "child property": [
      { color: "blue" },	// this color property
      { color: "red" },
      { color: "green" }
    ]
  }
}
```

**Note**: If there happened to already exist a property named `topLevelProperty->child property->0->color` on the object, this would override the nested access system and would set the value of that property instead.

## Set Operation

The set operation sets the value of the given key (even nested keys) to the value provided.

Example using simple and nested access syntax:

```javascript
updateObject(myObject, {
  set: {
    myTopLevelBooleanBroperty: true,
    "topLevelObject->favoriteFood": "noodles"
  }
})
```

## Unset Operation

The unset operation works exactly like the set operation, except that it removes properties from objects.

Example using nested access syntax:

```javascript
updateObject(myObject, {
  unset: {
    "topLevelObject->favoriteFood": "noodles"
  }
})
```

## Insert Operation

TODO: Document this feature

## Remove Operation

TODO: Document this feature

## Mutation Operation

TODO: Document this feature


# License

Copyright (c) 2019 Will Brickner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.