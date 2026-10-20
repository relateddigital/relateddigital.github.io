---
title: "Location Permission"
sidebar_position: 5
mdx:
  format: md
---

<a id="location-permission"></a>

# Location Permission

Location permission must be requested **after** the SDK is initialized (i.e. after `relatedDigitalPlugin.init(...)` has completed) and **geofencing is enabled**. Calling it before initialization has no effect.

Use `requestLocationPermission` to show the system location permission dialog to the user. The SDK handles the permission flow automatically:

**iOS behavior:**
- If the user has not yet made a choice (`notDetermined`) → shows the *When In Use* permission dialog.
- If the user has already granted *When In Use* (`authorizedWhenInUse`) → shows the *Always Allow* upgrade dialog.
- If permission is already at *Always* or was permanently denied → no dialog is shown.

**Android behavior:**
- If `ACCESS_FINE_LOCATION` or `ACCESS_COARSE_LOCATION` is not granted → requests both permissions.
- If both are granted and the device runs Android 10 (Q) or higher → requests `ACCESS_BACKGROUND_LOCATION` (required for geofence triggers while the app is in the background).
- If all permissions are already granted → no dialog is shown.

After calling `requestLocationPermission`, the current permission status is automatically sent to Related Digital servers via `sendLocationPermission`.

```dart
// Call this after init() completes, for example in a button handler
// or after a brief delay to avoid showing the dialog immediately on app launch.
await relatedDigitalPlugin.requestLocationPermission();
```

> **Note:** On Android 10+, the system requires the user to grant foreground location permission **before** the background location dialog is shown. The SDK handles this in two separate steps automatically.

If you only want to report the current permission status to Related Digital servers without showing any dialog (e.g. on each app launch to keep the server state in sync), use `sendLocationPermission` instead:

```dart
await relatedDigitalPlugin.sendLocationPermission();
```
