# change-object

![Test](https://raw.githubusercontent.com/wbrickner/change-object/master/test/badges/tests.png) 
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.png)](https://opensource.org/licenses/MIT)

`change-object` provides an intuitive API to declaratively (or imperatively) update JavaScript objects, when you may not know their internal structure ahead of time.

# Installation

```shell
$ npm install change-object
```

# Usage

```javascript
const changeObject = require("change-object")

const myData = {
  friends: [{ name: "Jackson" }]
}

changeObject(myData, {
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
You use change-object's special nested access syntax.

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
changeObject(myObject, {
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
changeObject(myObject, {
  unset: {
    "topLevelObject->favoriteFood": "noodles"
  }
})
```

## Insert Operation

The insert operation adds elements to arrays.

Example using simple and nested syntax:

```javascript
const myObject = {
  onMyPhone: ["YouTube", "Facebook"],
  inMyBag: {
    electronics: ["Laptop"]
  }
}
```

Insert some items:

```javascript
changeObject(myObject, {
  insert: {
   onMyPhone: ["Wikipedia"],
   "inMyBag->electronics": ["External Drive"]
  }
})
```

This results in a modification of `myObject`:

```javascript
{
  onMyPhone: ["YouTube", "Wikipedia"],
  inMyBag: {
    electronics: ["Laptop", "External Drive"]
  }
}
```

## Remove Operation

The remove operation conditionally removes properties or elements from `Objects` or `Arrays` respectively.  You provide a function (or a function string), which returns true when a property/element should be removed.

Example using simple and nested syntax:

```javascript
const myObject = {
  onMyPhone: ["YouTube", "Facebook"],
  inMyBag: {
   junk: ["Broken Cable", "New Cable"]
  }
}
```

Let's remove some items:

```javascript
changeObject(myObject, {
  remove: {
   onMyPhone: '(key, value) => (value === "Facebook")',
   "inMyBag->junk": (index, value) => (value.split("Broken").length != 0)
  }
})
```

## Modify Operation

This allows you to apply arbitrary modifications to parts of your object.
You specify the part of your object you'd like to modify, and a function (or function string) which will modify the object.

Let's see an example.

```javascript
const plane = {
  passengers: [
    { name: "Jackson", annoying: false, money: 0 }, 
    { name: "Peter",   annnoying: true, money: 0 }
  ]
}
```

Let's apply a mutation:

```javascript
changeObject(plane, {
  modify: {
   passengers: (passengers, parent) => {
     passengers.forEach(p => {
       if (p.annoying) { p.money -= 20 }
       else { p.money += 20 }
     })
   }
  }
})
```

We find the object is now modified:

```javascript
{
  passengers: [
    { name: "Jackson", annoying: false, money: 20  }, 
    { name: "Peter",   annnoying: true, money: -20 }
  ]
}
```


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