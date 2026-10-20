---
title: "Carousel Push Notifications"
sidebar_position: 2
mdx:
  format: md
---

<a id="carousel-push-notifications"></a>

# Carousel Push Notifications

To be able to receive push notifications with carousel, follow the steps below.

## IOS
- In Xcode, add a new **Notification Content Extension** target and name it **NotificationContent**.
- In your podfile, add below section and then run `pod install`.
```ruby
target 'NotificationContent' do
	use_frameworks!
	pod 'Euromsg'
end
```
- Set **NotificationContent** target's deployment target to iOS 11.
- Delete **MainInterface.storyboard** and **NotificationContent.swift** files. Then create a swift file named **EMNotificationViewController.swift** under the NotificationContent folder.
- Replace **EMNotificationViewController.swift** file content with the code below.
```swift
import UIKit
import UserNotifications
import UserNotificationsUI
import Euromsg

@objc(EMNotificationViewController)
class EMNotificationViewController: UIViewController, UNNotificationContentExtension {
    
    let carouselView = EMNotificationCarousel.initView()
    var completion: ((_ url: URL?, _ bestAttemptContent: UNMutableNotificationContent?) -> Void)?
    
    var notificationRequestIdentifier = ""
    
    func didReceive(_ notification: UNNotification) {
        notificationRequestIdentifier = notification.request.identifier
        Euromsg.configure(appAlias: "relateddigital-flutter-example-ios", launchOptions: nil, enableLog: true)
        carouselView.didReceive(notification)
    }
    func didReceive(_ response: UNNotificationResponse, completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void) {
        carouselView.didReceive(response, completionHandler: completion)

    }
    override func loadView() {
        completion = { [weak self] url, bestAttemptContent in
            if let identifier = self?.notificationRequestIdentifier {
                UNUserNotificationCenter.current().removeDeliveredNotifications(withIdentifiers: [identifier])
                UNUserNotificationCenter.current().getDeliveredNotifications(completionHandler: { notifications in
                    bestAttemptContent?.badge =  NSNumber(value: notifications.count)
                })
            }
            if let url = url {
                if #available(iOSApplicationExtension 12.0, *) {
                    self?.extensionContext?.dismissNotificationContentExtension()
                }
                self?.extensionContext?.open(url)
            } else {
                if #available(iOSApplicationExtension 12.0, *) {
                    self?.extensionContext?.performNotificationDefaultAction()
                }
            }
        }
        carouselView.completion = completion
        carouselView.delegate = self
        self.view = carouselView
    }
}

/**
 Add if you want to track which carousel element has been selected
 */
extension EMNotificationViewController: CarouselDelegate {
    
    func selectedItem(_ element: EMMessage.Element) {
        // Add your work...
        print("Selected element is => \(element)")
    }
    
}
```

- In your **NotificationContent/Info.plist** add below section

```xml
<key>NSExtension</key>
<dict>
    <key>NSExtensionAttributes</key>
    <dict>
        <key>UNNotificationExtensionCategory</key>
        <string>carousel</string>
        <key>UNNotificationExtensionDefaultContentHidden</key>
        <false />
        <key>UNNotificationExtensionInitialContentSizeRatio</key>
        <real>1</real>
        <key>UNNotificationExtensionUserInteractionEnabled</key>
        <true />
    </dict>
    <key>NSExtensionPointIdentifier</key>
    <string>com.apple.usernotifications.content-extension</string>
    <key>NSExtensionPrincipalClass</key>
    <string>NotificationContent.EMNotificationViewController</string>
</dict>
```
