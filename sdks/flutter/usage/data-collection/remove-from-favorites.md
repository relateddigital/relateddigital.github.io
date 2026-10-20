---
title: "Remove from Favorites"
sidebar_position: 11
mdx:
  format: md
---

<a id="remove-from-favorites"></a>

# Remove from Favorites

When the user removes a product from their favorites, use the following implementation of `customEvent`.

```dart
String pageName = 'Add To Favorites';
Map<String, String> parameters = {
  'OM.pf' : productCode, 
  'OM.pfu' : '-1',
};
relatedDigitalPlugin.customEvent(pageName, parameters);
```
