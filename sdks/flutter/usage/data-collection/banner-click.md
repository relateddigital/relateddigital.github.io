---
title: "Banner Click"
sidebar_position: 9
mdx:
  format: md
---

<a id="banner-click"></a>

# Banner Click

You can monitor banner click data using the following implementation of `customEvent`.

```dart
String pageName = 'Banner Click';
Map<String, String> parameters = {
  'OM.OSB': 'Banner Name/Banner Code',
};
relatedDigitalPlugin.customEvent(pageName, parameters);;
```
