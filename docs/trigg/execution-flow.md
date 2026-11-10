# Execution Flow

The control flow of a Trigg Script, once executed in Geometry Dash, is very different from the traditional execution flow you would expect in a programming language.
Normally, everything executes line by lines, this is the same for trigg scripts BUT once it is compiled, everything gets executed separately.

For example:

```kotlin
entrypoint {
    // Executed 1st
    spawnFunction(::triggFunction)

    // Executed in 2nd
    forLoop(item(8u), { it.add(5) }, { it lessThan const(10) }) {
        onFinish {
            // Executed in last
            add { ToggleTrigger(getNextPos(), 9u) }
        }
    
        // This gets executed on each iteration
        spawnFunction(::triggFunction)
    }

    // Executed in 3rd
    spawn {
        // ...
    }
}
```

As you would expect, the corresponding objects are added in order and they execute in the same order as they would in any programming language.
However, each thing gets executed in its own "shell".

---

To better illustrate this, here's a simpler example:
```kotlin
entrypoint {
    forLoop(item(8u), { it.add(5) }, { it lessThan const(10) }) {
        onFinish {
            add { ToggleTrigger(getNextPos(), 9u) }
        }
    
        // This gets executed on each iteration
        spawnFunction(::triggFunction)
    }

    add { ToggleTrigger(getNextPos(), 6u) }

    // Other priority test
    item(5u).set(0)
    item(5u).set(1)
}
```

Here, the for loop executes first BUT just after that the toggle trigger gets executed as well: **it doesn't wait for it to finish iterating**.<br>
You can see the same with the "Other priority test". If you put a counter label to show the itemID 5, `1` will get shown instead of `0`.

