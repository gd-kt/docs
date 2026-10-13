---
outline: deep
---

# Serializers

Serializers in `gd.kt` allows for the serialization and parsing of objects.
They are used in both the editor and client api.

## Primitive Serializers

Primitive serializers can be found in the `Serializers` class.
`gd.kt` provides these serializers:

- `String` / Base64 `String`
- `Boolean`
- `Int`
- `UInt`
- `UByte`
- `UShort`
- `Float`

## Class Serializers

Serializers specific to classes can be found in the `companion object` of said class:

```kotlin
class Clazz {
    companion object {
        val SERIALIZER: Serializer<Clazz> = /* ... */
    }
}
```

So for example, to get the serializer of the `Hsv` class, use `Hsv.SERIALIZER`.

This is also how you should define your own serializers.

## Making Your Own Serializer

Serializers are composed of 2 parts: a `Serializable` and a `Parsable` *(these are functional interfaces)*:

- A `Serializable` turns any object `T` into a raw string
- A `Parsable` turns any raw string into an object `T`

You can create a `Serializable` using the `create` function:

```kotlin
class MyClass {
    // For this example the result is constant
    // This is not the case in an actual scenario
    fun serialize(): String = "hi"
}

val serializable = Serializer.create(     // [!code focus]
    MyClass::serialize, // The serializer // [!code focus]
    { MyClass() }       // The parser     // [!code focus]
)                                         // [!code focus]
```

---

There are also some special constructors:

- `Serializer.fromRawstringable` allows to create a `Serializer` from a `RawStringable` object.
  Only the parser needs to get provided
- `Serializer.collectionSerializer` allows to create a serializer of a collection
- `Serializer.enum` allows to create a serializer of an `Enum`
- `Serializer.clampedInt`, `Serializer.clampedUInt` and `Serializer.clampedFloat` allows to create
  a serializer where the value is clamped

## Advanced Functionalities

### Hooking

`Serializer`s, `Parsable`s, or `Serializable`s can be hooked.
This can be useful if you don't own the serializer.

Hooking here mean that the input value can be changed, not the output.
Hooking also doesn't change the serializer itself, it creates a new one.

```kotlin
// This does nothing as 'hookSerializer' returns a new // [!code warning]
// Serializer that wraps 'it + 5'                      // [!code warning]
Serializers.INT.hookSerializer { it + 5 }              // [!code warning]

// This is how you should do it instead
val hookedSerializer = Serializers.INT.hookSerializer { it + 5 }
```

To hook the parser you can also do `.hookParser`.

On `Parsable`s and `Serializable`s you can use the `.hook` function instead.

### Server Structures <Badge type="tip" text="Client API" />

Server Structures, which are part of the Client API can
be turned into `Parsable`s:

```kotlin
// 'client' is an AbstractGDClient
Parsable.fromServerStruct(MyServerStruct, client)
```
