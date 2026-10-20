---
title: "Sign Up"
sidebar_position: 1
mdx:
  format: md
---

<a id="sign-up"></a>

# Sign Up

```swift
Visilabs.callAPI().signUp(exVisitorId: "userId")
```

Moreover, you can pass additional information to the optional parameter `properties` when user signs up. The following example shows the call of `signUp` method with properties which includes `OM.sys.TokenID` and `OM.sys.AppID` parameters. `OM.sys.TokenID` and `OM.sys.AppID` are required to send push notifications and `OM.sys.AppID` parameter can be obtained by RMC web panel. 

```swift
var properties = [String:String]()
properties["OM.sys.TokenID"] = "F7C5231053E6EC543B8930FB440752E2FE41B2CFC2AA8F4E9C4843D347E6A847" // Token ID to use for push messages
properties["OM.sys.AppID"] = "VisilabsIOSExample" //App ID to use for push messages
Visilabs.callAPI().signUp(exVisitorId: "userId", properties: properties)
```
