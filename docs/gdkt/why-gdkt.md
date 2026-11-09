# Why gd.kt

gd.kt is a simple kotlin library used for the game [Geometry Dash](https://store.steampowered.com/app/322170/Geometry_Dash/).
It provides 2 apis:

- An editor API
- A client API <Badge type="warning" text="experimental"/>

## Editor API

> gd.kt is way more powerful with [Trigg](/trigg/getting-started)

gd.kt allows you to manipulate Geometry Dash editor objects using kotlin classes and
serializing them into Geometry Dash's format, and vice versa.

At the time of writing this, I couldn't find any other java/kotlin library
being able to do this.
Some python modules can, but not kotlin ones.

## Client API <Badge type="warning" text="experimental"/>

The client API still doesn't have any docs.

However it is still accessible and is opt-in. You can opt-in like so:

```kotlin
@OptIn(GDClientApi::class)
```

::: note
I'm working on other projects such as trigg or just living my life.
The client api doesn't a very high priority.

If you still need it, you can still extend it by your own since the client classes are open *(since `v1.0.7`)*,
or even make a pull request while you're at it !
:::
