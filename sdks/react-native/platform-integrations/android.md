---
title: "Android"
sidebar_position: 1
mdx:
  format: md
---

<a id="android"></a>

# Android

* Create a Firebase project and register your app. Download google-services.json file and place it in `android/app` folder.
* Add below line to your `android/build.gradle` file's both repositories sections. If you are going to do Huawei integration, add the `agconnect-services.json` file to the same location.
```gradle
mavenCentral()
maven {
    url 'http://developer.huawei.com/repo/'
    allowInsecureProtocol = true
}
```
* Add below lines to your `android/build.gradle` file's dependencies section.
```gradle
classpath 'com.google.gms:google-services:4.3.10'
classpath 'com.huawei.agconnect:agcp:1.6.5.300'
```
* Change your `minSdkVersion` to 23.
* Change your `compileSdkVersion` and `targetSdkVersion` to 34.
* Add below lines to your `android/app/build.gradle` file's bottom.
```gradle
apply plugin: 'com.google.gms.google-services'
apply plugin: 'com.huawei.agconnect'
```
* Add below line to your `android/app/build.gradle` file's defaultConfig section.
```gradle
multiDexEnabled true
```
* Add below line to your `android/app/build.gradle` file's dependencies section.
```gradle
implementation 'org.jetbrains:annotations:16.0.2'
```
* Add below code to your `AndroidManifest.xml` file's `application` section to receive notifications when the app is foreground.
```xml
<service
    android:name="euromsg.com.euromobileandroid.service.EuroFirebaseMessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

* If you are going to do Huawei integration, add the following lines to the file.
```xml
<service
    android:name="euromsg.com.euromobileandroid.service.EuroHuaweiMessagingService"
    android:exported="false">
    <intent-filter>
      <action  android:name="com.huawei.push.action.MESSAGING_EVENT"  />
    </intent-filter>
</service>
```

* In order to send push to Huawei devices, you need to follow the steps in the link from the Huawei Developer panel.
https://developer.huawei.com/consumer/en/doc/HMS-Plugin-Guides-V1/config-agc-0000001050178043-V1

* Add below code to your `AndroidManifest.xml` file's `application` section to enable geofence capability.
```xml
<service
    android:name="com.visilabs.gps.geofence.GeofenceTransitionsIntentService"
    android:enabled="true"
    android:permission="android.permission.BIND_JOB_SERVICE" />

<receiver
    android:name="com.visilabs.gps.geofence.VisilabsAlarm"
    android:exported="false" />

<receiver
    android:name="com.visilabs.gps.geofence.GeofenceBroadcastReceiver"
    android:enabled="true"
    android:exported="true" />
```
* Modify your `MainApplication.java` or `MainApplicaiton.kt` as below to init library. Change geofenceEnabled parameter as you want.

## Java
```java
import com.visilabs.Visilabs;
import euromsg.com.euromobileandroid.EuroMobileManager;
import euromsg.com.euromobileandroid.enums.RDNotificationPriority;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import org.jetbrains.annotations.Nullable;
```
```java
@Override
public Intent registerReceiver(@Nullable BroadcastReceiver receiver, IntentFilter filter) {
    if (Build.VERSION.SDK_INT >= 34 && getApplicationInfo().targetSdkVersion >= 34) {
        return super.registerReceiver(receiver, filter, Context.RECEIVER_EXPORTED);
    } else {
        return super.registerReceiver(receiver, filter);
    }
}

@Override
public void onCreate() {
  // ...

  initEuroMessage();
}

private void initEuroMessage() {
    String appAlias = "demo-alias";
    String huaweiAppAlias = "demo-alias-huawei";
    String organizationId = "OID";
    String siteId = "SID";
    String datasource = "datasource";
    String channel = "Android";
    String segmentUrl = "http://lgr.visilabs.net";
    String realtimeUrl = "http://rt.visilabs.net";
    String targetUrl = "http://s.visilabs.net/json";
    String actionUrl = "http://s.visilabs.net/actjson";
    String geofenceUrl = "http://s.visilabs.net/geojson";

    Visilabs.CreateAPI(organizationId, siteId, segmentUrl,
            datasource, realtimeUrl, channel, this, targetUrl, actionUrl, 30000, geofenceUrl, true, "reactnative");

    EuroMobileManager euroMobileManager = EuroMobileManager.init(appAlias, huaweiAppAlias, this);
    
    // optional
    euroMobileManager.setPushIntent("com.pushsdk.MainActivity", this);
    euroMobileManager.setNotificationTransparentSmallIcon(R.drawable.ic_launcher, this);
    euroMobileManager.setNotificationTransparentSmallIconDarkMode(R.drawable.ic_launcher, this);
    euroMobileManager.useNotificationLargeIcon(true);
    euroMobileManager.setNotificationLargeIcon(R.drawable.ic_launcher, this);
    euroMobileManager.setNotificationLargeIconDarkMode(R.drawable.ic_launcher, this);
    euroMobileManager.setNotificationColor("#d1dbbd");
    euroMobileManager.setChannelName("Channel", this);
    euroMobileManager.setNotificationPriority(RDNotificationPriority.NORMAL, this); // Set to HIGH for push notifications to appear as temporary banners
}
```

## Kotlin

```kotlin
import com.visilabs.Visilabs;
import euromsg.com.euromobileandroid.EuroMobileManager;
import euromsg.com.euromobileandroid.enums.RDNotificationPriority;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import org.jetbrains.annotations.Nullable;
```
```kotlin
override fun registerReceiver(receiver: BroadcastReceiver?, filter: IntentFilter?): Intent? {
  return if (Build.VERSION.SDK_INT >= 34 && applicationInfo.targetSdkVersion >= 34) {
      super.registerReceiver(receiver, filter, Context.RECEIVER_EXPORTED)
  } else {
      super.registerReceiver(receiver, filter)
  }
}

override fun onCreate() {
  // ...
  
  initEuroMessage()
}

private fun initEuroMessage() {
    val appAlias = "demo-alias"
    val huaweiAppAlias = "demo-alias-huawei"
    val organizationId = "OID"
    val siteId = "SID"
    val datasource = "datasource"
    val channel = "Android"
    val segmentUrl = "http://lgr.visilabs.net"
    val realtimeUrl = "http://rt.visilabs.net"
    val targetUrl = "http://s.visilabs.net/json"
    val actionUrl = "http://s.visilabs.net/actjson"
    val geofenceUrl = "http://s.visilabs.net/geojson"

    Visilabs.CreateAPI(
        organizationId,
        siteId,
        segmentUrl,
        datasource,
        realtimeUrl,
        channel,
        this,
        targetUrl,
        actionUrl,
        30000,
        geofenceUrl,
        true,
        "reactnative")

    val euroMobileManager = EuroMobileManager.init(appAlias, huaweiAppAlias, this)
    // Optional settings
    euroMobileManager.setPushIntent("com.pushsdk.MainActivity", this)
    euroMobileManager.setNotificationTransparentSmallIcon(R.mipmap.ic_launcher, this)
    euroMobileManager.setNotificationTransparentSmallIconDarkMode(R.mipmap.ic_launcher, this)
    euroMobileManager.useNotificationLargeIcon(true)
    euroMobileManager.setNotificationLargeIcon(R.mipmap.ic_launcher, this)
    euroMobileManager.setNotificationLargeIconDarkMode(R.mipmap.ic_launcher, this)
    euroMobileManager.setNotificationColor("#d1dbbd")
    euroMobileManager.setChannelName("Channel", this)
    euroMobileManager.setNotificationPriority(RDNotificationPriority.NORMAL, this)
}
```

* If you want to track installed apps, call below method.
```javascript
  await visilabsApi.sendTheListOfAppsInstalled()
```
Also, add one of the below sections to your `AndroidManifest.xml`

**Option 1**
```xml
<manifest package="com.example.myApp">
    <queries>
        <package android:name="com.example.app1" />
        <package android:name="com.example.app2" />
    </queries>
</manifest>
```

**Option 2**
```xml
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" 
tools:ignore="QueryAllPackagesPermission" />
```
* Add below listener to be able to handle carousel push notification's item click.
```javascript
  addEventListener('carouselItemClicked', async (carouselItemInfo) => {
    console.log('carouselItemInfo is ', carouselItemInfo)
  }, euroMessageApi)
```
