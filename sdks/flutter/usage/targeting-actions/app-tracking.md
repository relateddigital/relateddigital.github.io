---
title: "App Tracking"
sidebar_position: 7
mdx:
  format: md
---

<a id="app-tracking"></a>

# App Tracking

*(Android Only)*
Use **sendTheListOfAppsInstalled** method to track installed apps on android.
```dart
await widget.relatedDigitalPlugin.sendTheListOfAppsInstalled();
```
Add one of the sections below to your **AndroidManifest.xml** in order to use this feature. 
   
*Option 1*
```xml
<manifest package="com.example.myApp">
    <queries>
        <package android:name="com.example.app1" />
        <package android:name="com.example.app2" />
    </queries>
</manifest>
```
*Option 2*
```xml
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" 
tools:ignore="QueryAllPackagesPermission" />
```






























<!---

TODO:
initVisilabs

RelatedDigitalPlugin.java ve RelatedDigitalChannelHandler.swift içerisinde 
euromsg parametreleri boş geliyor ise initEuroMsg çağırılmasın
visilabs parametreleri boş geliyor ise initVisilabs çağırılmasın

ya da init metoduna bunlarla ilgili bool parametre ekleyelim.

FirebaseOperations.java ve HuaweiOperations.java altında eğer visilabs de kullanılıyor ise 
token için customEvent metodu çağırılabilir düşün?

login and signUp metodları SDK'ya eklenmeli

inAppNotificationsEnabled android için de kullanılır hale getirilebilir.

RelatedDigitalChannelHandler enableLog Visilabs için de kullanılmalı.

BU KEYİ EKLEMEYİNCE EUROMSG REQUESTLERİ GİTMİYOR
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>



//TODO: app/build.gradle defaultConfig altına neden multiDexEnabled true gerekiyormuş?

//TODO: project/build.gradle lintOptions android { { disable 'InvalidPackage' } } gerekli mi?
