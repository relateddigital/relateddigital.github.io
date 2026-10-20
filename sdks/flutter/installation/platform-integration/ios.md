---
title: "iOS"
sidebar_position: 2
mdx:
  format: md
---

<a id="ios"></a>

# iOS

- Change the ios platform version to 15.0 or higher in `Podfile`

```ruby
platform :ios, '15.0'
```

- In your project directory, open the file `ios/Runner.xcworkspace` with Xcode.

- Enable `Push Notifications` and `Background Modes->Remote Notifications` capabilities.

![Xcode Push Capability](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/xcode-push-capability.png)

- In Xcode, add a new **Notification Service Extension** target and name it **NotificationService**. NotificationServiceExtension allows your iOS application to receive rich notifications with images, videos, and badges. It's also required for Related Digital's analytics features and to store and access notification payloads of the last 30 days.

- In your podfile, add below section and then run `pod install`.
```ruby
target 'NotificationService' do
	use_frameworks!
	pod 'Euromsg'
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)
    target.build_configurations.each do |config|
		config.build_settings['APPLICATION_EXTENSION_API_ONLY'] = 'No'
	end
  end
end
```
- Set **NotificationService** target's deployment target to iOS 11.
  
- Replace **NotificationService.swift** file content with the code below.

```swift
import UserNotifications
import Euromsg

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        Euromsg.configure(appAlias: "ios-app-alias", enableLog: true)
        Euromsg.didReceive(bestAttemptContent, withContentHandler: contentHandler)
    }

    override func serviceExtensionTimeWillExpire() {
        guard let contentHandler = self.contentHandler else {
            return;
        }
        guard let bestAttemptContent = self.bestAttemptContent else {
            return;
        }
        contentHandler(bestAttemptContent)
    }
}
```

If the app also uses Firebase Cloud Messaging or another push SDK, do not use this extension as-is. Follow [Using with other push providers (FCM or any other provider)](/flutter/usage/push-notifications/using-with-other-push-providers-fcm-or-any-other-provider#using-with-other-push-providers-fcm-or-any-other-provider) so non-Related Digital payloads are forwarded to the other provider.

- Enable `App Groups` Capability for your targets. App Groups allow your app to execute code when a notification is recieved, even if your app is not active. This is required for Related Digital's analytics features and to store and access notification payloads of the last 30 days.

    - In your Main App Target go to `Signing & Capabilities > All`. 
    - Click `+ Capability` if you do not have App Groups in your app yet.
    - Select App Groups.
    - Under App Groups click the `+` button.
    - Set the `App Groups` container to be `group.BUNDLE_ID.relateddigital` where `BUNDLE_ID` is the same as set in `Bundle Identifier`.
    - Press OK.
    - In the NotificationServiceExtension Target
    - Go to `Signing & Capabilities > All`
    - Click `+ Capability` if you do not have App Groups in your app yet.
    - Select App Groups
    - In the NotificationContentExtension Target go to `Signing & Capabilities` > All`.
    - Click `+ Capability`.
    - Select App Groups
    - Under App Groups click the `+` button.
    - Set the `App Groups` container to be `group.BUNDLE_ID.relateddigital` where `BUNDLE_ID` is the same as your Main App Target `Bundle Identifier`. Do Not Include `NotificationServiceExtension` and `NotificationContentExtension`.
    - Press OK

![App Groups](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/appgroups.png)

![App Groups Name](https://github.com/relateddigital/relateddigital-flutter/blob/master/screenshots/appgroups-name.png)



- If you want to use **AdvertisingTrackingID** with **isIDFAEnabled** parameter (see [Usage](/flutter/usage#usage) below), you need to add this key to your **Info.plist** file for iOS 14 and above. 
```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use advertising identifier!</string>
```

## Troubleshooting

### Xcode Build Cycle Error

If you encounter this error:
```
Error (Xcode): Cycle inside Runner; building could produce unreliable results.
```

**Cause:** This occurs when build phases are in the wrong order, creating a circular dependency:
- "Thin Binary" script runs first
- "Embed Foundation Extensions" runs after

**Solution:** Reorder the Runner build phases:

1. Open your Xcode project
2. Select the Runner target
3. Go to Build Phases
4. Reorder the phases so that:
   - **Embed Foundation Extensions** comes first
   - **Thin Binary** comes after
