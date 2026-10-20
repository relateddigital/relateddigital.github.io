---
title: "Geofencing"
sidebar_position: 4
mdx:
  format: md
---

<a id="geofencing"></a>

# Geofencing

## IOS
- Add the following keys to your **Info.plist** file:
```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We need access to your location for better user experience.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need access to your location for better user experience.</string>
```
- Add `location` to **UIBackgroundModes** in your **Info.plist** file (also enable **Background fetch** and **Location updates** in Xcode's **Signing & Capabilities** tab):
```xml
<key>UIBackgroundModes</key>
<array>
    <string>fetch</string>
    <string>location</string>
    <string>remote-notification</string>
</array>
```
- When initializing the plugin, set **geofenceEnabled** to **true**. Also provide a number for **maxGeofenceCount** parameter (max. 20 supported):
```dart
var initRequest = RDInitRequestModel(
  // ...
  geofenceEnabled: true,
  maxGeofenceCount: 20,
);
```
- After initialization, request location permission from the user. See [Location Permission](/flutter/usage/targeting-actions/location-permission#location-permission) section below.

## Android
- Add below permissions in your **AndroidManifest.xml**
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```
- Add below service and receivers in your **AndroidManifest.xml**, within the `<application></application>` tags:
```xml
<service
    android:name="com.visilabs.gps.geofence.GeofenceTransitionsIntentService"
    android:enabled="true"
    android:permission="android.permission.BIND_JOB_SERVICE" />

<receiver android:name="com.visilabs.gps.geofence.VisilabsAlarm" android:exported="false"/>

<receiver
    android:name="com.visilabs.gps.geofence.GeofenceBroadcastReceiver"
    android:enabled="true"
    android:exported="false"/>
```
- After initialization, request location permission from the user. See [Location Permission](/flutter/usage/targeting-actions/location-permission#location-permission) section below.
