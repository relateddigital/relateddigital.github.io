---
title: "Add a Notification Service Extension"
sidebar_position: 1
mdx:
  format: md
---

<a id="add-a-notification-service-extension"></a>

# Add a Notification Service Extension

NotificationServiceExtension allows your iOS application to receive rich notifications with images, buttons, and badges. It's also required for Euromessage's analytics features.

1. In Xcode File > New > Target...

2. Select Notification Service Extension then press Next.
![Select Notification Service Extension](https://camo.githubusercontent.com/5773ecb50fbb7cf17a491b560b96c660b10b849d/68747470733a2f2f696d672e766973696c6162732e6e65742f62616e6e65722f75706c6f616465645f696d616765732f3136335f313130305f32303230303532323138313731323936382e706e67)

3. Enter the product name as NotificationService and press Finish.
![NotificationService](https://img.visilabs.net/banner/uploaded_images/163_1100_20200710131507895.png)

4. Do not select Activate on the dialog that is shown after selecting Finish.

![Do not select Activate](https://img.visilabs.net/banner/uploaded_images/163_1100_20200710131642357.png)

By canceling, you are keeping Xcode debugging your app, instead of the extension you just created.

If you activated by accident, you can switch back to debug your app within Xcode (next to the play button).

5. In the project navigator, select the top-level project directory and select the NotificationService target in the project and targets list.
Unless you have a specific reason not to, you should set the Deployment Target to be iOS 11.

![Select deployment target iOS 11.0](https://img.visilabs.net/banner/uploaded_images/163_1100_20200710132014279.png)

6. Open NotificationService.swift and replace the whole file's contents with the following code.

```swift
import UserNotifications
import Euromsg

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        Euromsg.configure(appAlias: "YOUR_APP_ALIAS", enableLog: true)
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

Ignore any build errors at this point, step 2 will import Euromessage which will resolve any errors.

If you have already added the Euromessage library to your project, simply add the NotificationServiceExtension section.
