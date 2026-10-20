---
title: "In-App Messaging"
sidebar_position: 1
mdx:
  format: md
---

<a id="in-app-messaging"></a>

# In-App Messaging

**In-app messages** are notifications to your users when they are directly active in your mobile app. To enable **In-App Messaging** feature you need to set the value of `inAppNotificationsEnabled` parameter when calling  `createAPI` to initialize the SDK.

```swift
import VisilabsIOS

func application(_ application: UIApplication, didFinishLaunchingWithOptions 
        launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Visilabs.createAPI(organizationId: "YOUR_ORGANIZATION_ID", profileId: "YOUR_PROFILE_ID"
        , dataSource: "YOUR_DATASOURCE", inAppNotificationsEnabled: true, channel: "IOS"
        , requestTimeoutInSeconds: 30, geofenceEnabled: false, maxGeofenceCount: 20)
        return true
    }                                        
```

The existence of a relevant **in-app message** for an event controlled by after each `customEvent` call. You can create and customize your **in-app messages** on https://intelligence.relateddigital.com/#Target/TargetingAction/TAList page of RMC administration panel.

There are 9 types of **in-app messages**:


|               Pop-up - Image, Header, Text & Button              | Mini-icon&text                                                             | Full Screen-image                                                |
|:----------------------------------------------------------------:|----------------------------------------------------------------------------|------------------------------------------------------------------|
| ![full](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/full.png)                 | ![mini](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/mini.png)                           | ![full_image](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/full_image.png)     |
| Full Screen-image&button                                         | Pop-up - Image, Header, Text & Button                                      |                              Pop-up-Survey                       |
| ![image_button](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/image_button.png) | ![image_text_button](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/image_text_button.png) | ![smile_rating](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/smile_rating.png) |
| Pop-up - NPS with Text & Button                                  | Native Alert & Actionsheet                                                 |  NPS with numbers                                                   |
| ![nps](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/nps.png)                   | ![nps_with_numbers](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/alert.png)   | ![nps_with_numbers](https://github.com/relateddigital/visilabs-ios/raw/master/Screenshots/InAppNotification/nps_with_numbers.png) |


If you want to manage the links you add for in-app messages yourself, you can follow the step below.

First you have to call the delegate method

```swift
Visilabs.callAPI().inappButtonDelegate = self                                 
```

Then you have to add the extension and you can delete the print codes and write your own codes.

```swift
extension EventViewController: VisilabsInappButtonDelegate {
    func didTapButton(_ notification: VisilabsInAppNotification) {
        print("notification did tapped...")
        print(notification)
    }
}
```
