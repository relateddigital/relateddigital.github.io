---
title: "Geofencing"
sidebar_position: 4
mdx:
  format: md
---

<a id="geofencing"></a>

# Geofencing

To enable location services in your application first of all you need to add the following keys to your `Info.plist` file.

* NSLocationAlwaysAndWhenInUseUsageDescription
* NSLocationWhenInUseUsageDescription

An example implementation of these permissions as follows:

```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We need access to your location for better user experience.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need access to your location for better user experience.</string>
```

You also need to add the following keys under `UIBackgroundModes` in your `Info.plist` file to monitor regions, refresh region list and receive push notifications.

```xml
<array>
    <string>fetch</string>
    <string>location</string>
    <string>remote-notification</string>
</array>
```

When initializing **Visilabs** SDK you need to set `geofenceEnabled` parameter of `createAPI` method to `true`. You may also change the `maxGeofenceCount` to a value lower than 20. **Apple** prevents any single application from monitoring more than 20 regions simultaneously. Visilabs can use all these slots.

```swift
import VisilabsIOS

func application(_ application: UIApplication, didFinishLaunchingWithOptions 
        launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Visilabs.createAPI(organizationId: "YOUR_ORGANIZATION_ID", profileId: "YOUR_PROFILE_ID"
        , dataSource: "YOUR_DATASOURCE", inAppNotificationsEnabled: false, channel: "IOS"
        , requestTimeoutInSeconds: 30, geofenceEnabled: true, maxGeofenceCount: 20)
        return true
    }                                        
```
