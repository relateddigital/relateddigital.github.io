---
title: "Page View"
sidebar_position: 3
mdx:
  format: md
---

<a id="page-view"></a>

# Page View

Use the following implementation of `customEvent`  method to record the page name the visitor is currently viewing. You may add extra parameters to properties  **Map** or you may leave it empty.

```dart
String pageName = 'Page Name';
Map<String, String> parameters = {};
await relatedDigitalPlugin.customEvent(pageName, parameters);
```
