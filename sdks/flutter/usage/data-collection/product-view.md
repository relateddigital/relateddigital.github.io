---
title: "Product View"
sidebar_position: 4
mdx:
  format: md
---

<a id="product-view"></a>

# Product View

Use the following implementation of `customEvent`  when the user displays a product in the mobile app.

```dart
String pageName = 'Product View';
Map<String, String> parameters = {
  'OM.pv' : productCode, 
  'OM.pn' : productName, 
  'OM.ppr' : productPrice, 
  'OM.pv.1' : productBrand, 
  'OM.inv': inventory // Number of items in stock
};
relatedDigitalPlugin.customEvent(pageName, parameters);
```
