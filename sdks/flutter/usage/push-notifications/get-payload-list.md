---
title: "Get-Payload-List"
sidebar_position: 4
mdx:
  format: md
---

<a id="get-payload-list"></a>

# Get-Payload-List

You can access payload list of last 30 days if you have completed iOS `NotificationServiceExtension` and `App Groups` setup. Using `getPushMessages` method you can access these payloads

```dart
PayloadListResponse payloadListResponse = await relatedDigitalPlugin.getPushMessages();
```
