---
title: "Add To Favorites"
sidebar_position: 10
mdx:
  format: md
---

<a id="add-to-favorites"></a>

# Add To Favorites

When the user adds a product to their favorites, use the following implementation of `customEvent`.

```dart
String pageName = 'Add To Favorites';
Map<String, String> parameters = {
  'OM.pf' : productCode, 
  'OM.pfu' : '1',
};
relatedDigitalPlugin.customEvent(pageName, parameters);
```
