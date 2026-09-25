# Parsing

`gd.kt` allows you to parse ANY raw string into an object ysing the `ObjectParser` object class.<br>
There are 2 types of parsing:

- Parsing a `GenericGdObject`
- Parsing a class

## Parsing a `GenericGdObject`

In **kotlin**, you can either use the `ObjectParser.parse` function or the `ObjectParser.parseObject` one.
Both do the same thing, except that `ObjectParser.parse` is "smart" and decides if `.parseObject` or `.parseAny` should be used.

An instance must also be provided to fill it with the parsed properties. In java it **must be provided** while
in kotlin if a default constructor exists, it will get automatically chosen.

Also, the main advantage of using `.parseObject` is that the `RawStringFactory`'s implementation gets used.<br>
If the object's `RawStringFactory` is a [dynamic raw string factory](objects#dynamic-raw-string-factories), then
unknown properties will get added into its list of runtime properties.

---

In this example, we're going to use this object:

```kotlin
class MyObject : GenericGdObject {
    override val rawStringFactory: RawStringFactory = RawStringFactory.create(this)

    val objID = UIntProperty(1.id, defaultValue = 1)
    val x = FloatProperty(2.id)
    val y = FloatProperty(3.id)

    constructor(id: UInt) {
        this.objID.value = id
    }
}
```

Given that `obj` is an instance of `MyObject`:

::: code-group

```kotlin
// 'ObjectParser.parseObject' can also be used, 'ObjectParser.parse' automatically
// choses if 'ObjectParser.parseObject' or 'ObjectParser.parseAny' should be used
var parsedObj = ObjectParser.parse<MyObject>("")
assertEquals(parsedObj.asRawString() == obj.asRawString())

obj.id.value = 5u
parsedObj = ObjectParser.parse<MyObject>("1,5") // prop objID (id = 1) set to value 5
assertEquals(parsedObj.asRawString() == obj.asRawString())


// If the class takes in constructor arguments, the
// 'toFill' argument must be provided:
parsedObj = ObjectParser.parse("2,4", MyObject(5u)) // prop x (id = 2) set to value 4
obj.x.value = 4

assertEquals(parsedObj.asRawString() == obj.asRawString())
```

```java
// MyObject() is a the instance that's going to be filled
// with the parsed data
MyObject parsedObj = ObjectParser.parseGdObjectJava("", MyObject());
assert parsedObj.asRawString() == obj.asRawString();

obj.x.setValue(15);
parsedObj = ObjectParser.parseGdObjectJava("1,15", MyObject()); // prop objID (id = 1) set to value 15
assert parsedObj.asRawString() == obj.asRawString();
```

:::

## Parsing any class

In **kotlin**, you can either use the `ObjectParser.parse` function or the `ObjectParser.parseAny` one.
Both do the same thing, except that `ObjectParser.parse` is "smart" and decides if `.parseAny` or `.parseObject` should be used.

An instance must also be provided to fill it with the parsed properties. In java it **must be provided** while
in kotlin if a default constructor exists, it will get automatically chosen.

---

In this example, we're going to use this object:

```kotlin
// Notice that it doesn't expand GenericGdObject
class MyObject {
    val objID = UIntProperty(1.id, defaultValue = 1)
    val x = FloatProperty(2.id)
    val y = FloatProperty(3.id)

    constructor(id: UInt) {
        this.objID.value = id
    }
}
```

Given that `obj` is an instance of `MyObject`:

::: code-group

```kotlin
// 'ObjectParser.parseAny' can also be used, 'ObjectParser.parse' automatically
// choses if 'ObjectParser.parseAny' or 'ObjectParser.parseObject' should be used
var parsedObj = ObjectParser.parse<MyObject>("")
assertEquals(parsedObj.asRawString() == obj.asRawString())

obj.id.value = 5u
parsedObj = ObjectParser.parse<MyObject>("1,5") // prop objID (id = 1) set to value 5
assertEquals(parsedObj.asRawString() == obj.asRawString())


// If the class takes in constructor arguments, the
// 'toFill' argument must be provided:
parsedObj = ObjectParser.parse("2,4", MyObject(5u)) // prop x (id = 2) set to value 4
obj.x.setValue(4)

assertEquals(parsedObj.asRawString() == obj.asRawString())
```

```java
// MyObject() is a the instance that's going to be filled
// with the parsed data
MyObject parsedObj = ObjectParser.parseAnyJava("", MyObject());
assert parsedObj.asRawString() == obj.asRawString();

obj.x.setValue(15);
parsedObj = ObjectParser.parseAnyJava("1,15", MyObject()); // prop objID (id = 1) set to value 15
assert parsedObj.asRawString() == obj.asRawString();
```
