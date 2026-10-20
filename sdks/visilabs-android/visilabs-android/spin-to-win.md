---
title: "Spin To Win"
sidebar_position: 3
mdx:
  format: md
---

<a id="spin-to-win"></a>

# Spin To Win

After form is created at **RMC** panel, likewise **in-app message**, existence of spin to win is controlled by after each `customEvent` call.
You need to call overload of `customEvent` which takes `Activity` as third parameter in order to show spin to win.

```java
customEvent(String pageName, HashMap<String, String> properties, Activity parent)
```

It is shown as follows;

|               Spin to Win Full                                   |                        Spin to Win Half                                    |
|:----------------------------------------------------------------:|----------------------------------------------------------------------------|
| ![spin-to-win-full](https://github.com/relateddigital/visilabs-android/raw/master/Screenshots/spin_to_win_full_en.jpeg)          | ![spin-to-win-half](https://github.com/relateddigital/visilabs-android/raw/master/Screenshots/spin_to_win_half_en.jpeg)                    |
