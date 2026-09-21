---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "gd.kt"
  text: "Docs for gd.kt"
  tagline: "Your local kotlin lib for geometry dash stuff"
  image: "/logo.png"
  # actions:
  #   - theme: brand
  #     text: Markdown Examples
  #     link: /markdown-examples
  #   - theme: alt
  #     text: API Examples
  #     link: /api-examples
  

features:
  - title: Editor API
    icon: 🛠️
    details: Provides an interface to make levels with a property system
  - title: Client API
    icon: 💻
    details: Simple api to communicate with Geometry Dash's servers
---

<br>

# gd.kt

gd.kt is a simple kotlin library used for the game [Geometry Dash](https://store.steampowered.com/app/322170/Geometry_Dash/).
It provides 2 apis:

- An editor API
- A client API

## Getting Started

To download gd.kt, you can use `jitpack`:

```gradle
repositories {
    maven { url = uri("https://jitpack.io") }
}

dependencies {
    implementation("com.github.gd-kt:gd.kt:<version tag>")
}
```

You can check for the latest version on the [github](https://github.com/gd-kt/gd.kt/releases/latest).
