---
title: "Add a Notification Content Extension"
sidebar_position: 2
mdx:
  format: md
---

<a id="add-a-notification-content-extension"></a>

# Add a Notification Content Extension

Note: If you are going to use carousel push sending, you need to add this.

1. In Xcode File > New > Target...

2. Select Notification Content Extension then press Next.
![Select Notification Content Extension](https://app.visilabs.net/download/one2one/docs/1.png)

3. Enter the product name as NotificationContent and press Finish.
![NotificationContent](https://app.visilabs.net/download/one2one/docs/2.png)

4. Do not select Activate on the dialog that is shown after selecting Finish.

![Do not select Activate](https://app.visilabs.net/download/one2one/docs/3.png)

By canceling, you are keeping Xcode debugging your app, instead of the extension you just created.

If you activated by accident, you can switch back to debug your app within Xcode (next to the play button).

5. In the project navigator, select the top-level project directory and select the NotificationContent target in the project and targets list.
Unless you have a specific reason not to, you should set the Deployment Target to be iOS 11.

![Select deployment target iOS 11.0](https://app.visilabs.net/download/one2one/docs/4.png)

6. Delete MainInterface.storyboard and NotificationContent.swift files. Then create a swift file named EMNotificationViewController under the NotificationContent folder.

![DeleteFiles](https://app.visilabs.net/download/one2one/docs/5.png) 
![AddFile](https://app.visilabs.net/download/one2one/docs/6.png)

Don't Create Objective-C Bridging Header
![Don't Create](https://img.visilabs.net/banner/uploaded_images/307_1305_20200806142743676.png)

7. Open EMNotificationViewController.swift and replace the whole file's contents with the following code.

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
        Euromsg.configure(appAlias: "EuromsgIOSTest", launchOptions: nil, enableLog: true)
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

Update the podfile for NotificationContent and NotificationService as below and type pod install in the terminal again and press enter.

```
target 'project_name' do
  #only add below line
  pod 'Euromsg'
end

target 'NotificationService' do
  #only add below line
  pod 'Euromsg'
end

target 'NotificationContent' do
  #only add below line
  pod 'Euromsg'
end
```
