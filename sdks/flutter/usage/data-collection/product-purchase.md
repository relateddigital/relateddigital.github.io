---
title: "Product Purchase"
sidebar_position: 6
mdx:
  format: md
---

<a id="product-purchase"></a>

# Product Purchase

Use the following implementation of `customEvent` when the user buys one or more items.

```dart
String pageName = 'Purchase';
Map<String, String> parameters = {
  'OM.tid' : transactionID, 
  'OM.pp' : 'Product1 Code;Product2 Code', 
  'OM.pu' : 'Product1 Quantity;Product2 Quantity', 
  'OM.ppr' : 'Product1 Price*Product1 Quantity;Product2 Price*Product2 Quantity',
  'OM.exVisitorID' : userId
};
relatedDigitalPlugin.customEvent(pageName, parameters);
```
