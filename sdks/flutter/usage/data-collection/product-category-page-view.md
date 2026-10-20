---
title: "Product Category Page View"
sidebar_position: 7
mdx:
  format: md
---

<a id="product-category-page-view"></a>

# Product Category Page View

When the user views a category list page, use the following implementation of `customEvent`.

```dart
String pageName = 'Category View';
Map<String, String> parameters = {
  'OM.clist': '12345',
};
relatedDigitalPlugin.customEvent(pageName, parameters);
```
