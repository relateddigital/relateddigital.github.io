---
title: "Using with other push providers (FCM or any other provider)"
sidebar_position: 5
mdx:
  format: md
---

<a id="using-with-other-push-providers-fcm-or-any-other-provider"></a>

# Using with other push providers (FCM or any other provider)

Use this section when the app already has its own push stack (`firebase_messaging`, a custom `FirebaseMessagingService`, or similar) **and** Related Digital push.

Android delivers `com.google.firebase.MESSAGING_EVENT` to **one** `FirebaseMessagingService`. iOS allows **one** `UNUserNotificationCenterDelegate`. Intent-filter priority does **not** make two FCM services work together; it only picks a winner. The supported integration is: **your app owns the FCM service / notification delegate, and forwards Related Digital payloads to this SDK.**

Do not call both `relatedDigitalPlugin.requestPermission` and another SDK's permission API for the same prompt. Request permission from one place; both stacks can still receive the resulting APNs/FCM token.

If you only use Related Digital push, skip this section and keep the default Android service from [Android](/flutter/installation/platform-integration/android#android).

Send Related Digital campaigns with the token from `requestPermission` (iOS: APNs hex, Android: FCM). Send Firebase Console tests with the FCM token from `FirebaseMessaging.instance.getToken()` — never paste the iOS APNs hex into Firebase.

This SDK renders Related Digital rich push (image, carousel). Foreground FCM banners and FCM images are your existing FCM code; the helper does not draw them.

## Android

1. Add `xmlns:tools="http://schemas.android.com/tools"` to the `<manifest>` tag if it is not already there.

2. Remove the plugin FCM service so your service is the only one that receives messages. If you extend `FlutterFirebaseMessagingService`, also remove FlutterFire's default service so you do not end up with two services again.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <application>
        <service
            android:name="com.relateddigital.flutter.RelatedDigitalMessagingService"
            tools:node="remove" />

        <!-- Only if your router extends FlutterFirebaseMessagingService -->
        <service
            android:name="io.flutter.plugins.firebase.messaging.FlutterFirebaseMessagingService"
            tools:node="remove" />

        <service
            android:name=".RouterFCMService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
    </application>
</manifest>
```

3. Create `RouterFCMService` next to `MainActivity`. Related Digital messages must be handled natively (carousel / image). Other messages go to your existing provider. The Java sample is the same API in Kotlin.

**`firebase_messaging` (recommended when you already use FlutterFire):**

```java
package com.yourapp;

import androidx.annotation.NonNull;

import com.google.firebase.messaging.RemoteMessage;
import com.relateddigital.flutter.RelatedDigitalFCMHelper;

import io.flutter.plugins.firebase.messaging.FlutterFirebaseMessagingService;

public class RouterFCMService extends FlutterFirebaseMessagingService {
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        if (RelatedDigitalFCMHelper.isRelatedDigitalMessage(remoteMessage)) {
            RelatedDigitalFCMHelper.onMessageReceived(this, remoteMessage);
            return;
        }
        super.onMessageReceived(remoteMessage);
    }

    @Override
    public void onNewToken(@NonNull String token) {
        RelatedDigitalFCMHelper.onNewToken(this, token);
        super.onNewToken(token);
    }
}
```

**Your own `FirebaseMessagingService` (no FlutterFire service):**

```java
package com.yourapp;

import androidx.annotation.NonNull;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.relateddigital.flutter.RelatedDigitalFCMHelper;

public class RouterFCMService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        if (RelatedDigitalFCMHelper.isRelatedDigitalMessage(remoteMessage)) {
            RelatedDigitalFCMHelper.onMessageReceived(this, remoteMessage);
            return;
        }
        // Existing FCM handling
    }

    @Override
    public void onNewToken(@NonNull String token) {
        RelatedDigitalFCMHelper.onNewToken(this, token);
        // Existing token handling
    }
}
```

**Any other provider in the same router:** keep a single service. After the Related Digital check, handle that provider’s payloads with its own API. Do not register a second `FirebaseMessagingService` next to this router. Always call `RelatedDigitalFCMHelper.onNewToken` in `onNewToken` in addition to the other provider’s token callback. The Android FCM token is shared; Related Digital and your own backend both subscribe to the same token.

## iOS

If the host never assigns `UNUserNotificationCenter.current().delegate`, the plugin assigns itself so Related Digital-only apps keep receiving taps and foreground presentation. Flutter does **not** do this automatically.

If **your app** uses its own `UNUserNotificationCenterDelegate` (`AppDelegate`, `firebase_messaging`, or any other provider), set that delegate **before** `super.application(...)` so the plugin does not take it over.

`super.userNotificationCenter(...)` forwards the same call to **every** Flutter plugin in the chain (this SDK and `firebase_messaging`). This plugin already runs `handlePush` for Related Digital taps and **always** calls `completionHandler`. Call `handlePush` in AppDelegate only if you do **not** call `super`; calling both sends open tracking twice.

Pass a first-wins wrapper into `super`. Both plugins complete the same handler; iOS allows that only once. If you call `completionHandler` yourself, do not also call `super` for that invocation.

Native methods (use `handlePush` only when `super` is not called):

- `RelatedDigitalPushHandler.isRelatedDigitalPayload(_:)`
- `RelatedDigitalPushHandler.handlePush(_:)` — click / open tracking (`Euromsg.handlePush`)
- `RelatedDigitalPushHandler.registerToken(_:)` — APNs `Data` from `didRegisterForRemoteNotificationsWithDeviceToken`, not the FCM string

On iOS, Related Digital uses the **APNs** device token. Firebase uses a different **FCM** token mapped from the same APNs token. Both can be registered. If you disable Firebase swizzling (`FirebaseAppDelegateProxyEnabled = NO`), set `Messaging.messaging().apnsToken` yourself. Put the APNs hex in the Related Digital panel and the FCM string in Firebase Console.

**`AppDelegate.swift` when you own the notification delegate:**

```swift
import UIKit
import Flutter
import UserNotifications
import relateddigital_flutter

@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    UNUserNotificationCenter.current().delegate = self // before super, so the plugin does not take over
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func application(_ application: UIApplication,
                            didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    RelatedDigitalPushHandler.registerToken(deviceToken) // APNs Data only, not Firebase getToken()
    super.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }

  override func userNotificationCenter(_ center: UNUserNotificationCenter,
                                       didReceive response: UNNotificationResponse,
                                       withCompletionHandler completionHandler: @escaping () -> Void) {
    // Do not call handlePush here: the plugin does it for RD payloads when super runs.
    super.userNotificationCenter(center, didReceive: response,
                                 withCompletionHandler: firstCall(completionHandler))
  }

  override func userNotificationCenter(_ center: UNUserNotificationCenter,
                                       willPresent notification: UNNotification,
                                       withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    super.userNotificationCenter(center, willPresent: notification,
                                 withCompletionHandler: firstCall(completionHandler))
  }

  private func firstCall<T>(_ handler: @escaping (T) -> Void) -> (T) -> Void {
    var done = false
    return { value in
      guard !done else { return }
      done = true
      handler(value)
    }
  }

  private func firstCall(_ handler: @escaping () -> Void) -> () -> Void {
    var done = false
    return {
      guard !done else { return }
      done = true
      handler()
    }
  }
}
```

If `import relateddigital_flutter` is not available from Runner, set Runner `IPHONEOS_DEPLOYMENT_TARGET` to **15.0** (or add `pod 'Euromsg'` to Runner and call `Euromsg.handlePush(pushDictionary:)` / `Euromsg.registerToken(tokenData:)`). Only forward when `userInfo["emPushSp"]` or `userInfo["pushId"]` is present, and then complete the handler yourself without `super`.

Call `super` in `didRegisterForRemoteNotificationsWithDeviceToken` so other Flutter plugins still receive the APNs token. For `didReceive` / `willPresent`, either `super` plus the first-wins wrapper above, or complete once yourself with no `super` — not both.

**Notification Service Extension** (rich push + other-provider images):

```swift
import UserNotifications
import Euromsg
import FirebaseMessaging

class NotificationService: UNNotificationServiceExtension {
    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest,
                             withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

        guard let bestAttemptContent = bestAttemptContent else { return }

        var userInfo = bestAttemptContent.userInfo
        if userInfo["emPushSp"] != nil || userInfo["pushId"] != nil {
            userInfo.removeValue(forKey: "fcm_options")
            bestAttemptContent.userInfo = userInfo
            Euromsg.configure(appAlias: "ios-app-alias", enableLog: true)
            Euromsg.didReceive(bestAttemptContent, withContentHandler: contentHandler)
        } else {
            Messaging.serviceExtension().populateNotificationContent(bestAttemptContent,
                                                                     withContentHandler: contentHandler)
        }
    }

    override func serviceExtensionTimeWillExpire() {
        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}
```

Add `pod 'Firebase/Messaging'` (or the version your app already uses) to the `NotificationService` target next to `pod 'Euromsg'`. For any other provider, use that SDK’s NSE helper in the `else` branch instead of `Messaging.serviceExtension()`.

If you only use Related Digital push, keep the [default NotificationService example](/flutter/installation/platform-integration/ios#ios) (`Euromsg.didReceive` for every payload). Do not add Firebase to the extension unless another provider needs it.

Carousel still needs the [Notification Content Extension](/flutter/usage/push-notifications/carousel-push-notifications#carousel-push-notifications); the NSE `else` branch only attaches the other provider’s images.

**Check:** one Android `MESSAGING_EVENT` service and one iOS notification delegate; RD payloads (`emPushSp` / `pushId`) go to this SDK, everything else to your FCM or other-provider code; iOS RMC uses APNs hex, Firebase uses FCM token.
