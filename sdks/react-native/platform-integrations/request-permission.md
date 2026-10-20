---
title: "Request Permission"
sidebar_position: 9
mdx:
  format: md
---

<a id="request-permission"></a>

# Request Permission

It is used to request notification permission from the user. On iOS devices, a prompt asking for permission to receive notifications will appear. On Android devices, if Android 13 (API 33) or a higher version is used, a similar prompt will be displayed. In lower versions, permission is assumed to be granted by default.
It should be called every time the application is launched.

**IMPORTANT NOTE**: The notification permission here indicates whether permission has been granted from the device. If your user turns off notification permission from your application's account settings, the permission status here will not change. Therefore, you should check the permission information managed by the user from their account settings on your side. Otherwise, notifications may be sent to users without permission.
For example;
```javascript
pushPermitRequest = async (isProvisional) => {
    const pushPermit = await requestPermissions(isProvisional)
    console.log("Device Push Permit",pushPermit);
    if (
        user.pushPermit == true // If permission has been granted before
        || // or
        typeof user.pushPermit === 'undefined' // If no definition has been made regarding the permission status
      ) {
        euroMessageApi.setUserProperties({pushPermit: pushPermit ? 'Y' : 'N'}).then(() => {
          euroMessageApi.subscribe(this.state.token)
        })
    }
  }
```
## Provisional Push (iOS Only)
To use provisional push feature on iOS, call `requestPermissions` method with parameter `false`
```javascript
const isProvisional = true
requestPermissions(isProvisional)
```
