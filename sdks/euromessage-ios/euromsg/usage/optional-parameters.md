---
title: "Optional Parameters"
sidebar_position: 8
mdx:
  format: md
---

<a id="optional-parameters"></a>

# Optional Parameters

***setUserProperty:*** User to fill demographic fields

***setAppVersion:*** You can segment according to the version your users use.

***checkConfiguration:*** You can check the permission status of users

***setPushNotification, setEmail, setPhoneNumber:*** You can set the permission status of users.
```swift
Euromsg.setUserProperty(key: "Key", value: "Value")
Euromsg.setAppVersion(appVersion: "1.0.0")
let conf = Euromsg.checkConfiguration()
conf.properties?.pushPermit
conf.properties?.emailPermit
conf.properties?.gsmPermit
Euromsg.setPushNotification(permission: true)
Euromsg.setEmail(permission: true)
Euromsg.setPhoneNumber(permission: true)
```
