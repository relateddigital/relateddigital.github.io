---
title: "Initializing"
sidebar_position: 1
mdx:
  format: md
---

<a id="initializing"></a>

# Initializing

Import the library

```dart
import 'package:relateddigital_flutter/relateddigital_flutter.dart';
import 'package:relateddigital_flutter/request_models.dart';
import 'package:relateddigital_flutter/response_models.dart';
```

Initialize the library

```dart
final RelateddigitalFlutter relatedDigitalPlugin = RelateddigitalFlutter();

@override
void initState() {
  super.initState();
  initLib();
}

Future<void> initLib() async {
  var initRequest = RDInitRequestModel(
    appAlias: Platform.isIOS ? 'ios-app-alias' : 'android-app-alias',
    huaweiAppAlias: 'huawei-app-alias', // pass empty String if your app does not support HMS
    androidPushIntent: 'com.test.MainActivity', // Android only
    organizationId: 'ORG_ID',
    siteId: 'SITE_ID',
    dataSource: 'DATA_SOURCE',
    maxGeofenceCount: 20,  // iOS only
    geofenceEnabled: true,
    inAppNotificationsEnabled: true,
    logEnabled: true,
    isIDFAEnabled: true,  // iOS only
    useNotificationLargeIcon: true,
    androidIconName: 'ic_launcher',
  );

  await relatedDigitalPlugin.init(initRequest, _readNotificationCallback);
}

void _readNotificationCallback(dynamic result) {
  print(result);
}
```
