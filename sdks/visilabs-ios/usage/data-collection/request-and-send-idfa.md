---
title: "Request and Send IDFA"
sidebar_position: 3
mdx:
  format: md
---

<a id="request-and-send-idfa"></a>

# Request and Send IDFA

You can call the `requestIDFA` function whenever you want to show `App Tracking Transparency` prompt to request **IDFA** and send the value to **Visilabs** servers.

```swift
Visilabs.callAPI().requestIDFA()
```
