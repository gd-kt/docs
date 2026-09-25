---
outline: deep
---

# Properties

To explain how `gd.kt` handles properties you must first
understand how geometry dash handles them.

## How the game does it {#how-gd-does-it}

Geometry Dash uses a property system to store information throughout the game.
It is used in levels, objects, save files, ...

Properties are not complex and are in the format `key,value` with a comma separating
every entry (ex: `1,75,2,30`).

The key is unique and determines what it links to. For example the key `137` in an object won't get used in another
object for **another purpose**.

## How `gd.kt` does it

`gd.kt`'s property system is quite advanced, as a lot of classes are used to describe them:

- `IntProperty`
- `StringProperty`
- `ListProperty`
- `ConditionalProperty`
- ...

You can look at classes implementing `PropertyDefinition` in your IDE to look at all the properties.

---

Properties store 2 main information: their current value and their id. They act like an advanced pair object.

**Most properties** can be initiated like so: `Property(1.id, myValue)`.
You can notice 2 things:

- We're inputting the property's id. The `Int.id` extension is used
  to simplify the creation of `Id` objects. The given integer gets
  clamped to `[1, +inf[`.

  There also is the `UInt.id` extension which can be called, but the
  `Int.id` one should be enough.
- We're providing a value to the property. Though this given
  value becomes the **property's default value**.
  You can specify the property's current value with:
  `Property(1.id, currentValue = myValue)`

  Although giving a default value is optional (`Property(1.id)` is valid syntax)
  it's highly recommended !

Once you have a property object, you can do some things to it.
Here we're going to use an `IntProperty` because the `Property` class
doesn't exist:

```kotlin
// By default, IntProperties have a default value of 0
val prop = IntProperty(2.id, 15)
```

### What you can do with them

One of the most common thing to do with properties is to get their **raw string**[^1]:

```kotlin
// .asRawString() comes from the RawStringable interface
val rawStr = prop.asRawString()
```

However geometry dash won't understand it if it's alone, this is where [objects](/editor-api/objects) come into place.

---

There are also some special getters too:

- `getOrThrow`
- `getOrElse`
- `getOrNullableElse`

These have KDoc attached to them, but their names are already pretty self explinatory.

### Their limitation

Properties should always contain **if possible** immutable objects.
However sometimes this is not possible.

In the `AbstractCollectionProperty` class, this is an issue since collections need
to be mutable. It uses a work around that make sure the default value
is never mutated.

::: details The work around

```kotlin
// C is the collection type
fun getOrCreateCollection(): C {
    if (this.currentValue == null) {
        val collection = this.createEmptyCollection()
        this.defaultValue?.let(collection::addAll)
        this.currentValue = collection
    }

    return this.currentValue!!
}
```

:::

The reason why is explained [here](#property-value-mutability-note).

### Conditional Properties

In the list of all properties that `gd.kt` provides, conditional properties are the
most complex.

They are dependant of other properties, and get only serialized of
a condition is met.

Two types of conditional properties exist, mutable and immutable ones.

---

**Immutable Conditional Property**:

An **immutable** conditional property has a fixed value that cannot get modified.
A lambda decides its value:

```kotlin
val prop = IntProperty(2.id, defaultValue = 15, currentValue = 7)
val conditionalProp = ConditionalProperty(
    3.id,
    prop,
    serializer = Serializers.UINT,
    predicate = { it.isSerializable() }
) { 5u }
```

This conditional property:

- Depends on `prop`
- Serializes to an `UInt`
- Only serializes when `prop` is serializable
- Constantly returns `5u`

Since `prop` is serializable, `conditionalProp` is too, but if it is no longer the case, `conditionalProp`
won't serialize:

```kotlin
assert(prop.asRawString() == "2,7")
assert(conditionalProp.asRawString() == "3,5")

// prop is no longer serializable
prop.resetValue()
assert(prop.asRawString() == "")
assert(conditionalProp.asRawString() == "")
```

---

**Mutable Conditional Property**:

A **mutable** conditional property acts like a normal mutable property.
Its value can be changed but

```kotlin
val prop = IntProperty(2.id, defaultValue = 15, currentValue = 7)
val conditionalProp = MutableConditionalProperty(
    3.id,
    defaultValue = 5u,
    currentValue = 8u,
    prop, serializer = Serializers.UINT
) { it.isSerializable() }
```

This conditional property:

- Depends on `prop`
- Serializes to an `UInt`
- Only serializes when `prop` is serializable
- Has a default value of `5u`

Since `prop` is serializable, `conditionalProp` is too, but if it is no longer the case, `conditionalProp`
won't serialize:

```kotlin
assert(prop.asRawString() == "2,7")
assert(conditionalProp.asRawString() == "3,8")

// prop is no longer serializable
prop.resetValue()
assert(prop.asRawString() == "")
assert(conditionalProp.asRawString() == "")

// prop is serializable
// but conditionalProp is not
prop.value = 7
conditionalProp.resetValue()
assert(prop.asRawString() == "2,7")
assert(conditionalProp.asRawString() == "")
```

---

**Independent** condition properties also exist, they are created using static functions in `ConditionalProperty` and `ImmutableConditionalProperty` via `createIndependent()`.
As the name suggest, they don't depend on any property.

### Collection Properties

Collection properties are used to store `MutableCollection` objects.
`gd.kt` provides these one:

- `ListProperty`
- `SetProperty`
- `SequencedSetProperty`
- `GroupSetProperty` *(special collection property used to store groups + parent groups)*

These properties are **always mutable**.

:::: important {#property-value-mutability-note}
To modify these collections, **accessing them directly is not a great idea** !

Collection properties provide custom functions to add, remove, etc... values from said collection.
However, if it doesn't, you can call the `getOrCreateCollection` function:

```kotlin
val myCollectionProp = TODO()

// For example:
// AbstractCollectionProperty.addAll doesn't exist so we're to
// call it
myCollectionProp.getOrCreateCollection().addAll(TODO())

// However THIS SHOULDN'T be done !   // [!code error]
myCollectionProp.value.addAll(TODO()) // [!code error]
```

But, for "pure" functions which don't mutate the collection, `.value` can
safely be called:

```kotlin
// These all do the same thing
myCollectionProp.getOrCreateCollection().joinToString()
myCollectionProp.getOrThrow().joinToString()
myCollectionProp.value?.joinToString() ?: ""
```

::: details Why should this be done ?
From `AbstractProperty.value`'s KDoc:

> Do note that this variable **may be dangerous to mutate** (changing the variable is not tho !!) (eg: adding elements to a collection)
> because this variable returns the property's `defaultValue` if the property's internal value is `null`, so
> in that case you might modify it indirectly.
>
> This is why your custom properties should contain calls that do not
> directly access its value to prevent from modifying the default value (ex: to add an elem in a collection).
> You can look at how this was done in `AbstractCollectionProperty` which has to in a way fight
> against this limitation using `AbstractCollectionProperty.getOrCreateCollection`.

tl;dr: by mutating `.value` you might accidentaly modify the property's **default value** instead.
:::

::::

## Making your own properties

To make your own properties, you must ask yourself some question about what data type is stored
and what behavior is except from it.
This table will help you decide what class to implement/extend:

| Class/Interface name       | Class type | Suggested data type | Useful for                                                                                        |
|----------------------------|------------|---------------------|---------------------------------------------------------------------------------------------------|
| PropertyDefinition         | Interface  | Any non collection  | Having full control over your property                                                            |
| MutableProperty            | Interface  | Any non collection  | Having full control over your property AND a mutable value                                        |
| AbstractProperty           | Class      | Any non collection  | Having a predefined property with default value support + helpers                                 |
| AbstractCollectionProperty | Class      | Any collection      | Having properties using collections as their data type.<br>It only works on mutable collections ! |

Then you also need to create a **serializer** to be able to serialize/parse the raw string.

### Basic Properties

For this first example, we're going to create our own integer property.
So we can extend the `AbstractProperty` class since it's the best one for our use case.

First, we're going to create our own serializer:

```kotlin
Serializer.create(
    Int::toString,
    String::toInt
)
```

This serializer, turns an int into a string (`Int::toString`).
It also turns a "string-ified" int into an int (`String::toInt`).

Then we're going to make the property:

```kotlin
class IntProperty(id: Id, defaultValue: Int? = 0, currentValue: Int? = null) : AbstractProperty<Int>(id, defaultValue, currentValue) {
    override val serializer = Serializer.create(
        Int::toString,
        String::toInt
    )

    override fun asRawString(separator: Char): String =
        this.toRawStringHelper(this.serializer, separator)
}
```

As you can see, there are 2 main things we're doing here:

- Setting a serializer: allows for the serializing/parsing of this property.
- Implementing the `asRawString` function: allows for the conversion of this property
  into a raw string.

  We're using the `toRawStringHelper` protected function which is used to simplify the creation of
  property raw strings. `AbstractCollectionProperty` inheritors should use `toRawIterableStringHelper` instead.

### Collection Properties { #collection-properties-making-tutorial }

Collection properties are used to store collections *(crazy right)*.<br>
They work a little bit differently than regular (non collection) properties.

---

For example, here's how `ListProperty` is defined:

```kotlin
class ListProperty<T>(
    id: Id,
    defaultValue: MutableList<T>? = arrayListOf(),
    currentValue: MutableList<T>? = null,
    elemSerializer: Serializer<T>
) : AbstractCollectionProperty<T, MutableList<T>>(id, defaultValue, currentValue, elemSerializer) {
    override fun createEmptyCollection(): MutableList<T> = arrayListOf()

    operator fun get(index: Int): T = this.getOrCreateCollection()[index]

    operator fun set(index: Int, element: T) {
        this.getOrCreateCollection()[index] = element
    }

    override fun asRawString(separator: Char): String =
        this.toRawIterableStringHelper(keyValSeparator = separator)
}
```

You may notice a few things, like:

1. The `serializer` field is no longer overriden. `AbstractCollectionProperty` overrides it and uses `elemSerializer`.
2. The new `getOrCreateCollection` function is used.<br>
   This has already been talked about in ["Collection Properties"](#collection-properties).
3. `createEmptyCollection` is a new function that needs to be implemented.<br>
   It's how `getOrCreateCollection` is able to create an empty collection.
4. `toRawStringHelper` has been replaced by `toRawIterableStringHelper`.<br>
   The only different check is that it also checks if the list is empty.

::: tip
Adding functions to access the collection by using `getOrCreateCollection` is
very recommended.
:::

[^1]: Raw strings are what geometry dash serializes/parses to save data.

## Instantiating properties

This last section is a bit more miscellaneous but it's about how a property can be initiated:

- By calling its constructor
- By calling its constructor + using the `by` keyword

---

The 1st option is the default way. It's what works the best and gives more freedom over the property.<br>
The 2nd one allows to abstract away the property:

```kotlin
// This works with `RawStringFactory` interfaces
val prop = IntProperty(5.id)
val abstractedProp by prop

// While this doesn't.
// The original property is not visible
val abstractedProp by IntProperty(5.id)
```

This allows the user to directly get/set the property's value without changing it's `.value` field:

```kotlin
assert(abstractedProp == 0)
abstractedProp = 5
assert(abstractedProp = 5)
```
