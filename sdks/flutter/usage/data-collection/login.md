---
title: "Login"
sidebar_position: 2
mdx:
  format: md
---

<a id="login"></a>

# Login

```dart
String userId = 'userId';
// optional
Map<String, String> properties = {
  'OM.b_login':'1'
};

await relatedDigitalPlugin.login(userId, properties: properties);
```
