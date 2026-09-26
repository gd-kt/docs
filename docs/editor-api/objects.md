---
outline: deep
---

# Objects

## Objects in Geometry Dash

Objects in Geometry Dash are essentially a **list of properties**. *(see the [properties page](properties.md))*<br>
They are formatted like this: `1,15,2,10,3,75,4,65` where there are 4 properties.
How properties are formatted is explained in the [properties page](properties.md#how-gd-does-it).

Each objects are separated by a **semi-colon**: `1,15,2,10,3,75,4,65,1,25,2,20,3,85,7,45`.

## Objects in `gd.kt`

Objects[^1] in `gd.kt` are represented by a class which implements `GenericGdObject` / extends another object.<br>
This interface contains a `RawStringFactory`, which is what allows conversions to raw strings to work.

`gd.kt` provides some basic objects and more complex triggers.
You should look at inheritors of `GenericGdObject` to look at all of the gd objects `gd.kt` provides.

Some of the classes provided are:

- `SimpleObject`: for basic objects that don't need to modify a lot of properties
- `ComplexObject`: for objects which require properties from the `extra` and `extra2` tab
- `TextObject`: Allows to place text in a level
- `AlphaTrigger`: Allows to change the opacity of objects
- `MoveTrigger`: Allows to move a group of objects
- ...

### Coordinate System

To make instances of `gd.kt` objects, you must provide coordinates.
Coordinates are expressed via the `Position` interface.

---

Two types of coordinates exist in `gd.kt`:

- **Normal** coordinates
- **Grid Pos** coordinates

#### Normal Coordinates

Normal coordinates are created via the `Pos` class.
This coordinate is used by Geometry Dash.

In it, `30` unit is equal to `1` grid unit.

You can create a "grid centered" pos and a "grid uncentered" pos with these
2 static functions:

- `Pos.gridCentered`: places any object with this pos on the center of the grid.
  The origin, is the [third example](#third-pos-example).
- `Pos.gridUncentered`: places any object with this pos on **intersections** of the grid.

::: details Examples

For the coordinate `Pos(0f, 0f)`, or `Pos.gridUncentered(0f, 0f)`, on the origin:
![Pos(0, 0) example](/assets/pos_origin.png)

---

For the coordinate `Pos(30f, 0f)`, `Pos.gridUncentered(1f, 0f)`, or `GridPos(1f, 0f)`, offseted by 1 block to the right from the origin:
![Pos(15, 0) example](/assets/pos_offset_1.png)

---

For the coordinate `Pos(15f, 15f)`, `Pos.gridCentered(0f, 0f)` or `GridPos.gridCentered(0f, 0f)`:
![Pos(15, 15) example](/assets/pos_on_grid.png) { #third-pos-example }

:::

### Grid Pos Coordinates

Normal coordinates are created via the `GridPos` class.
This coordinate is used by Geometry Dash.

In it, `1` grid unit is equal to `30` unit.

You can create a "grid centered" pos and a "grid uncentered" pos with these
2 static functions:

- `GridPos.gridCentered`: places any object with this pos on the center of the grid.
  The origin, is the [third example](#third-gridpos-example).
- `GridPos.gridUncentered`: places any object with this pos on **intersections** of the grid.<br>
  Calling it is the same as calling `GridPos`'s constructor.

::: details Examples

For the coordinate `GridPos(0f, 0f)`, or `GridPos.gridUncentered(0f, 0f)`, on the origin:
![Pos(0, 0) example](/assets/gridpos_origin.png)

---

For the coordinate `GridPos(1f, 0f)`, `GridPos.gridUncentered(1f, 0f)`, offseted by 1 block to the right from the origin:
![Pos(15, 0) example](/assets/gridpos_offset_1.png)

---

For the coordinate `GridPos(0.5f, 0.5f)`, `Pos.gridCentered(0f, 0f)` or `GridPos.gridUncentered(0.5f, 0.5f)`:
![Pos(15, 15) example](/assets/gridpos_on_grid.png) { #third-gridpos-example }

:::

## Making your own objects

Making your own objects[^1] is actually very straight forward.
For example an object can look like this:

```kotlin
class MyObject : GenericGdObject {
    override val rawStringFactory: RawStringFactory = RawStringFactory.create(this)

    val objID = UIntProperty(1.id, defaultValue = 1)
    val x = FloatProperty(2.id)
    val y = FloatProperty(3.id)
}
```

Notice that we're overriding `rawStringFactory`, this comes from the `GenericGdObject` interface.
A raw string factory allows you to turn any object into a raw string.

Thanks to this `rawStringFactory`, `asRawString` is automatically implemented:

```kotlin
interface GenericGdObject : RawStringable {
    // ...

    override fun asRawString(): String =    // [!code focus]
        this.rawStringFactory.asRawString() // [!code focus]
}
```

The `rawStringFactory` also has some utility function, like turning the object into a map.

---

This is basically all there is to making custom objects.
Learning what [properties](properties.md) are there and which one does what is really
important when making them.

### Raw String Factories

As already said, raw string factories are what are used to make raw object strings.
They also contain some utils to turn the object into maps.

It's possible to implement the `RawStringFactory` interface and
put your own implementation.

---

The default raw string factory implementation is created via the `RawStringFactory.create` function.
The default implementation uses **reflection** (to not make the api too verbose)
and caches the properties.<br>
The caching happens only when accessing the properties, so if an object is
created without being turned into a raw string, a map, ...  then there will
be no performance cost.

#### Dynamic Raw String Factories

**Dynamic** raw string factories are a special type of raw string factories.
They allow you to add your own properties at runtime to an object.<br>

To create a dynamic raw string factory from the default implementation, use `RawStringFactory.createDynamic`

Example:

```kotlin
class MyObject : GenericGdObject {
    override val rawStringFactory: DynamicRawStringFactory = RawStringFactory.createDynamic(this)

    val objID = UIntProperty(1.id, defaultValue = 1)
    val x = FloatProperty(2.id)
    val y = FloatProperty(3.id)
}

val obj = MyObject()
assert(obj.asRawString(), "")

obj.rawStringFactory.dynamicProperties.add(IntProperty(8.id, currentValue = 7))
assert(obj.rawStringFactory.dynamicProperties.containsProperty(8.id))

assert(obj.asRawString(), "8,7") // Comes from the added property
                                 // (all of the other properties are not serializable)
```

[^1]: When referring to "an object", the said object is a class implementing `GenericGdObject`
