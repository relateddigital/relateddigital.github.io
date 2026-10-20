---
title: "Request Location Permission"
sidebar_position: 11
mdx:
  format: md
---

<a id="request-location-permission"></a>

# Request Location Permission

If you have set the (iOS only)`askLocationPermmissionAtStart` parameter in `initRelatedDigital` to false in the `AppDelegate.m` file, you can request location permission wherever you want with this function.
```javascript
requestLocationPermission()
requestLocationPermissionWithPopup(title,message,positiveButton,negativeButton) // only android
requestBackgroundLocationPermission() // only android
requestBackgroundLocationPermissionWithPopup(foregroundTitle, foregroundMessage, backgroundTitle, backgroundMessage, positiveButton, negativeButton) // only android
```
