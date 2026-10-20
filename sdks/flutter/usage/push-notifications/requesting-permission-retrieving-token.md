---
title: "Requesting Permission & Retrieving Token"
sidebar_position: 1
mdx:
  format: md
---

<a id="requesting-permission--retrieving-token"></a>

# Requesting Permission & Retrieving Token

Add the lines below to request push notification permission and retrieve token.

## IOS
- Instead of having to prompt the user for permission to send them push notifications, your app can request provisional authorization. In order to enable provisional authorization, you should set `isProvisional` parameter of `requestPermission` method to `true`.

```dart
String token = '-';

void _getTokenCallback(RDTokenResponseModel result) {
  if(result != null && result.deviceToken != null && result.deviceToken.isNotEmpty) {
    setState(() {
      token = result.deviceToken;
    });
  }
  else {
    setState(() {
      token = 'Token not retrieved';
    });
  }
}

Future<void> requestPermission() async {
  await relatedDigitalPlugin.requestPermission(_getTokenCallback, isProvisional: true);
}
```
