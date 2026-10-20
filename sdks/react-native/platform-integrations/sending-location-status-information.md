---
title: "Sending Location Status Information"
sidebar_position: 13
mdx:
  format: md
---

<a id="sending-location-status-information"></a>

# Sending Location Status Information

You can call the `sendLocationPermission` method to to send the location permission status of your users to Visilabs servers and use this information on the panel later.
```javascript
await visilabsApi.sendLocationPermission()
```
This information is sent with the `OM.locpermit` parameter and can take one of the following 3 values:

* "always" : Location permission is obtained while the application is open and closed.
* "appopen" : Location permission is only obtained when the app is open.
* "none" : Location permission is not obtained.
