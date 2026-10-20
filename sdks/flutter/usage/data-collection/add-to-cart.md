---
title: "Add to Cart"
sidebar_position: 5
mdx:
  format: md
---

<a id="add-to-cart"></a>

# Add to Cart

Use the following implementation of `customEvent`  when the user adds items to the cart or removes.

```dart
String pageName = 'Cart';
Map<String, String> parameters = {
  'OM.pbid' : basketID, 
  'OM.pb' : 'Product1 Code;Product2 Code', 
  'OM.pu' : 'Product1 Quantity;Product2 Quantity', 
  'OM.ppr' : 'Product1 Price*Product1 Quantity;Product2 Price*Product2 Quantity'
};
relatedDigitalPlugin.customEvent(pageName, parameters);
```
