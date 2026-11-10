# Storing Values

## In Geometry Dash

In Geometry Dash you can store values using things called "counter".
These counters can only store integers and so are naturally very limited.

Geometry Dash allows you to do simple and more complex operations on these counters
using either the Pickup or Item Edit Trigger.
Trigg doesn't support these complex operations yet.

Geometry Dash also has some special counters:

- Timer counter
- Attempt counter
- GameTime counter
- Point counter

## In Trigg

Trigg offers the `GDValue` class to use these counters in a more convenient way.
It allows you to do:

- Comparisons (see [Control Flow](control-flow.md))
- Basic operations (sum, division, multiplication, changing the value)
- Applying modifiers

All of these are going to be covered here.

### Creating GDValues

`GDValues` can be created using 5 top level functions:

- `const(value: Int/UInt/Float)`: creates a `NumberGDValue` that stores the given value.
  It's mainly used for comparisons
- `item(itemID: UInt? = null)`: creates an `ItemGDValue` with the given itemID.
  Optionally, a base value can be set with when creating it with the `item(itemID: UInt? = null, value: Int/Uint)` overload.
- `timer(timerID: UInt)`: creates a `TimerGDValue` with the given timerID
- `points()`: creates a `PointsGDValue`. It stores the number of points collected for this attempt.
  The stored value always points to the same reference, `points() == points()`
- `gameTime()`: creates a `GameTimeGDValue`. It stores the time of this current attempt, if a checkpoint has been used, this value isn't reset.
  It's stored in a 2 decimal number (ex: `2.76`)
  The stored value always points to the same reference, `gameTime() == gameTime()`
- `attempts()`: creates a `AttemptGDValue`. It stores the current attempt count of this session.
  The stored value always points to the same reference, `attempts() == attempts()`

Alternatively you can use these classes' constructor but there's no real reason to.

### Comparisons

::: tip
Comparisons are covered better in the [Control Flow](control-flow.md) page
:::

Comparisons are created using 2 `GDValues`.
There are 6 comparison operators you can use:

- Equality checks (`==` and `!=`):
  - `a equalTo b`
  - `a notEqualTo b`
- Greater than checks (`>` and `>=`):
  - `a greaterThan b`
  - `a greaterThanEqual b`
- Less than checks (`<` and `<=`):
  - `a lessThan b`
  - `a lessThanEqual b`

Once created you can use it in a `comp` clause.

### Operations

`ItemGDValues` only support simple operations, like additions, multiplications, divisions and changing the value.
Other `GDValues` can't have these.

The `ItemGDValue` class (TODO)

### Modifiers

(TODO)
