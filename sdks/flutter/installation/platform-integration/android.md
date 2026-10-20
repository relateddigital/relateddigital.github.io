---
title: "Android"
sidebar_position: 1
mdx:
  format: md
---

<a id="android"></a>

# Android

- Add below line to your `android/build.gradle` file's both `repositories` sections.

```gradle
maven {url 'https://jitpack.io'}
```

- Add the following lines to the `dependencies` section in `project/build.gradle`

```gradle
classpath 'com.google.gms:google-services:4.3.10'
```

- Add the following lines to the end of `app/build.gradle`

```gradle
apply plugin: 'com.google.gms.google-services'
```

- If you are using Kotlin, add the following line to `settings.gradle.kts` `plugins` section.
```gradle
plugins {
    ...
    id("com.google.gms.google-services") version "4.4.0" apply false
}
```

- Change your minSdkVersion to 21.

- Change your targetSdkVersion and compileSdkVersion to 34.


- **Do not** add `EuroFirebaseMessagingService` or any other `com.google.firebase.MESSAGING_EVENT` service for Related Digital. The plugin already registers `com.relateddigital.flutter.RelatedDigitalMessagingService` through its own AndroidManifest. Adding a second FCM service in your app manifest will compete with it and one of the two will silently stop receiving messages. If an older README led you to declare `EuroFirebaseMessagingService` in the app, remove it.

- If your app already uses `firebase_messaging` or another FCM library, skip this default service and follow [Using with other push providers (FCM or any other provider)](/flutter/usage/push-notifications/using-with-other-push-providers-fcm-or-any-other-provider#using-with-other-push-providers-fcm-or-any-other-provider).

- Add below meta-data parameters in your **AndroidManifest.xml**
```xml

<meta-data android:name="GoogleAppAlias" android:value="google-app-alias" />
<meta-data android:name="HuaweiAppAlias" android:value="huawei-app-alias" />

<meta-data android:name="VisilabsOrganizationID" android:value="VisilabsOrganizationID" />
<meta-data android:name="VisilabsSiteID" android:value="VisilabsSiteID" />
<meta-data android:name="VisilabsSegmentURL" android:value="https://lgr.visilabs.net" />
<meta-data android:name="VisilabsDataSource" android:value="VisilabsDataSource" />
<meta-data android:name="VisilabsRealTimeURL" android:value="https://rt.visilabs.net" />
<meta-data android:name="VisilabsChannel" android:value="Android" />
<meta-data android:name="VisilabsGeofenceURL" android:value="https://s.visilabs.net/geojson" />
<meta-data android:name="VisilabsGeofenceEnabled" android:value="true" />

<!-- Parameters below are optional -->

<meta-data android:name="VisilabsRequestTimeoutInSeconds" android:value="30" />
<meta-data android:name="VisilabsRESTURL" android:value="VisilabsRESTURL" />
<meta-data android:name="VisilabsEncryptedDataSource" android:value="VisilabsEncryptedDataSource" />
<meta-data android:name="VisilabsTargetURL" android:value="https://s.visilabs.net/json" />
<meta-data android:name="VisilabsActionURL" android:value="https://s.visilabs.net/actjson" />
```

- Add `google-services.json` file to your application’s `app` directory.

- If your app supports `HMS` add `agconnect-services.json` file to your application’s `app` directory.
