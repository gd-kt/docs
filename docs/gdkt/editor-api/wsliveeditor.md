# WSLiveEditor Support

[WSLiveEditor](https://geode-sdk.org/mods/iandyhd3.wsliveeditor) is a **[geode](https://geode-sdk.org)** mod
that allows to request info/modify info on, the editor.<br>
This mod opens a websocket server, by sending requests through it you can then
use the "actions" this mod provides:

- Adding objects
- Removing objects
- Getting the opened level's raw string
- Setting the opened level's raw string

If you wish to, you can also check its [wiki](https://github.com/iAndyHD3/WSLiveEditor/wiki).

---

`gd.kt` has native support for this mod, as it can be useful for
having access over your editor in real time.

There are 2 clients:

- A **synchronous** one: `WSLiveEditor`
- An **asynchronous** one: `AsyncWSLiveEditor`

## Example

In this example we're going to synchronously add objects, and then remove them **a**synchronously:

```kotlin
val client = WSLiveEditor()
val asyncClient = AsyncWSLiveEditor()

val objs = mutableListOf<RawStringable>()
for (i in 0..3)
    objs.add(SimpleObject(1u, i.toFloat() * 5, i.toFloat() * 5).apply {
        groups.add(12u)
    })

// addObjects accepts a collection of 'RawStringable's
try {
    client.addObjects(objs)
} catch (e: WSLiveEditorException) {
    println("Uh oh. Looks like something bad happened...")
    throw e
}

asyncClient.removeObjects(12u) {
    // This lambda is optional
    println("Finished !")
}
```
