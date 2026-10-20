---
title: "Request and Send IDFA (iOS Only)"
sidebar_position: 10
mdx:
  format: md
---

<a id="request-and-send-idfa-ios-only"></a>

# Request and Send IDFA (iOS Only)

You can call the `requestIDFA` function whenever you want to show `App Tracking Transparency` prompt to request IDFA and send the value to Visilabs servers. If you are going to use this function, you should set the `isIDFAEnabled` parameter to `false` in the initial parameters.
```javascript
requestIDFA()
```
