---
title: "In App Search"
sidebar_position: 8
mdx:
  format: md
---

<a id="in-app-search"></a>

# In App Search

If the mobile app has a search functionality available, use the following implementation of `customEvent`.

```dart
String pageName = 'In App Search';
Map<String, String> parameters = {
  'OM.OSS': searchKeyword,
  'OM.OSSR': searchResult.length,
};
relatedDigitalPlugin.customEvent(pageName, parameters);
```
