---
title: "AppDelegate.swift"
sidebar_position: 4
mdx:
  format: md
---

<a id="appdelegateswift"></a>

# AppDelegate.swift

Firstly import Euromsg and UserNotifications

```
import Euromsg
import UserNotifications
```

Add UNUserNotificationCenterDelegate to the class AppDelegate section.
```
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate
```

Add desired code under didFinishLaunchingWithOptions.
