---
title: "App-Banner"
sidebar_position: 3
mdx:
  format: md
---

<a id="app-banner"></a>

# App-Banner

**iOS** **Android**

No special installation required

**Usage**

To add app banner view to your app, import `RDBannerView` and use as below:
```dart
import 'package:relateddigital_flutter/rd_banner_view.dart';
...
...
RDBannerView(
  key: null,
  relatedDigitalPlugin: widget.relatedDigitalPlugin,
  properties: {'key1': 'value1', 'key2': 'value2'},
  onItemClick: (Map<String, String> result) {
    print("onItemClick: $result");
  },
  onRequestResult: (Map<String, String> result) {
    print("onRequestResult: $result");
  },
)
```
