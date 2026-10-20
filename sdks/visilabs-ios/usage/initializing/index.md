---
title: "Initializing"
sidebar_position: 1
mdx:
  format: md
---

<a id="initializing"></a>

# Initializing

Import VisilabsIOS in AppDelegate.swift and call `createAPI` method within `application:didFinishLaunchingWithOptions:` method.

The code below is a sample initialization of Visilabs library.

```swift
import VisilabsIOS

func application(_ application: UIApplication, didFinishLaunchingWithOptions 
        launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Visilabs.createAPI(organizationId: "YOUR_ORGANIZATION_ID", profileId: "YOUR_PROFILE_ID"
        , dataSource: "YOUR_DATASOURCE", inAppNotificationsEnabled: false, channel: "IOS"
        , requestTimeoutInSeconds: 30, geofenceEnabled: false, maxGeofenceCount: 20, isIDFAEnabled: true)
        return true
    }                                        
```
